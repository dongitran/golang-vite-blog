package kafka

import (
	"context"
	"encoding/json"
	"log"
	"sync"
	"time"

	"github.com/dongitran/database-change-monitoring/config"
	"github.com/dongitran/database-change-monitoring/models"
	"github.com/dongitran/database-change-monitoring/repositories"
	"github.com/dongitran/database-change-monitoring/services"
	"github.com/google/uuid"
	"github.com/segmentio/kafka-go"
)

func StartKafkaConsumer() {
	r := kafka.NewReader(kafka.ReaderConfig{
		Brokers: []string{config.KafkaBrokers},
		Topic:   config.KafkaTopic,
		GroupID: "my_consumer_group",
	})

	defer r.Close()

	var wg sync.WaitGroup

	numWorkers := 20
	totalMessages := 0
	messagesSinceLastReport := 0
	startTime := time.Now()

	for i := 0; i < numWorkers; i++ {
		wg.Add(1)
		go func(workerID int) {
			defer wg.Done()
			log.Printf("Worker %d started", workerID)

			for {
				m, err := r.ReadMessage(context.Background())
				if err != nil {
					log.Println("Error reading message:", err)
					break
				}

				totalMessages++
				messagesSinceLastReport++
				log.Printf("Worker %d received message: %s", workerID, string(m.Value))

				// Convert string to json
				var content map[string]interface{}
				json.Unmarshal(m.Value, &content)

				logData := models.Log{Message: string(m.Value), Level: "info", CreatedAt: time.Now().UTC(), Content: content}
				err = services.InsertLog(logData)
				if err != nil {
					log.Println("Error inserting log:", err)
				}

				// Check data
				database := content["database"].(string)
				table := content["table"].(string)

				db := config.GetPostgresDB()
				validateRepo := repositories.NewValidateRepository(db)
				allValidates, err := validateRepo.GetValidateAvailable(database, table)
				if err != nil {
					log.Fatalf("Failed to get all validates: %v", err)
				}

				jsonData, err := json.Marshal(allValidates)
				if err != nil {
					log.Fatalf("Failed to marshal validates to JSON: %v", err)
				}

				str := string(jsonData)

				type DataSend struct {
					Database  string `json:"database"`
					Table     string `json:"table"`
					Action    string `json:"action"`
					DataCheck string `json:"data_check"`
				}
				dataSend := DataSend{
					Database:  database,
					Table:     table,
					Action:    string(m.Value),
					DataCheck: str,
				}

				jsonData1, _ := json.Marshal(dataSend)

				key := uuid.New().String()
				err = SendData(config.KafkaBrokers, config.KafkaTopicValidateData, key, string(jsonData1))
				if err != nil {
					log.Println("Error sending data to Kafka:", err)
				}

				if messagesSinceLastReport >= 200 {
					elapsed := time.Since(startTime)
					seconds := float64(elapsed) / float64(time.Second)
					messagesPerSecond := float64(messagesSinceLastReport) / seconds

					log.Printf("Messages per second: %.2f", messagesPerSecond)

					messagesSinceLastReport = 0
					startTime = time.Now()
				}
			}

			log.Printf("Worker %d stopped", workerID)
		}(i + 1)
	}

	wg.Wait()

	log.Println("All workers stopped")
}
