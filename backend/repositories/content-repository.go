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

func (r *ContentRepository) GetLimitedSortedRecords(limit int, offset int, tag string) ([]*models.Content, int, error) {
	var Contents []*models.Content
	var total int
	var err error

	baseQuery := r.DB.Model(&Contents)

	if tag == "" || tag == "all" {
		total, err = baseQuery.Where("not (params->>'tags')::jsonb @> '[ \"trending\" ]'::jsonb").Count()
		if err != nil {
			return nil, 0, err
		}

		err = baseQuery.
			Where("not (params->>'tags')::jsonb @> '[ \"trending\" ]'::jsonb").
			Order("created_at DESC").
			Offset(offset).
			Limit(limit).
			Select()
	} else {
		total, err = baseQuery.Where("(params->>'tags')::jsonb @> '[ \"" + tag + "\" ]'::jsonb").Count()
		if err != nil {
			return nil, 0, err
		}

		err = baseQuery.
			Where("(params->>'tags')::jsonb @> '[ \"" + tag + "\" ]'::jsonb").
			Order("created_at DESC").
			Offset(offset).
			Limit(limit).
			Select()
	}

	if err != nil {
		return nil, 0, err
	}

	return Contents, total, nil
}

