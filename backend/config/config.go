package config

import (
	"log"
	"os"

	"github.com/joho/godotenv"
)

func LoadEnvVariables() {
	if err := godotenv.Load(); err != nil {
		log.Println("Error loading .env file:", err)
	}

	// Get env of mongo db
	DBHost = os.Getenv("MONGODB_HOST")
	DBPort = os.Getenv("MONGODB_PORT")
	DBName = os.Getenv("MONGODB_NAME")
	Collection = os.Getenv("MONGODB_COLLECTION")
	Username = os.Getenv("MONGODB_USERNAME")
	Password = os.Getenv("MONGODB_PASSWORD")

	// Get env of postgres
	PostgresDBHost = os.Getenv("POSTGRES_DB_HOST")
	PostgresDBPort = os.Getenv("POSTGRES_DB_PORT")
	PostgresDBName = os.Getenv("POSTGRES_DB_DATABASE")
	PostgresUsername = os.Getenv("POSTGRES_DB_USER_NAME")
	PostgresPassword = os.Getenv("POSTGRES_DB_PASSWORD")
}

func InitConfig() {
	LoadEnvVariables()
	logEnvVariables()
}

func logEnvVariables() {
	log.Println("MONGODB_HOST:", DBHost)
	log.Println("MONGODB_PORT:", DBPort)
	log.Println("MONGODB_NAME:", DBName)
	log.Println("MONGODB_COLLECTION:", Collection)
	log.Println("MONGODB_USERNAME:", Username)
	log.Println("MONGODB_PASSWORD:", Password)
}
