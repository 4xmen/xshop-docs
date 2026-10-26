# Creator

**Model purpose:** This model is used to define a product creator. Depending on the type of store, a creator can be a product brand, such as Samsung or Apple, or a person, such as an author or translator. Therefore, its use is not limited to commercial brands; it can be used for various types of stores and product catalogs.

## Table: `creators`

| Field | Type | Nullable | Comment |
|---|---|---|---|
| `id` | BIGINT UNSIGNED | No | Unique creator identifier |
| `name` | TEXT | No | Creator name |
| `slug` | VARCHAR(128) | No | Unique text identifier for the creator URL |
| `subtitle` | TEXT | Yes | Creator subtitle |
| `description` | LONGTEXT | Yes | Creator description |
| `image` | VARCHAR(2048) | Yes | Creator image |
| `parent_id` | INT UNSIGNED | Yes | Parent creator identifier |
| `canonical` | TEXT | Yes | Canonical URL of the creator page |
| `sort` | INT | No | Creator display order |
| `deleted_at` | TIMESTAMP | Yes | Record soft-deletion time |
| `created_at` | TIMESTAMP | Yes | Record creation time |
| `updated_at` | TIMESTAMP | Yes | Time of the last update |
| `markups` | TEXT | Yes | Schema Markup settings for the creator page |

## Additional Field Details

- `name`, `subtitle`, and `description`: These fields are translatable.
- `slug`: A unique value used to identify the creator in the web page URL.
- `image`: Specifies the creator image; the optimized and original versions are served from different paths.
- `parent_id`: Enables a hierarchical structure between creators; for example, creating creators that are subordinate to another creator.
- `canonical`: Stores the canonical URL of the creator page and can be used to manage the preferred page URL for search engines.
- `sort`: Specifies the creator's display order.
- `markups`: Stores custom Schema Markup settings for the creator page.

## Methods

### `$translatable = ['name', 'subtitle', 'description']`

Specifies that the creator's name, subtitle, and description use the model's translation system and can have different values in different languages.

### `markupKeywords()`

Provides the variables available for use in the creator's Schema Markup settings as an array of labels and values.

Variables defined in the current code:

- `app.name`: The application name from `config('app.name')`.
- `name`: The creator name from the model's `name` field.

### `findOrCreate($values, $type = null, $locale = null)`

Finds or creates a creator based on a string, array, or collection of values. This method simplifies assigning a creator when creating or editing a product and supports working with multiple creators in a single call.

- If the input value is a `Creator` instance, that instance is used.
- Otherwise, each value is passed to `findOrCreateFromString()`.
- If the input is a string, a single creator is returned; otherwise, a collection of results is returned.

### `findFromString($name, $type = null, $locale = null)`

Searches for an existing creator by name or `slug` in the specified language. If no language is specified, the model's current language is used. Returns `null` if no creator is found.

The `$type` parameter is not used in the search condition in the current version of the code.

### `findOrCreateFromString($name, $type = null, $locale = null)`

Searches for a creator by name or `slug` and creates a new record if none exists. When creating the record, the name is saved in the selected language and the `slug` is generated using the `sluger()` function.

The `$type` parameter is also not used to create the record in the current version of the code.

### `children()`

Defines a `hasMany` relationship with the `Creator` model through the `parent_id` field and returns the creators subordinate to this creator.

### `getRouteKeyName()`

Sets the `slug` field as the model's route key so the creator can be identified in routes by its text identifier.

### `imgUrl()`

Returns the URL of the optimized creator image. If no image is defined, it returns the URL of the site's default logo.

### `imgOriginalUrl()`

Returns the URL of the original creator image. If no image is defined, it returns the URL of the site's default logo.

### `attachs()`

Defines a polymorphic (`morphMany`) relationship with the [Attachment](attachment.md) model and returns the attachments associated with the creator.

### `webUrl()`

Builds the public creator page URL using the `client.creator` route and sets the URL language with `fixUrlLang()`.

### `products()`

Defines a many-to-many (`belongsToMany`) relationship with the [Product](product.md) model and returns the products associated with the creator.

### `evaluations()`

Retrieves the related evaluations from the [Evaluation](evaluation.md) model. The results include public evaluations without a specific association, evaluations for the `Creator` type without a specified identifier, and evaluations specific to this creator.

### `parent()`

Defines a `belongsTo` relationship with the `Creator` model through `parent_id` and returns the parent creator.

### `markup()`

Generates or returns the Schema Markup for the creator page so that structured information about the page can be provided to search engines.