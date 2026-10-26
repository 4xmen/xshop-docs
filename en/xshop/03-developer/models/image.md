# Image

Manages images in a gallery. Each record is associated with a gallery and a user, and stores information such as the image's display title and order. The image file is managed through the Media Library.

## `images` table

| Field | Type | Nullable | Description |
|---|---|---|---|
| `id` | BIGINT UNSIGNED | No | Unique image ID |
| `gallery_id` | BIGINT UNSIGNED | No | ID of the associated gallery; associated with the `galleries` table |
| `user_id` | BIGINT UNSIGNED | No | ID of the associated user; associated with the `users` table |
| `title` | TEXT | Yes | Image title or caption |
| `sort` | INT UNSIGNED | No | Image display order; defaults to `0` |
| `created_at` | TIMESTAMP | Yes | Creation date |
| `updated_at` | TIMESTAMP | Yes | Date of last update |

## Properties and methods

### `$translatable`

The `title` field supports storing and retrieving translations.

### `$guarded`

An empty array (`[]`) means that no fields in the model are explicitly protected from mass assignment. Therefore, inputs should be properly validated and controlled when using `create()` or `fill()`.

### `gallery()`

Defines a `belongsTo` relationship with the [Gallery](gallery.md) model and returns the gallery associated with the image.

### `registerMediaConversions(Media $media = null): void`

Defines the image's media conversions and optimizations:

- `image-image`: Converts and optimizes the image.
- `githumb`: Creates a thumbnail with dimensions configured through `gallery_thumb`; the image is cropped and optimized, and its format is taken from the `optimize` settings.
- If the `watermark` setting is enabled, a logo watermark is applied to the thumbnail, with configurable position, size, and opacity.

The `githumb` conversion is defined with `nonQueued()` so it is processed without being added to the media processing queue.

### `imgurl()`

Retrieves the image thumbnail URL from the Media Library. If no media exists for the model, it returns the site's default logo URL.

### `imgOriginalUrl()`

Returns the URL of the original version of the first media item associated with the model. If no media exists, the site's default logo URL is returned.