# Xlang

The `Xlang` model is used to manage site languages and multilingual support. Languages are distinguished by URL prefixes; for example, the site's root path is used for the default language, while paths such as `/de` and `/fa` are used for other languages.

The name `Xlang` was chosen to avoid naming conflicts with Laravel's language system and packages related to `Lang`.

## Data structure
| Field | Type | Nullable | Description |
|---|---|---|---|
| `id` | BIGINT UNSIGNED | No | Unique language ID |
| `name` | VARCHAR(255) | No | Language name |
| `tag` | VARCHAR(7), unique | No | Language code and URL prefix, such as `fa` or `de` |
| `rtl` | TINYINT(1) | No | Indicates whether the language is right-to-left; defaults to `0` |
| `is_default` | TINYINT(1) | No | Indicates whether this is the site's default language; defaults to `0` |
| `img` | VARCHAR(255) | Yes | Language flag image filename |
| `emoji` | VARCHAR(255) | Yes | Language flag emoji |
| `sort` | TINYINT | No | Language display order; defaults to `0` |
| `deleted_at` | TIMESTAMP | Yes | Language soft deletion time |
| `created_at` | TIMESTAMP | Yes | Record creation time |
| `updated_at` | TIMESTAMP | Yes | Record last update time |

## Methods

### `imgUrl()`

Returns the optimized language flag image URL; if no image is available, the site logo is used as a fallback.

### `imgOriginalUrl()`

Returns the original language flag image URL; if no image is available, the site logo is used as a fallback.

### `getRouteKeyName()`

Uses the `tag` field instead of `id` for Route Model Binding.

## Notes

- The `tag` field has a unique index, so each language must have a unique code.
- The language prefix is applied to site routes, and pages, including posts and categories, follow the multilingual structure.
- The site's default language is specified through `is_default`. Ensuring that only one language is set as the default must be handled in the application logic; the table structure alone does not enforce it.
- The `rtl` field is used to identify right-to-left languages, such as Persian and Arabic.
- The `sort` field specifies the display order of languages.
- Language files are created as JSON files in the `resources/lang` directory. For example, `ar.json`, `de.json`, `fa.json`, and `fr.json` are located in this directory.
- English is the primary content language, and no separate translation file is provided for it. Administrators can manage existing language files through the editor.
- Flag files are available in the `langz/` directory, and their optimized versions are available in the `langz/optimized-` directory.
- The `deleted_at` field is intended to record the soft deletion time; whether Soft Deletes are enabled depends on the model configuration.