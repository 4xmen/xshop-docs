# Redirect

The `Redirect` model is used to manage redirects from one URL to another. Each record specifies the source URL, destination, whether the redirect is active, and its optional expiration date.

## Data structure

| Field | Type | Nullable | Description |
|---|---|---|---|
| `id` | BIGINT UNSIGNED | No | Unique redirect ID |
| `source` | VARCHAR(255) | No | Source URL; the path from which the redirect is made |
| `destination` | VARCHAR(255) | No | Destination URL; where the user is redirected |
| `expire` | DATETIME | Yes | Redirect expiration date; if empty, no expiration date is set in this field |
| `status` | TINYINT(1) | No | Whether the redirect is active or inactive; defaults to `1` |
| `created_at` | TIMESTAMP | Yes | Record creation time |
| `updated_at` | TIMESTAMP | Yes | Last update time |

## Model settings

### `$casts`

The `expire` field is cast to the `date` type so it can be used as a date in the model.

## Notes

- `source` and `destination` can be used to redirect an old URL to a new one.
- The `status` field is intended to activate or deactivate the redirect.
- The `expire` field allows an expiration date to be set; however, expiration checks and system behavior afterward depend on the application's runtime logic.
- The table structure does not define a unique constraint for `source`; therefore, the database alone does not prevent multiple redirects from having the same source URL.