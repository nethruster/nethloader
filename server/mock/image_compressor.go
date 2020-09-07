package mock

import "io"

type ImageCompressorService struct {
	InvocationsOfCompress int
}

func NewImageCompressorService() *ImageCompressorService {
	return &ImageCompressorService{}
}

func (i *ImageCompressorService) Compress(format int, reader io.Reader) (io.Reader, error) {
	i.InvocationsOfCompress++
	return reader, nil
}
