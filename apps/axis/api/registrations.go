package api

import (
	"errors"
	"net/http"

	"github.com/echo-webkom/axis/apiutil"
	"github.com/echo-webkom/axis/service/registration"
)

func RegistrationsRouter(h *apiutil.Handler) *apiutil.Router {
	r := apiutil.NewRouter()

	// GET /registrations/{id}/count
	r.Get("/{id}/count", func(w http.ResponseWriter, r *http.Request) {
		ctx := r.Context()
		rs := registration.New(h.Pool)

		id := ctx.Value("id").(string)
		count, err := rs.Count(ctx, id)
		if err != nil {
			h.Error(w, http.StatusInternalServerError, errors.New("failed to count registrations"))
			return
		}

		h.JSON(w, http.StatusOK, count)
	})

	// POST /registrations/{id}
	r.Post("/{id}", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("unimplemented"))
	})

	return r
}
