package repositories

import (
	"context"
	"fmt"

	"github.com/dongitran/database-change-monitoring/config"
	"github.com/dongitran/database-change-monitoring/models"
)

func InsertLog(log models.Log) error {
	ctx := context.TODO()
	client := config.GetClient()
	// defer client.Disconnect(ctx)

	collection := client.Database(config.DBName).Collection(config.Collection)
	_, err := collection.InsertOne(ctx, log)
	if err != nil {
		fmt.Println("Error inserting log:", err)
		return err
	}
	return nil
}
