# State

The `State` model is used to store information about states or provinces. Each record includes the state's name, geographic coordinates, and the name of its country.

## Data structure
| Field | Type | Nullable | Description |
|---|---|---|---|
| `id` | BIGINT UNSIGNED | No | Unique state or province ID |
| `name` | TEXT | No | State or province name; translatable |
| `lat` | DOUBLE | No | Latitude of the state or province |
| `lng` | DOUBLE | No | Longitude of the state or province |
| `country` | TEXT | No | Name of the country associated with the state or province; translatable |
| `created_at` | TIMESTAMP | Yes | Record creation time |
| `updated_at` | TIMESTAMP | Yes | Time of the last record update |
| `deleted_at` | TIMESTAMP | Yes | Record soft deletion time |

## Relationships

- `cities()`: A `hasMany` relationship with the `City` model; returns the cities associated with this state or province.

## Properties

### `$translatable`

The `name` and `country` fields are defined as translatable.

This feature allows values to be stored and displayed in the selected language. For example, a state's name can be "تهران" in Persian and `Tehran` in English.

## Methods

### `cities()`

Retrieves the cities associated with the state or province through the `City` model using a `hasMany` relationship.

## Notes

- The `lat` and `lng` fields store the geographic coordinates of the state or province and can be used to improve the user experience when selecting a location on a map (Map Picker).
- The `country` field stores the name of the country associated with the state or province and is a text field (`TEXT`), not a numeric ID.
- The `deleted_at` field exists in the table structure and is used to record the time of soft deletion; whether Soft Deletes is enabled in the model depends on its configuration.
- No foreign keys or other indexes are defined in the table structure besides the primary key `id`.