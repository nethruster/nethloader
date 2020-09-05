package fs

import (
	"fmt"
	"io"
	"os"
	"path/filepath"
	"strings"

	"github.com/nethruster/nethloader/server/pkg/file"
)

type ImageFileRepository struct {
	RootDirectory string
}

func (r ImageFileRepository) Delete(name string) error {
	name = processName(name)
	if !validateName(name) {
		return file.ErrInvalidFileName
	}
	err := os.Remove(r.getFilePath(name))
	if err != nil {
		if os.IsNotExist(err) {
			return file.ErrFileNotFound
		}
	}

	return nil
}

func (r ImageFileRepository) Get(name string) (io.ReadCloser, error) {
	name = processName(name)
	if !validateName(name) {
		return nil, file.ErrInvalidFileName
	}
	f, err := os.Open(r.getFilePath(name))
	if err != nil {
		if os.IsNotExist(err) {
			return nil, file.ErrFileNotFound
		}
		return nil, fmt.Errorf("error opening file: %w", err)
	}

	return f, nil
}

func (r ImageFileRepository) Store(name string, reader io.Reader) error {
	name = processName(name)
	if !validateName(name) {
		return file.ErrInvalidFileName
	}
	return writeToFile(r.getFilePath(name), reader)
}

func (r ImageFileRepository) getFilePath(name string) string {
	return fmt.Sprintf("%s%c%s", r.RootDirectory, os.PathSeparator, name)
}

func writeToFile(path string, reader io.Reader) error {
	err := os.MkdirAll(filepath.Dir(path), 0755)
	if err != nil {
		return fmt.Errorf("error creting folder structure: %w", err)
	}

	f, err := os.OpenFile(path, os.O_WRONLY|os.O_CREATE|os.O_EXCL, 0644)
	if err != nil {
		if os.IsExist(err) {
			return file.ErrFileAlreadyExists
		}
		return fmt.Errorf("error creating file: %w", err)
	}
	defer f.Close()

	_, err = io.Copy(f, reader)
	if err != nil {
		return fmt.Errorf("error wrting file: %w", err)
	}
	return nil
}

func processName(name string) string {
	if os.PathSeparator != file.RepositoryPathSeparator {
		// strings are immutable so in order to modify it a copy is required
		// this quick check prevents unnecessary allocations if the name doesn't need any modification
		if strings.ContainsRune(name, file.RepositoryPathSeparator) {
			nameBytes := []byte(name)
			for i := range nameBytes {
				if nameBytes[i] == file.RepositoryPathSeparator {
					nameBytes[i] = os.PathSeparator
				}
			}
			name = string(nameBytes)
		}
	}
	// remove leading path separator if exists
	if len(name) > 0 && name[0] == os.PathSeparator {
		name = name[1:]
	}
	return name
}

func validateName(name string) bool {
	if name == "" || name == " " || name == "." {
		return false
	}
	if len(name) > 1 && name[:2] == ".." {
		if (len(name) < 3) || (name[2] == os.PathSeparator) {
			return false
		}
	}
	// check for /../ inside the path
	{
		leadingSeparator := false
		consecutiveDots := 0
		for _, char := range name {
			switch char {
			case os.PathSeparator:
				if leadingSeparator && consecutiveDots == 2 {
					return false
				}
				leadingSeparator = true
				consecutiveDots = 0
			case '.':
				consecutiveDots++
			default:
				leadingSeparator = false
				consecutiveDots = 0
			}
		}
		if leadingSeparator && consecutiveDots == 2 {
			return false
		}
	}

	return true
}
