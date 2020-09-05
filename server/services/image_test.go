package services

import (
	"bytes"
	"errors"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
	"strconv"
	"testing"

	"github.com/nethruster/nethloader/server/domain"
	"github.com/nethruster/nethloader/server/repository/memory"
)

var (
	jpegExample = []byte{0xFF, 0xD8, 0xFF, 0xDB}
)

func TestImplementsImageServiceInterface(t *testing.T) {
	var _ domain.ImageService = &Image{}
}

func TestCreateWithInvalidEncoding(t *testing.T) {
	service, encodings := newService(), [][]byte{
		{255, 255, 255, 255},
		{0, 0, 0, 0},
		{0x49, 0x4E, 0x44, 0x58},
		{0x4D, 0x5A},
	}
	filler := make([]byte, 64)
	for i, enc := range encodings {
		t.Run(strconv.Itoa(i), func(t *testing.T) {
			enc = append(enc, filler...)
			_, err := service.Create("user1", bytes.NewReader(enc))
			if !errors.Is(err, domain.ErrInvalidImageEncoding) {
				t.Errorf("expected error ErrInvalidImageEncoding, got: %v", err)
			}
		})
	}
}

func TestCreateWithValidEncoding(t *testing.T) {
	type testCase struct {
		format      int
		encodedFile []byte
	}
	service := newService()
	encodings := []testCase{
		{
			format:      domain.ImageFormatJPEG,
			encodedFile: jpegExample, // JPEG raw
		},
		{
			format:      domain.ImageFormatJPEG,
			encodedFile: []byte{0xFF, 0xD8, 0xFF, 0xE0, 0x00, 0x10, 0x4A, 0x46, 0x49, 0x46, 0x00, 0x01}, // JPEG JFIF
		},
		{
			format:      domain.ImageFormatJPEG,
			encodedFile: []byte{0xFF, 0xD8, 0xFF, 0xEE}, // JPEG JFIF,
		},
		{
			format:      domain.ImageFormatJPEG,
			encodedFile: []byte{0xFF, 0xD8, 0xFF, 0xE1, 0xBB, 0xBB, 0x45, 0x78, 0x69, 0x66, 0x00, 0x00}, // JPEG Exif
		},
		{
			format:      domain.ImageFormatPNG,
			encodedFile: []byte{0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A}, // PNG,
		},
	}
	filler := make([]byte, 64)
	for i, c := range encodings {
		t.Run(strconv.Itoa(i), func(t *testing.T) {
			c.encodedFile = append(c.encodedFile, filler...)
			img, err := service.Create("user1", bytes.NewReader(c.encodedFile))
			require.NoError(t, err)
			assert.Equal(t, c.format, img.Format)
		})
	}
}

func TestCreateWithoutOwnerID(t *testing.T) {
	service := newService()
	_, err := service.Create("", bytes.NewReader(append(jpegExample, make([]byte, 64)...)))

	assert.EqualError(t, err, domain.ErrInvalidOwnerID.Error())
}

func TestCreateAndGet(t *testing.T) {
	service := newService()
	img, err := service.Create("user1", bytes.NewReader(append(jpegExample, make([]byte, 64)...)))
	require.NoError(t, err)
	require.NotNil(t, img)
	img2, err := service.Get(img.ID)
	require.NoError(t, err)

	assert.Equal(t, img, img2)
}

func TestCreateSavesToFileStorage(t *testing.T) {
	service := newService()
	img, err := service.Create("user1", bytes.NewReader(append(jpegExample, make([]byte, 64)...)))
	require.NoError(t, err)
	require.NotNil(t, img)

	_, err = service.fileRepo.Get("user1/" + img.ID + ".jpg")
	assert.NoError(t, err)
}

func newService() *Image {
	return NewImage(memory.NewFileRepository(), memory.NewImageRepository())
}
