# City

## Table: `cities`

Cities can be used in addresses and for better location identification.
| Field | Type | Nullable | Comment |
|---|---|---|---|
| `id` | BIGINT UNSIGNED | No | Unique city identifier |
| `name` | TEXT | No | City name |
| `lat` | DOUBLE | Yes | City latitude |
| `lng` | DOUBLE | Yes | City longitude |
| `state_id` | BIGINT UNSIGNED | No | Identifier of the associated province |
| `created_at` | TIMESTAMP | Yes | Record creation time |
| `updated_at` | TIMESTAMP | Yes | Time of the last update |
| `deleted_at` | TIMESTAMP | Yes | Record soft-deletion time |

## Additional Field Details

- `name`: City name; this field is translatable.
- `lat` and `lng`: The city's geographic coordinates, which can be used to display its location on a map.
- `state_id`: Identifier of the province associated with the city.

## Methods

### `$translatable = ['name']`

Specifies that the `name` field uses the model's translation system, allowing the city name to have different values in different languages.

### `state()`

Defines a `belongsTo` relationship with the [State](state.md) model and returns the province associated with the city based on `state_id`.