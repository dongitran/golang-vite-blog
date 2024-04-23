package repositories

import (
	"github.com/dongitran/database-change-monitoring/models"
	"github.com/go-pg/pg/v10"
)

type ValidateRepository struct {
	DB *pg.DB
}

func NewValidateRepository(db *pg.DB) *ValidateRepository {
	return &ValidateRepository{DB: db}
}

func (r *ValidateRepository) Create(validate *models.Validate) error {
	_, err := r.DB.Model(validate).Returning("*").Insert()
	return err
}

func (r *ValidateRepository) FindByID(id int) (*models.Validate, error) {
	validate := &models.Validate{ID: id}
	err := r.DB.Model(validate).WherePK().Select()
	return validate, err
}

func (r *ValidateRepository) Update(validate *models.Validate) error {
	_, err := r.DB.Model(validate).WherePK().Update()
	return err
}

func (r *ValidateRepository) Delete(id int) error {
	validate := &models.Validate{ID: id}
	_, err := r.DB.Model(validate).WherePK().Delete()
	return err
}

func (r *ValidateRepository) GetAll() ([]*models.Validate, error) {
	var validates []*models.Validate
	err := r.DB.Model(&validates).Select()
	return validates, err
}

func (r *ValidateRepository) GetValidateAvailable(database string, table string) ([]models.Validate, error) {
	var validates []models.Validate

	query := `
			SELECT *
			FROM validates
			WHERE ("database" IS NULL)
			or (database = ? and "table" is null)
			or (database = ? and "table" = ?)
	`

	_, err := r.DB.Query(&validates, query, database, database, table)
	if err != nil {
		return nil, err
	}

	return validates, nil
}
