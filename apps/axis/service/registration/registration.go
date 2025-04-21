package registration

import (
	"context"

	"github.com/jackc/pgx/v5/pgxpool"
)

type RegistrationService struct {
	pool *pgxpool.Pool
}

func New(pool *pgxpool.Pool) *RegistrationService {
	return &RegistrationService{
		pool: pool,
	}
}

// Count returns the number of registrations for a given event ID.
func (s *RegistrationService) Count(ctx context.Context, happeningID string) (RegistrationCount, error) {
	var count RegistrationCount

	query := `
		SELECT
			COUNT(*) FILTER (WHERE status = 'registered') AS registered,
			COUNT(*) FILTER (WHERE status = 'waitlisted') AS waitlisted
		FROM registrations
		WHERE happening_id = $1
	`

	err := s.pool.QueryRow(ctx, query, happeningID).Scan(&count.Registered, &count.Waitlisted)
	if err != nil {
		return RegistrationCount{}, err
	}
	return count, nil
}
