package main

import (
	"context"
	"log"

	"github.com/dongitran/database-change-monitoring/config"
	"github.com/dongitran/database-change-monitoring/kafka"
)

func main() {
	log.Println("Starting Kafka consumer...")

	// Init all config
	config.InitConfig()

	// Connect mongoDb
	err := config.ConnectMongoDB()
	if err != nil {
		log.Println("Connect mongodb error: ", err)
	}
	mongoClient := config.GetClient()
	ctx := context.TODO()
	defer mongoClient.Disconnect(ctx)

	// Connect postgres
	db, err := config.ConnectPostgres()
	if err != nil {
		log.Fatalf("Failed to connect to PostgreSQL: %v", err)
	}
	defer db.Close()

	kafka.StartKafkaConsumer()
}
