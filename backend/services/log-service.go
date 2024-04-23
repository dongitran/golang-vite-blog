package services

import (
	"github.com/dongitran/golang-reactjs-remix-blog/models"
	"github.com/dongitran/golang-reactjs-remix-blog/repositories"
)

func InsertLog(log models.Log) error {
	return repositories.InsertLog(log)
}

