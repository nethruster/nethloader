package memory

import (
	"bytes"
	"fmt"
	"io"
	"io/ioutil"
	"sync"

	"github.com/nethruster/nethloader/server/pkg/file"
)

type FileRepository struct {
	store map[string][]byte
	mutex sync.RWMutex
}

func NewFileRepository() *FileRepository {
	return &FileRepository{store: make(map[string][]byte)}
}

type byteBufferCloseable struct {
	*bytes.Buffer
}

func (buff *byteBufferCloseable) Close() error {
	return nil
}

func (repo FileRepository) Delete(name string) error {
	repo.mutex.Lock()
	defer repo.mutex.Unlock()
	if _, exists := repo.store[name]; !exists {
		return file.ErrFileNotFound
	}

	delete(repo.store, name)

	return nil
}

func (repo FileRepository) Get(name string) (io.ReadCloser, error) {
	repo.mutex.RLock()
	defer repo.mutex.RUnlock()
	data, exists := repo.store[name]
	if !exists {
		return nil, file.ErrFileNotFound
	}

	return &byteBufferCloseable{bytes.NewBuffer(data)}, nil
}

func (repo FileRepository) Store(name string, reader io.Reader) error {
	repo.mutex.Lock()
	defer repo.mutex.Unlock()
	if _, exists := repo.store[name]; exists {
		return file.ErrFileAlreadyExists
	}
	data, err := ioutil.ReadAll(reader)
	if err != nil {
		return fmt.Errorf("error reading the data %w", err)
	}

	repo.store[name] = data
	return nil
}
