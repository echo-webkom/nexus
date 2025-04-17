package account

import (
	"context"

	"github.com/jackc/pgx/v5/pgxpool"
)

type AccountService struct {
	pool *pgxpool.Pool
}

func New(pool *pgxpool.Pool) *AccountService {
	return &AccountService{
		pool,
	}
}

// Finds the account by the provder and provider id
func (s *AccountService) FindAccountByProvider(ctx context.Context, provider, id string) (Account, error) {
	var account Account

	err := s.pool.QueryRow(ctx, `
		SELECT user_id, provider, provider_acccount_id
		FROM account
		WHERE provider = $1 AND provider_account_id = $2
	`, provider, id).Scan(
		&account.UserID,
		&account.Provider,
		&account.ProviderAccountID,
	)

	if err != nil {
		return Account{}, err
	}

	return account, nil
}
