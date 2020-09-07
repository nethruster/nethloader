package mock

import (
	"bytes"
	"github.com/nethruster/nethloader/server/domain"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
	"io"
	"testing"
)

func TestImplementsImageCompressorService(t *testing.T) {
	var _ domain.ImageCompressorService = &ImageCompressorService{}
}

func TestCompressIsMarkedAsInvoked(t *testing.T) {
	compressor := newImageCompressorService()
	require.Equal(t, 0, compressor.InvocationsOfCompress)
	var reader io.Reader = bytes.NewBuffer([]byte("Test"))
	reader, err := compressor.Compress(domain.ImageFormatJPEG, reader)
	require.Equal(t, 1, compressor.InvocationsOfCompress)
	assert.NotNil(t, reader)
	assert.NoError(t, err)
}

func newImageCompressorService() *ImageCompressorService {
	return &ImageCompressorService{}
}
