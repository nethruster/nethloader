package memory

import (
	"github.com/stretchr/testify/require"
	"strconv"
	"testing"

	"github.com/nethruster/nethloader/server/domain"
	"github.com/stretchr/testify/assert"
)

func TestImplementsImageRepository(t *testing.T) {
	var _ domain.ImageRepository = ImageRepository{}
}

func TestStoreImage(t *testing.T) {
	repo := NewImageRepository()
	err := repo.Store(&domain.Image{
		ID:     "test",
		Format: domain.ImageFormatJPEG,
	})
	assert.NoError(t, err)
}

func TestStoreImageTwice(t *testing.T) {
	repo := NewImageRepository()
	img := domain.Image{
		ID:     "test",
		Format: domain.ImageFormatJPEG,
	}
	err := repo.Store(&img)
	require.NoError(t, err)

	err = repo.Store(&img)
	assert.EqualError(t, err, domain.ErrDuplicatedImageID.Error())
}

func TestGetNonExistentImage(t *testing.T) {
	repo := NewImageRepository()
	img, err := repo.Get("404")
	assert.Nil(t, img)
	assert.EqualError(t, err, domain.ErrImageNotFound.Error())
}

func TestStoreThenGet(t *testing.T) {
	images := []domain.Image{
		{
			ID:     "test1",
			Format: domain.ImageFormatPNG,
		},
		{
			ID:     "test2",
			Format: domain.ImageFormatPNG,
		},
		{
			ID:     "test3",
			Format: domain.ImageFormatJPEG,
		},
	}
	repo := NewImageRepository()

	for i, image := range images {
		t.Run(strconv.Itoa(i), func(t *testing.T) {
			err := repo.Store(&image)
			require.NoError(t, err)

			img, err := repo.Get(image.ID)
			require.NoError(t, err)
			assert.Equal(t, &image, img)
		})
	}
}
