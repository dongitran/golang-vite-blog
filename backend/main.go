package main

import (
	"context"
	"log"
	"net/http"
	"strconv"

	"github.com/gin-contrib/cors"
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

	router.Use(cors.Default())

	router.GET("/api/recent-posts", func(c *gin.Context) {
		tag := c.Query("tag")
		skip := c.DefaultQuery("skip", "0")
		limit := c.DefaultQuery("limit", "10")

		skipInt, err := strconv.Atoi(skip)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid skip parameter"})
			return
		}

		limitInt, err := strconv.Atoi(limit)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid limit parameter"})
			return
		}

		repository := repositories.NewContentRepository(db)
		datas, total, _ := repository.GetLimitedSortedRecords(limitInt, skipInt, tag)

		var contentData []gin.H
		for _, v := range datas {
			contentData = append(contentData, gin.H{
				"id":           v.ID,
				"title":        v.Title,
				"banner_image": v.BannerImage,
				"params":       v.Params,
			})
		}
		c.JSON(http.StatusOK, gin.H{"content": contentData, "total": total})
	})

	router.GET("/api/post/:id", func(c *gin.Context) {
		id := c.Param("id")

		repository := repositories.NewContentRepository(db)
		idInt, _ := strconv.Atoi(id)
		data, err := repository.FindByID(idInt)
		if err != nil {
			c.JSON(http.StatusNotFound, gin.H{"error": "Data not found"})
			return
		}

		c.JSON(http.StatusOK, data)
	})

	router.GET("/api/trending-posts", func(c *gin.Context) {
		tag := "trending"
		repository := repositories.NewContentRepository(db)
		datas, _, _ := repository.GetLimitedSortedRecords(5, 0, tag)

		var contentData []gin.H
		for _, v := range datas {
			contentData = append(contentData, gin.H{
				"id":           v.ID,
				"title":        v.Title,
				"banner_image": v.BannerImage,
			})
		}
		c.JSON(http.StatusOK, gin.H{"content": contentData})
	})

	router.Run(":4000")
}
