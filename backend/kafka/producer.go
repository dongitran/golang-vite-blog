package kafka

import (
	"context"
	"log"
	"time"

	kafka "github.com/segmentio/kafka-go"
)

func SendData(brokerAddress string, topic string, key string, value string) error {
	writer := kafka.NewWriter(kafka.WriterConfig{
		Brokers:  []string{brokerAddress},
		Topic:    topic,
		Balancer: &kafka.LeastBytes{},
	})

	defer writer.Close()

	conn, err := kafka.DialLeader(context.Background(), "tcp", brokerAddress, topic, 0)
	if err != nil {
		log.Fatal("failed to dial leader:", err)
	}

	conn.SetWriteDeadline(time.Now().Add(10 * time.Second))
	_, err = conn.WriteMessages(
		kafka.Message{Value: []byte(value)},
	)
	if err != nil {
		log.Fatal("failed to write messages:", err)
	}

	if err := conn.Close(); err != nil {
		log.Fatal("failed to close writer:", err)
	}
	return nil
}
