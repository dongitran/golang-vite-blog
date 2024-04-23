package repositories

import (
	"github.com/dongitran/golang-reactjs-remix-blog/models"
	"github.com/go-pg/pg/v10"
)

type ContentRepository struct {
	DB *pg.DB
}

func NewContentRepository(db *pg.DB) *ContentRepository {
	return &ContentRepository{DB: db}
}

func (r *ContentRepository) Create(Content *models.Content) error {
	_, err := r.DB.Model(Content).Returning("*").Insert()
	return err
}

func (r *ContentRepository) FindByID(id int) (*models.Content, error) {
	Content := &models.Content{ID: id}
	err := r.DB.Model(Content).WherePK().Select()
	return Content, err
}

func (r *ContentRepository) Update(Content *models.Content) error {
	_, err := r.DB.Model(Content).WherePK().Update()
	return err
}

func (r *ContentRepository) Delete(id int) error {
	Content := &models.Content{ID: id}
	_, err := r.DB.Model(Content).WherePK().Delete()
	return err
}

func (r *ContentRepository) GetAll() ([]*models.Content, error) {
	var Contents []*models.Content
	err := r.DB.Model(&Contents).Select()
	return Contents, err
}

