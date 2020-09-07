package services

import (
	"bytes"
	"errors"
	"strconv"
	"testing"

	"github.com/nethruster/nethloader/server/mock"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"

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
	service, encodings := newService(false, false), [][]byte{
		{255, 255, 255, 255},
		{0, 0, 0, 0},
		{0x49, 0x4E, 0x44, 0x58},
		{0x4D, 0x5A},
	}
	filler := make([]byte, 64)
	for i, enc := range encodings {
		t.Run(strconv.Itoa(i), func(t *testing.T) {
			enc = append(enc, filler...)
			_, err := service.Create("user1", bytes.NewReader(enc), false)
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
	service := newService(false, false)
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
			img, err := service.Create("user1", bytes.NewReader(c.encodedFile), false)
			require.NoError(t, err)
			assert.Equal(t, c.format, img.Format)
		})
	}
}

func TestCreateWithoutOwnerID(t *testing.T) {
	service := newService(false, false)
	_, err := service.Create("", bytes.NewReader(append(jpegExample, make([]byte, 64)...)), false)

	assert.EqualError(t, err, domain.ErrInvalidOwnerID.Error())
}

func TestCreateAndGet(t *testing.T) {
	service := newService(false, false)
	img, err := service.Create("user1", bytes.NewReader(append(jpegExample, make([]byte, 64)...)), false)
	require.NoError(t, err)
	require.NotNil(t, img)
	img2, err := service.Get(img.ID)
	require.NoError(t, err)

	assert.Equal(t, img, img2)
}

func TestCreateSavesToFileStorage(t *testing.T) {
	service := newService(false, false)
	img, err := service.Create("user1", bytes.NewReader(append(jpegExample, make([]byte, 64)...)), false)
	require.NoError(t, err)
	require.NotNil(t, img)

	_, err = service.fileRepo.Get("user1/" + img.ID + ".jpg")
	assert.NoError(t, err)
}

func TestCreateCompression(t *testing.T) {
	type testCase struct {
		compressArgument              bool
		expectedInvocationsOfCompress int
		allowCompression              bool
		forceCompression              bool
	}
	cases := []testCase{
		{
			compressArgument:              false,
			expectedInvocationsOfCompress: 0,
			allowCompression:              false,
			forceCompression:              false,
		},
		{
			compressArgument:              true,
			expectedInvocationsOfCompress: 0,
			allowCompression:              false,
			forceCompression:              false,
		},
		{
			compressArgument:              false,
			expectedInvocationsOfCompress: 0,
			allowCompression:              true,
			forceCompression:              false,
		},
		{
			compressArgument:              true,
			expectedInvocationsOfCompress: 1,
			allowCompression:              true,
			forceCompression:              false,
		},
		{
			compressArgument:              false,
			expectedInvocationsOfCompress: 0,
			allowCompression:              false,
			forceCompression:              true,
		},
		{
			compressArgument:              true,
			expectedInvocationsOfCompress: 0,
			allowCompression:              false,
			forceCompression:              true,
		},
		{
			compressArgument:              false,
			expectedInvocationsOfCompress: 1,
			allowCompression:              true,
			forceCompression:              true,
		},
		{
			compressArgument:              true,
			expectedInvocationsOfCompress: 1,
			allowCompression:              true,
			forceCompression:              true,
		},
	}
	for i, testCase := range cases {
		t.Run(strconv.Itoa(i), func(t *testing.T) {
			service := newService(testCase.allowCompression, testCase.forceCompression)
			_, err := service.Create("test1", bytes.NewReader(append(jpegExample, make([]byte, 64)...)), testCase.compressArgument)
			require.NoError(t, err)
			assert.Equal(t, testCase.expectedInvocationsOfCompress, (service.compressorService.(*mock.ImageCompressorService)).InvocationsOfCompress)
		})
	}
}

func newService(allowCompression bool, forceCompression bool) *Image {
	return NewImage(allowCompression, forceCompression, mock.NewImageCompressorService(), memory.NewImageRepository(), memory.NewFileRepository())
}
