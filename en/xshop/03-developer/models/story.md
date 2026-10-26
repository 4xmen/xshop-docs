# Story

The `Story` model is used to manage display stories, similar to Instagram Stories. Each record includes a title, description, preview image, original file, publication status, and display order.

## Data structure
| Field | Type | Nullable | Description |
|---|---|---|---|
| `id` | BIGINT UNSIGNED | No | Unique story ID |
| `title` | VARCHAR(255) | No | Story title; translatable |
| `slug` | VARCHAR(255), unique | No | Unique text identifier for the story, used in the URL |
| `description` | LONGTEXT | No | Story description |
| `image` | VARCHAR(255) | Yes | Name or ID of the story preview image file |
| `file` | VARCHAR(255) | Yes | Path to the original story file, including an image or video |
| `ext` | VARCHAR(255) | Yes | File extension |
| `likes` | BIGINT UNSIGNED | No | Number of likes on the story; defaults to `0` |
| `status` | TINYINT(1) | No | Publication status; `0` for draft (`Draft`) and `1` for published (`Published`) |
| `sort` | INT UNSIGNED | No | Story display order; defaults to `0` |
| `created_at` | TIMESTAMP | Yes | Story creation time |
| `updated_at` | TIMESTAMP | Yes | Time of the last story update |
| `deleted_at` | TIMESTAMP | Yes | Story soft deletion time |


## Properties

### `$translatable`

The `title` field is defined as translatable, allowing the story title to be stored and displayed in different languages.

## Methods

### `getRouteKeyName()`

Uses the `slug` field instead of `id` for Route Model Binding.

### `imgUrl()`

Returns the URL of the optimized story image. If no image is available, the site logo is used as a fallback.

### `imgOriginalUrl()`

Returns the URL of the original story image. If no image is available, the site logo is used as a fallback.

### `url()`

Returns the URL of the original story file, whether an image or video. If no file is available, the site logo is used as a fallback.

### `commentCount()`

Returns the number of comments on the story. This method is not currently implemented and returns the fixed value `15`.

## Notes

- The `slug` field has a unique index, so its value cannot be duplicated in the table.
- The `image` field is used for the preview image, and the `file` field is used for the original story file.
- The optimized preview image is stored in `optimized/stories/`, and the original image is stored in `stories/`.
- The `status` field specifies whether the story is a draft or published; displaying published stories depends on the application logic.
- The `sort` field is used to determine the display order of stories; the final order depends on how queries sort the results.
- The `likes` and `sort` fields default to `0`.
- The `deleted_at` field is intended to record the time of soft deletion; whether Soft Deletes is enabled depends on the model configuration.