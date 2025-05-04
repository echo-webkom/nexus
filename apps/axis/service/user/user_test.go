package user_test

import (
	"context"
	"os"
	"path/filepath"
	"strings"
	"testing"

	"github.com/echo-webkom/axis/service/user"
	"github.com/golang-migrate/migrate/v4"
	_ "github.com/golang-migrate/migrate/v4/database/postgres"
	_ "github.com/golang-migrate/migrate/v4/source/file"
	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/stretchr/testify/assert"
	"github.com/testcontainers/testcontainers-go/modules/postgres"
)

func prepareMigrations(srcDir string) (string, error) {
	tmpDir, err := os.MkdirTemp("", "migrations")
	if err != nil {
		return "", err
	}
	entries, err := os.ReadDir(srcDir)
	if err != nil {
		return "", err
	}
	for _, e := range entries {
		if filepath.Ext(e.Name()) != ".sql" {
			continue
		}
		base := strings.TrimSuffix(e.Name(), ".sql")
		data, err := os.ReadFile(filepath.Join(srcDir, e.Name()))
		if err != nil {
			return "", err
		}
		upPath := filepath.Join(tmpDir, base+".up.sql")
		if err := os.WriteFile(upPath, data, 0o644); err != nil {
			return "", err
		}
		downPath := filepath.Join(tmpDir, base+".down.sql")
		stub := []byte("-- no down migration\n")
		if err := os.WriteFile(downPath, stub, 0o644); err != nil {
			return "", err
		}
	}
	return tmpDir, nil
}

func TestUserService(t *testing.T) {
	ctx := context.Background()

	pgContainer, err := postgres.Run(ctx, "postgres:15.3-alpine",
		postgres.BasicWaitStrategies(),
	)
	if err != nil {
		t.Fatal(err)
	}

	t.Cleanup(func() {
		if err := pgContainer.Terminate(ctx); err != nil {
			t.Fatalf("failed to terminate pgContainer: %s", err)
		}
	})

	connStr, err := pgContainer.ConnectionString(ctx, "sslmode=disable")
	assert.NoError(t, err)

	pgxpool, err := pgxpool.New(ctx, connStr)

	migDir, err := prepareMigrations("../../../../packages/db/drizzle/migrations")
	if err != nil {
		t.Fatal(err)
	}
	m, err := migrate.New(
		"file://"+migDir,
		connStr,
	)
	if err != nil {
		t.Fatal(err)
	}
	if err := m.Up(); err != nil && err != migrate.ErrNoChange {
		t.Fatalf("failed to run migrations: %s", err)
	}

	us := user.New(pgxpool)

	t.Run("FindUserByFeideID", func(t *testing.T) {
		user, err := us.FindUserByFeideID(ctx, "foobar")
		assert.Error(t, err)
		assert.Empty(t, user.ID)
	})

}
