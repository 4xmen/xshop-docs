# Menu

The `Menu` model is used to define site menus. Each menu stores its name and creator, and its items are retrieved through the relationship with the `Item` model. Each item's structure, destination, order, and hierarchy are defined in the `Item` model.

## `menus` table structure
| Field | Type | Nullable | Description |
|---|---|---|---|
| `id` | BIGINT UNSIGNED | No | Menu ID |
| `name` | VARCHAR(255) | No | Menu name |
| `user_id` | BIGINT UNSIGNED | No | ID of the user who created the menu; associated with the `users` table |
| `deleted_at` | TIMESTAMP | Yes | Soft-deletion time |
| `created_at` | TIMESTAMP | Yes | Creation time |
| `updated_at` | TIMESTAMP | Yes | Time of last update |

## Properties and methods

### `$mrohps`

List of models supported by this system as destinations that can be linked to menu items:

- `Product` — product
- `Post` — post
- `Group` — post groups
- `Category` — product category
- `Clip` — video content
- `Gallery` — image gallery

This list specifies the classes allowed to be linked to menu items. The variable name is preserved as it appears in the current code.

### `items()`

Defines a `hasMany` relationship with the [Item](item.md) model and sorts the items belonging to the menu by the `sort` field in ascending order.

Each menu can have multiple items; the parent-child structure and how each item's destination is determined are managed by the `Item` model.

## Database notes

- The `user_id` field has a foreign key to the `users` table.
- When a user or menu is deleted, the database may reject the deletion if dependent records exist, due to the `ON DELETE RESTRICT` setting.
- The table has a `deleted_at` field; however, soft-deletion behavior in practice depends on the `Menu` model's configuration.