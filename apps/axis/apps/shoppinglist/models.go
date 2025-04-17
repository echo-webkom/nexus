package shoppinglist

type ShoppingListItemWithUser struct {
	ID       string `json:"id"`
	Name     string `json:"name"`
	UserID   string `json:"userId"`
	UserName string `json:"userName"`
}

type CreateShoppingItemRequest struct {
	Name   string `json:"name"`
	UserID string `json:"userId"`
}
