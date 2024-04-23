package models

import "time"

type Validate struct {
	ID          int       `json:"id"`
	Database    string    `json:"database"`
	Table       string    `json:"table"`
	Content     string    `json:"content"`
	Title       string    `json:"title"`
	RevertLogic bool      `json:"revert_logic"`
	CreatedAt   time.Time `json:"created_at"`
	UpdatedAt   time.Time `json:"updated_at"`
}
