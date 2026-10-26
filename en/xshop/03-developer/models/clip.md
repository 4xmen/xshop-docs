# Clip

## Table: `clips`

| Field | Type | Nullable | Comment |
|---|---|---|---|
| `id` | BIGINT UNSIGNED | No | Unique clip identifier |
| `title` | TEXT | No | Clip title |
| `slug` | VARCHAR(255) | No | Unique text identifier for the clip URL |
| `body` | LONGTEXT | Yes | Clip text and description |
| `file` | VARCHAR(2048) | Yes | Path to the clip's video file |
| `cover` | VARCHAR(2048) | Yes | Path to the video cover image or preview poster |
| `user_id` | BIGINT UNSIGNED | No | Identifier of the clip creator |
| `status` | TINYINT UNSIGNED | No | Clip status, such as draft or published |
| `deleted_at` | TIMESTAMP | Yes | Record soft-deletion time |
| `created_at` | TIMESTAMP | Yes | Record creation time |
| `updated_at` | TIMESTAMP | Yes | Time of the last update |

## Additional Field Details

- `title` and `body`: These fields are translatable and can have separate values for different languages.
- `slug`: A unique value used to identify the clip in web addresses.
- `file`: Stores the path to the clip's video file.
- `cover`: Stores the path to the video's cover image or poster.
- `user_id`: Refers to the user who created the clip; the relationship is defined with restricted deletion and updates.
- `status`: Specifies the clip's publication status, including `draft` and `published`.

## Methods

### `$translatable = ['title', 'body']`

Specifies that the `title` and `body` fields use the model's translation system.

### `getRouteKeyName()`

Sets the `slug` field as the model's route key so the clip can be identified in routes by its text identifier.

### `imgUrl()`

Returns the URL of the clip's cover image or poster.

### `imgOriginalUrl()`

Returns the URL of the original version of the clip's cover image or poster.

### `fileUrl()`

Returns the URL of the clip's video file.

### `author()`

Specifies the relationship to the user who created the clip.

### `attachs()`

Returns the attachments associated with the clip.

### `webUrl()`

Returns the URL of the clip's web page and takes language settings into account when constructing the URL.

### `comments()`

Retrieves all comments associated with the clip through a polymorphic (`morphMany`) relationship. The [Comment](comment.md) model can have comments for several types of content.

### `approvedComments()`

Retrieves comments associated with the clip through a polymorphic relationship and returns only comments whose `status` value is `1`.

### `markup()`

Generates or returns the Schema Markup information for the clip for use in structured content presentation to search engines.

### `tagsList()`

Returns the clip's tags as a string. If custom tags are not available, it uses the keywords defined in the settings as a fallback.