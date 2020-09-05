package file

import (
	"errors"
	"io"
)

var (
	ErrFileAlreadyExists = errors.New("file already exists")
	ErrInvalidFileName   = errors.New("invalid file name")
	ErrFileNotFound      = errors.New("file not found")
)

// RepositoryPathSeparator is used as separator in the repository's paths, no matter the implementation nor the OS
const RepositoryPathSeparator = '/'

// Repository is an abstraction of a file storage
// All methods supports directories, using RepositoryPathSeparator as the path separator
// Different implementations may impose different name restrictions, but all invalid name shall be reported with the ErrInvalidFileName error
// A repository implementation is expected to be thread-safe
type Repository interface {
	// Delete removes a file from the repository
	// errors:
	// - ErrFileNotFound returned when no file in the repository has the provided name
	// - ErrInvalidFileName returned when the filename is not allowed by the file storage implementation
	Delete(name string) error
	// Get allows to read the file content via a reader, remember to close the reader after using it
	// errors:
	// - ErrFileNotFound returned when no file in the repository has the provided name
	// - ErrInvalidFileName returned when the filename is not allowed by the file storage implementation
	Get(name string) (io.ReadCloser, error)
	// Save stores the content of the provided reader in a file storage
	// errors:
	// - ErrFileAlreadyExists returned when a file with provided name already exists in the file storage
	// - ErrInvalidFileName returned when the filename is not allowed by the file storage implementation
	Store(name string, reader io.Reader) error
}
