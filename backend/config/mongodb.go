package config

import (
	"context"
	"fmt"
	"time"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var (
	DBHost     string
	DBPort     string
	DBName     string
	Collection string
	Username   string
	Password   string
)

var client *mongo.Client

func ConnectMongoDB() error {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	var err error
	client, err = mongo.NewClient(options.Client().ApplyURI("mongodb://" + Username + ":" + Password + "@" + DBHost + ":" + DBPort))
	if err != nil {
		return err
	}
	err = client.Connect(ctx)
	if err != nil {
		fmt.Println(err)
		return err
	}

	
	return nil
}

func GetClient() *mongo.Client {
	return client
}
