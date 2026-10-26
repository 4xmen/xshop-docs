# Item

The `Item` model stores a menu item, such as a link to a post, product, group, or category, or a direct link to a custom path.

Each item belongs to a menu and can have child items. The item type is specified by `kind`, and its destination is determined by the `menuable` relationship or the value of `meta`, depending on the type.

## `items` table structure

| Field | Type | Description |
|---|---|---|
| `id` | BIGINT UNSIGNED | Item ID |
| `title` | TEXT | Display title of the item; the same as its Label |
| `menuable_id` | BIGINT UNSIGNED NULL | ID of the destination entity in the polymorphic relationship |
| `menuable_type` | VARCHAR(255) NULL | Class of the destination entity in the polymorphic relationship |
| `kind` | VARCHAR(255) NULL | Item type, such as `module` or `direct` |
| `meta` | TEXT NULL | Direct link address when `kind` is `direct` |
| `parent` | INT UNSIGNED NULL | Parent item ID, used to create nested menus |
| `sort` | INT UNSIGNED | Item display order; defaults to `0` |
| `icon` | VARCHAR(255) NULL | Remix Icon name |
| `user_id` | BIGINT UNSIGNED | ID of the user associated with the item |
| `menu_id` | BIGINT UNSIGNED | ID of the menu the item belongs to |
| `created_at` | TIMESTAMP NULL | Creation time |
| `updated_at` | TIMESTAMP NULL | Last update time |

## Properties

### Title translation

```php
public $translatable = ['title'];
```

The `title` field is translatable and can display the item title in the current language.

### Item type and destination

The `kind` field specifies how the item link is constructed:

- **`module`**: The item is connected to an entity through the polymorphic `menuable` relationship, such as a post, product, group, or category.
- **`direct`**: The direct link is read from the `meta` field and does not require a destination entity.

In this design, `menuable` represents a model-based destination, while `meta` represents a URL-based destination. These are two different ways to specify an item's destination.

## Methods and relationships

### `menu()`

Defines a `belongsTo` relationship with the [Menu](menu.md) model.

This relationship can be used to retrieve the menu the item belongs to. The foreign key is `menu_id`, and the referenced key is `id`.

### `parent()`

Defines a `belongsTo` relationship with the `Item` model itself and finds the parent item through the `parent` field.

This relationship is used to create menu hierarchies.

### `children()`

Defines a `hasMany` relationship with the `Item` model itself and returns all items whose `parent` value matches the current item's ID.

### `dest()`

Defines a polymorphic `morphTo` relationship named `menuable` and determines the item's destination using the following two fields:

- `menuable_type`: Class of the destination model
- `menuable_id`: ID of the destination record

The destination type can be one of the models supported in the `$mrohps` list of the `Menu` model.

### `webUrl()`

Generates the final menu item URL based on the value of `kind`.

**For `direct` items:**

- The URL is read from the `meta` field.
- If the multilingual feature `app.xlang.active` is enabled and the current language differs from the default language, the method attempts to add the current language to the URL.
- If the URL starts with `/`, the language prefix is added to the beginning of the path.
- Otherwise, the home page URL is obtained through `route('client.welcome')` and replaced with its language-specific version.
- In the default language, or when the multilingual feature is disabled, the `meta` value is returned unchanged.

**For items other than `direct`:**

The `webUrl()` method retrieves the destination entity through `dest()` and calls that entity's `webUrl()` method.

Therefore, for module items, the destination model must provide a `webUrl()` method.

## Database and implementation notes

- The `menu_id` and `user_id` fields have foreign keys, and `ON DELETE RESTRICT` prevents referenced records from being deleted when dependent items exist.
- The `parent` field has an index, but the provided SQL does not define a foreign key from it to `items.id`. As a result, this database definition alone does not guarantee parent-child relationship integrity.
- The type of `parent` is `INT UNSIGNED`, while `id` is `BIGINT UNSIGNED`. This type mismatch is worth reviewing.
- In the `webUrl()` method, accessing `$this->meta[0]` assumes that `meta` contains a usable value. Since `meta` is nullable in the database, the behavior of `direct` items without a URL should also be reviewed.
- For items other than `direct`, the method assumes that the destination is valid. If `dest()` returns `null`, calling `webUrl()` on it will cause an error.