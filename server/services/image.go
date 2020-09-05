package services

import (
	"bufio"
	"fmt"
	"io"
	"time"

	gonanoid "github.com/matoous/go-nanoid"
	"github.com/nethruster/nethloader/server/domain"
	"github.com/nethruster/nethloader/server/pkg/file"
)

type Image struct {
	fileRepo  file.Repository
	imageRepo domain.ImageRepository
}

func NewImage(fileRepo file.Repository, imageRepo domain.ImageRepository) *Image {
	if fileRepo == nil {
		panic("no file repository provided")
	}
	if imageRepo == nil {
		panic("no image repository provided")
	}
	return &Image{
		fileRepo:  fileRepo,
		imageRepo: imageRepo,
	}
}

func (service *Image) Get(id string) (*domain.Image, error) {
	return service.imageRepo.Get(id)
}

func (service *Image) Create(ownerID string, encodedImageReader io.Reader) (*domain.Image, error) {
	if ownerID == "" {
		return nil, domain.ErrInvalidOwnerID
	}
	reader := bufio.NewReaderSize(encodedImageReader, 64*1024)
	format, err := imageFormatFromMagicNumber(reader)
	if err != nil {
		return nil, err
	}

	id, err := generateID()
	if err != nil {
		return nil, err
	}

	img := domain.Image{
		ID:        id,
		CreatedAt: time.Now(),
		Format:    format,
		OwnerID:   ownerID,
	}
	err = service.imageRepo.Store(&img)
	if err != nil {
		return nil, fmt.Errorf("error saving the image to database: %w", err)
	}
	err = service.fileRepo.Store(getFileName(id, format, ownerID), reader)
	if err != nil {
		return nil, fmt.Errorf("error storing image file: %w", err)
	}

	return &img, nil
}

func getFileName(id string, format int, ownerID string) string {
	return fmt.Sprintf("%s%c%s.%s", ownerID, file.RepositoryPathSeparator, id, domain.ImageFormatExtension[format])
}

func generateID() (string, error) {
	id, err := gonanoid.ID(10)
	if err != nil {
		return "", fmt.Errorf("error generating image ID: %w", err)
	}
	return id, nil
}

func imageFormatFromMagicNumber(encodedImageReader *bufio.Reader) (int, error) {
	mn, err := encodedImageReader.Peek(12)
	if err != nil {
		return domain.ImageFormatUnrecognized, fmt.Errorf("error interpreting file type %w", err)
	}

	if mn[0] == 0xFF && mn[1] == 0xD8 {
		return domain.ImageFormatJPEG, nil
	}
	if mn[0] == 0x89 && mn[1] == 0x50 &&
		mn[2] == 0x4e && mn[3] == 0x47 &&
		mn[4] == 0x0d && mn[5] == 0x0a &&
		mn[6] == 0x1a && mn[7] == 0x0a {
		return domain.ImageFormatPNG, nil
	}

	return domain.ImageFormatUnrecognized, domain.ErrInvalidImageEncoding
}
