package main

import (
	"context"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"

	"github.com/dongitran/golang-reactjs-remix-blog/config"
	"github.com/dongitran/golang-reactjs-remix-blog/repositories"
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

	router := gin.Default()

	// Định nghĩa handler cho đường dẫn /api/hello
	router.GET("/api/hello", func(c *gin.Context) {
		repository := repositories.NewContentRepository(db)
		datas, _ := repository.GetAll()
		log.Println("Data from postgres: ")
		//log.Println(data)
		for _, v := range datas {
			log.Printf("Data ID: %d, Title: %s, Content: %s", v.ID, v.Title, v.Content)
		}
		// Trả về một thông điệp "Hello, world!"
		c.JSON(http.StatusOK, gin.H{"message": "Hello, world!"})
	})

	// Chạy server trên cổng 8080
	router.Run(":8080")
}
