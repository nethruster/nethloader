package memory

import (
	"sync"

	"github.com/nethruster/nethloader/server/domain"
)

type ImageRepository struct {
	store map[string]domain.Image
	mutex sync.RWMutex
}

func NewImageRepository() *ImageRepository {
	return &ImageRepository{
		store: make(map[string]domain.Image),
	}
}

func (repo ImageRepository) Get(id string) (*domain.Image, error) {
	repo.mutex.RLock()
	defer repo.mutex.RUnlock()

	img, exists := repo.store[id]
	if !exists {
		return nil, domain.ErrImageNotFound
	}

	return &img, nil
}

func (repo ImageRepository) Store(image *domain.Image) error {
	repo.mutex.Lock()
	defer repo.mutex.Unlock()

	if _, exists := repo.store[image.ID]; exists {
		return domain.ErrDuplicatedImageID
	}
	repo.store[image.ID] = *image
	return nil
}
