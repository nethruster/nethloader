package domain

import (
	"errors"
	"io"
	"time"
)

var (
	ErrImageNotFound        = errors.New("image not found")
	ErrInvalidImageEncoding = errors.New("invalid image encoding")
	ErrInvalidOwnerID       = errors.New("invalid owner id")
	ErrDuplicatedImageID    = errors.New("duplicated image id")
)

type Image struct {
	ID        string
	CreatedAt time.Time
	Format    int
	OwnerID   string
}

type ImageService interface {
	Get(id string) (*Image, error)
	Create(ownerID string, encodedImageReader io.Reader) (*Image, error)
}

type ImageRepository interface {
	Get(id string) (*Image, error)
	Store(image *Image) error
}

// ImageFormats
const (
	ImageFormatUnrecognized = iota
	ImageFormatJPEG
	ImageFormatPNG
)

var ImageFormatExtension = [...]string{
	"",    // ImageFormatUnrecognized
	"jpg", // ImageFormatJPEG
	"png", // ImageFormatPNG
}
