package apputil

import (
	"database/sql"

	"github.com/go-chi/chi/v5"
)

type Handler struct {
	DB *sql.DB
}

type RouterConstructor func(h *Handler) chi.Router

type RouterFactory struct {
	Router  chi.Router
	Handler *Handler
}

// NewRouterFactory initializes and returns a RouterFactory
func NewRouterFactory(r chi.Router, h *Handler) *RouterFactory {
	return &RouterFactory{
		Router:  r,
		Handler: h,
	}
}

// Mount wraps chi's Mount, injecting the handler into the router constructor
func (rf *RouterFactory) Mount(constructor RouterConstructor) {
	rf.Router.Mount("/", constructor(rf.Handler))
}
