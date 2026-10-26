# Gallery

Manages image galleries, including their title, description, publication status, view counter, and associated images. Each gallery can contain multiple images, and its featured image is managed separately through the Media Library.

## `galleries` table

| Field | Type | Nullable | Description |
|---|---|---|---|
| `id` | BIGINT UNSIGNED | No | Unique gallery ID |
| `title` | TEXT | No | Gallery title |
| `slug` | VARCHAR(255) | No | Unique text identifier used in the gallery URL |
| `description` | LONGTEXT | Yes | Gallery description |
| `view` | TINYINT UNSIGNED | No | Gallery view counter; defaults to `0` |
| `status` | TINYINT UNSIGNED | No | Gallery status; defaults to `0`, with the application using the status values `0` and `1` |
| `user_id` | BIGINT UNSIGNED | No | ID of the user who created the gallery; associated with the `users` table |
| `created_at` | TIMESTAMP | Yes | Creation date |
| `updated_at` | TIMESTAMP | Yes | Date of last update |

## Properties and methods

### `$translatable`

The `title` and `description` fields support storing and retrieving translations.

### `images()`

Defines a `hasMany` relationship with the `Image` model and retrieves the images belonging to the gallery based on `gallery_id`.

Images are ordered first by `sort` in ascending order, then by `id` in descending order.

### `registerMediaConversions(Media $media = null): void`

Defines the gallery's media conversions and optimizations:

- `gallery-image`: Converts and optimizes the image.
- `gthumb`: Creates a thumbnail with dimensions configured through `gallery_thumb`; the image is cropped and optimized, and its format is taken from the `optimize` settings.
- If the `watermark` setting is enabled, a logo watermark is applied to the thumbnail, with configurable position, size, and opacity.

The `gthumb` conversion is defined with `nonQueued()` so it is processed without being added to the media processing queue.

### `getRouteKeyName()`

Sets `slug` as the model's route key. As a result, Route Model Binding uses `slug` instead of `id`.

### `imgUrl()`

Returns the gallery's featured image URL. If the model has an image in the Media Library, the URL of the `gthumb` conversion for the first image is returned; otherwise, the URL of the site's default logo is returned.

This method returns the featured image, not the list of associated images retrieved through `images()`.

### `author()`

Defines a `belongsTo` relationship with the [User](user.md) model and returns the user associated with the gallery.

### `attachs()`

Defines a polymorphic `morphMany` relationship with the [Attachment](attachment.md) model and retrieves the attachments associated with the gallery.

### `webUrl()`

Generates the gallery page URL using the route named `client.gallery` and the `slug` value, then adjusts the URL language with `fixUrlLang()`.

### `comments()`

Defines a polymorphic `morphMany` relationship with the [Comment](comment.md) model and retrieves the comments associated with the gallery, without applying any specific comment status filter in this method.

### `approvedComments()`

Retrieves the comments associated with the gallery using the same polymorphic relationship, but returns only comments with `status = 1`.

### `markup()`

Displays the appropriate Schema Markup output for the gallery.