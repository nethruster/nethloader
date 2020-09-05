package fs

import (
	"fmt"
	"io/ioutil"
	"os"
	"strings"
	"testing"

	"github.com/nethruster/nethloader/server/pkg/file"
	"github.com/stretchr/testify/assert"
)

const fileContent = "this is a image"

var validNames = []string{
	"test1",
	"/test2",
	"./test3",
	"./..test",
	"...",
	"parentfolder/test",
	"parent/folder/test",
}
var invalidNames = []string{
	"",
	"/",
	".",
	"..",
	"../",
	"../paco",
	"paco/..",
	"paco/../pepe",
}

func TestImplementsImageFileRepository(t *testing.T) {
	var _ file.Repository = ImageFileRepository{}
}

func TestDeleteInvalidName(t *testing.T) {
	repo := newRepo()
	defer cleanRepo(&repo)

	for i, name := range invalidNames {
		err := repo.Delete(name)
		assert.EqualErrorf(t, err, file.ErrInvalidFileName.Error(), "case %d", i)
	}

}

func TestDeleteNonExistent(t *testing.T) {
	repo := newRepo()
	defer cleanRepo(&repo)

	for i, name := range validNames {
		err := repo.Delete(name)
		assert.EqualErrorf(t, err, file.ErrFileNotFound.Error(), "case %d", i)
	}
}

func TestGetWithInvalidName(t *testing.T) {
	repo := newRepo()
	defer cleanRepo(&repo)
	for i, name := range invalidNames {
		reader, err := repo.Get(name)
		assert.Nilf(t, reader, "case %d", i)
		assert.EqualErrorf(t, err, file.ErrInvalidFileName.Error(), "case %d", i)
	}
}

func TestGetNonExistent(t *testing.T) {
	repo := newRepo()
	defer cleanRepo(&repo)

	for i, name := range validNames {
		reader, err := repo.Get(name)
		assert.Nilf(t, reader, "case %d", i)
		assert.EqualErrorf(t, err, file.ErrFileNotFound.Error(), "case %d", i)
	}
}

func TestStoreWithInvalidName(t *testing.T) {
	repo := newRepo()
	defer cleanRepo(&repo)

	for i, name := range invalidNames {
		err := repo.Store(name, strings.NewReader("I'm useless"))
		assert.EqualErrorf(t, err, file.ErrInvalidFileName.Error(), "name in position %d", i)
	}
}

func TestStoreFile(t *testing.T) {
	repo := newRepo()
	defer cleanRepo(&repo)

	for i, name := range validNames {
		err := repo.Store(name, strings.NewReader(fileContent))
		assert.NoErrorf(t, err, "case %d", i)
		file, err := os.Open(fmt.Sprintf("%s%c%s", repo.RootDirectory, os.PathSeparator, name))
		if err != nil {
			if os.IsNotExist(err) {
				t.Fatalf("name in postion %d: file not saved in the filesystem", i)
			}
			panic(err)
		}
		defer file.Close()
		content, err := ioutil.ReadAll(file)
		if err != nil {
			panic(err)
		}
		assert.Equalf(t, fileContent, string(content), "case %d", i)
	}
}

func TestStoreDuplicated(t *testing.T) {
	const fileName = "test"
	const fileContent = "this is a image"
	repo := newRepo()
	defer cleanRepo(&repo)

	err := repo.Store(fileName, strings.NewReader(fileContent))
	assert.NoError(t, err)

	err = repo.Store(fileName, strings.NewReader(fileContent))
	assert.EqualError(t, err, file.ErrFileAlreadyExists.Error())
}

func TestStoreAndGet(t *testing.T) {
	repo := newRepo()
	defer cleanRepo(&repo)
	for i, name := range validNames {
		err := repo.Store(name, strings.NewReader(fileContent))
		assert.NoErrorf(t, err, "case %d: store", i)
		reader, err := repo.Get(name)
		assert.NoErrorf(t, err, "case %d: get", i)

		content, err := ioutil.ReadAll(reader)
		if err != nil {
			panic(err)
		}
		assert.Equalf(t, fileContent, string(content), "case %d", i)
	}
}

func TestStoreAndDelete(t *testing.T) {
	repo := newRepo()
	defer cleanRepo(&repo)
	for i, name := range validNames {
		err := repo.Store(name, strings.NewReader(fileContent))
		assert.NoErrorf(t, err, "case %d: store", i)
		err = repo.Delete(name)
		assert.NoErrorf(t, err, "case %d: get", i)
	}
}

func newRepo() ImageFileRepository {
	dirPath, err := ioutil.TempDir("", "nethloader_image_file_repository_test_*")
	if err != nil {
		panic(err)
	}
	return ImageFileRepository{
		RootDirectory: dirPath,
	}
}

func cleanRepo(repo *ImageFileRepository) {
	err := os.RemoveAll(repo.RootDirectory)
	if err != nil {
		panic(err)
	}
}
