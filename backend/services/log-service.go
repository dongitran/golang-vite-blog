package services

import (
	"github.com/dongitran/database-change-monitoring/models"
	"github.com/dongitran/database-change-monitoring/repositories"
)

func InsertLog(log models.Log) error {
	return repositories.InsertLog(log)
}

