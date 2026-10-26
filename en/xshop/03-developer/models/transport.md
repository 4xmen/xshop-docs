# Transport

The `Transport` model is used to manage product shipping methods, such as postal delivery or motorcycle courier. Each shipping method has a title, description, cost, icon, and settings for display order and default selection.

## Data structure
| Field | Type | Nullable | Description |
|---|---|---|---|
| `id` | BIGINT UNSIGNED | No | Unique ID of the shipping method |
| `title` | TEXT | No | Shipping method title; translatable |
| `description` | TEXT | Yes | Shipping method description; translatable |
| `sort` | INT UNSIGNED | No | Shipping method display order; defaults to `0` |
| `is_default` | TINYINT(1) | No | Indicates whether this is the default shipping method; defaults to `0` |
| `price` | DECIMAL(20,2) | No | Shipping cost; defaults to `0.00` |
| `icon` | VARCHAR(255) | Yes | Shipping method icon name from Remix Icon |
| `deleted_at` | TIMESTAMP | Yes | Record soft deletion time |
| `created_at` | TIMESTAMP | Yes | Record creation time |
| `updated_at` | TIMESTAMP | Yes | Record last update time |

## Properties

### `$translatable`

The `title` and `description` fields are defined as translatable, allowing the shipping method's title and description to be displayed in different languages.

## Notes

- The title can be the name of a shipping method, such as "Postal delivery" or "Motorcycle courier."
- The `sort` field is used to set the display order of shipping methods.
- The `is_default` field specifies which shipping method is selected by default.
- **When a new shipping method is selected as the default, the previous default shipping method must be unset as the default and its `is_default` value changed to `0` (`false`).** This behavior must be handled in the application logic; the table structure alone does not ensure that there is only one default method.
- The `price` field stores the shipping cost with two decimal places of precision.
- The `icon` field is intended for selecting an icon through an Icon Picker using the Remix Icon collection.
- The `deleted_at` field is intended to record the soft deletion time; whether Soft Deletes are enabled depends on the model configuration.