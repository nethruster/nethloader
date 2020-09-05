package fs

import (
	"fmt"
	"github.com/stretchr/testify/require"
	"io/ioutil"
	"os"
	"strconv"
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
		t.Run(strconv.Itoa(i), func(t *testing.T) {
			err := repo.Delete(name)
			assert.EqualError(t, err, file.ErrInvalidFileName.Error())
		})
	}

}

func TestDeleteNonExistent(t *testing.T) {
	repo := newRepo()
	defer cleanRepo(&repo)

	for i, name := range validNames {
		t.Run(strconv.Itoa(i), func(t *testing.T) {
			err := repo.Delete(name)
			assert.EqualError(t, err, file.ErrFileNotFound.Error())
		})
	}
}

func TestGetWithInvalidName(t *testing.T) {
	repo := newRepo()
	defer cleanRepo(&repo)
	for i, name := range invalidNames {
		t.Run(strconv.Itoa(i), func(t *testing.T) {
			reader, err := repo.Get(name)
			assert.Nilf(t, reader, "case %d", i)
			assert.EqualError(t, err, file.ErrInvalidFileName.Error())
		})
	}
}

func TestGetNonExistent(t *testing.T) {
	repo := newRepo()
	defer cleanRepo(&repo)

	for i, name := range validNames {
		t.Run(strconv.Itoa(i), func(t *testing.T) {
			reader, err := repo.Get(name)
			assert.Nil(t, reader)
			assert.EqualError(t, err, file.ErrFileNotFound.Error())
		})
	}
}

func TestStoreWithInvalidName(t *testing.T) {
	repo := newRepo()
	defer cleanRepo(&repo)

	for i, name := range invalidNames {
		t.Run(strconv.Itoa(i), func(t *testing.T) {
			err := repo.Store(name, strings.NewReader("I'm useless"))
			assert.EqualError(t, err, file.ErrInvalidFileName.Error())
		})
	}
}

func TestStoreFile(t *testing.T) {
	repo := newRepo()
	defer cleanRepo(&repo)

	for i, name := range validNames {
		t.Run(strconv.Itoa(i), func(t *testing.T) {
			err := repo.Store(name, strings.NewReader(fileContent))
			assert.NoErrorf(t, err, "case %d", i)
			file, err := os.Open(fmt.Sprintf("%s%c%s", repo.RootDirectory, os.PathSeparator, name))
			if err != nil {
				if os.IsNotExist(err) {
					t.Fatal("file not saved in the filesystem")
				}
				panic(err)
			}
			defer file.Close()
			content, err := ioutil.ReadAll(file)
			if err != nil {
				panic(err)
			}
			assert.Equal(t, fileContent, string(content))
		})
	}
}

func TestStoreDuplicated(t *testing.T) {
	const fileName = "test"
	const fileContent = "this is a image"
	repo := newRepo()
	defer cleanRepo(&repo)

	err := repo.Store(fileName, strings.NewReader(fileContent))
	require.NoError(t, err)

	err = repo.Store(fileName, strings.NewReader(fileContent))
	assert.EqualError(t, err, file.ErrFileAlreadyExists.Error())
}

func TestStoreAndGet(t *testing.T) {
	repo := newRepo()
	defer cleanRepo(&repo)
	for i, name := range validNames {
		t.Run(strconv.Itoa(i), func(t *testing.T) {
			err := repo.Store(name, strings.NewReader(fileContent))
			require.NoError(t, err)
			reader, err := repo.Get(name)
			require.NoError(t, err)

			content, err := ioutil.ReadAll(reader)
			if err != nil {
				panic(err)
			}
			assert.Equal(t, fileContent, string(content))
		})
	}
}

func TestStoreAndDelete(t *testing.T) {
	repo := newRepo()
	defer cleanRepo(&repo)
	for i, name := range validNames {
		t.Run(strconv.Itoa(i), func(t *testing.T) {
			err := repo.Store(name, strings.NewReader(fileContent))
			require.NoError(t, err)
			err = repo.Delete(name)
			assert.NoError(t, err)
		})
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
