# GFX

Manages the site's visual and appearance settings. These settings are created by the initial Seeder and used by different parts of the template, including Theme and Segment. The settings' values are available as CSS variables in `client.scss`, allowing different parts of the site to follow a shared set of settings.

The initial records are created by the Seeder. In the current workflow, existing settings are edited; settings are not added or removed during normal use of the system.

## `gfxes` table

| Field | Type | Nullable | Description |
|---|---|---|---|
| `id` | BIGINT UNSIGNED | No | Unique setting ID |
| `key` | VARCHAR(255) | No | Unique setting key used to access its value in code; for example, `background` |
| `label` | VARCHAR(255) | No | Display title for the setting; for example, `Primary color` |
| `system` | TINYINT(1) | No | System setting indicator; its precise purpose in the current logic is not yet clear |
| `value` | LONGTEXT | No | Graphic setting value |
| `created_at` | TIMESTAMP | Yes | Creation date |
| `updated_at` | TIMESTAMP | Yes | Date of last update |

## Initial settings

The following values are created by the Seeder:

| `key` | `label` | Initial value | Purpose |
|---|---|---|---|
| `background` | `background color` | `#eeeeee` | Background color |
| `primary` | `Primary color` | `#03b2b5` | Template primary color |
| `secondary` | `Secondary color` | `#0064c2` | Template secondary color |
| `text` | `Text color` | `#111111` | Text color |
| `dark` | `Theme mode` | `0` | Sets the template's visual mode |
| `border-radius` | `Border radius` | `7px` | Corner radius |
| `shadow` | `Shadow` | `2px 2px 4px #777777` | Shadow setting |
| `container` | `Container` | `container` | Value corresponding to the Container class or type |
| `font` | `font` | `Vazirmatn` | Template font |

## Usage

- **`key`:** The unique text identifier for a setting, making it easier to access; for example, searching by `key = background` instead of relying on the record's numeric ID.
- **`label`:** The setting's title, which can be displayed in the management interface.
- **`value`:** Stores the editable setting value. The value's type depends on the setting; for example, colors are stored as color codes, corner radii as CSS values, and fonts as font names.
- **CSS variables:** Setting values are made available to the template as CSS variables in `client.scss`, allowing Theme and Segment to use them.
- **`system`:** This field exists in the table structure, but its precise meaning and its effect on whether settings can be edited or managed cannot be determined from the available information.

## Design notes

- The `key` field has a uniqueness constraint, so each setting must have a distinct key.
- Initial settings are provided by the Seeder, and changing their values is the standard way to customize the site's appearance.
- The `value` field is of type `LONGTEXT` so it can store text values in different formats.