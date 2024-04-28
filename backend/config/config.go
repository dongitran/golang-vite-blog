package config

import (
	"context"
	"log"
	"os"

	"github.com/joho/godotenv"
	v1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/client-go/kubernetes"
	"k8s.io/client-go/rest"
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
	if !isRunningOnKubernetes() {
		LoadEnvVariables()
	} else {
		loadConfigMapEnvVariables()
	}
	logEnvVariables()
}

func isRunningOnKubernetes() bool {
	_, err := rest.InClusterConfig()
	return err == nil
}

func loadConfigMapEnvVariables() {
	config, err := rest.InClusterConfig()
	if err != nil {
		log.Fatal("Error creating Kubernetes client config: ", err)
	}

	clientset, err := kubernetes.NewForConfig(config)
	if err != nil {
		log.Fatal("Error creating Kubernetes client: ", err)
	}

	configMapName := "golang-vite-blog-env"
	namespace := "golang-vite-blog"

	configMap, err := clientset.CoreV1().ConfigMaps(namespace).Get(context.TODO(), configMapName, v1.GetOptions{})
	if err != nil {
		log.Fatal("Error getting ConfigMap: ", err)
	}

	// Get env of mongo db
	DBHost = configMap.Data["MONGODB_HOST"]
	DBPort = configMap.Data["MONGODB_PORT"]
	DBName = configMap.Data["MONGODB_NAME"]
	Collection = configMap.Data["MONGODB_COLLECTION"]
	Username = configMap.Data["MONGODB_USERNAME"]
	Password = configMap.Data["MONGODB_PASSWORD"]

	// Get env of postgres
	PostgresDBHost = configMap.Data["POSTGRES_DB_HOST"]
	PostgresDBPort = configMap.Data["POSTGRES_DB_PORT"]
	PostgresDBName = configMap.Data["POSTGRES_DB_DATABASE"]
	PostgresUsername = configMap.Data["POSTGRES_DB_USER_NAME"]
	PostgresPassword = configMap.Data["POSTGRES_DB_PASSWORD"]
}

func logEnvVariables() {
	log.Println("MONGODB_HOST:", DBHost)
	log.Println("MONGODB_PORT:", DBPort)
	log.Println("MONGODB_NAME:", DBName)
	log.Println("MONGODB_COLLECTION:", Collection)
	log.Println("MONGODB_USERNAME:", Username)
	log.Println("MONGODB_PASSWORD:", Password)
}
