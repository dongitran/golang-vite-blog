package models

import "time"

type Log struct {
	Content   interface{} `json:"content"`
	Message   string      `json:"message"`
	Level     string      `json:"level"`
	CreatedAt time.Time   `json:"created_at"`
}
	