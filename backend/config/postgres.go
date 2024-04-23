package config

import (
	"sync"

	"github.com/go-pg/pg/v10"
)

var (
	PostgresDBHost   string
	PostgresDBPort   string
	PostgresDBName   string
	PostgresUsername string
	PostgresPassword string
)

var once sync.Once
var db *pg.DB

func ConnectPostgres() (*pg.DB, error) {
	once.Do(func() {
		db = pg.Connect(&pg.Options{
			Addr:     PostgresDBHost + ":" + PostgresDBPort,
			User:     PostgresUsername,
			Password: PostgresPassword,
			Database: PostgresDBName,
		})

		// Kiểm tra kết nối
		_, err := db.Exec("SELECT 1")
		if err != nil {
			panic(err)
		}
	})
	return db, nil
}

func GetPostgresDB() *pg.DB {
	return db
}
