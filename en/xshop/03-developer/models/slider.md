# Slider

The `Slider` model is used to store slide content. It stores the slide's primary data, image, publication status, and supplementary information, but it is not responsible for determining how the slide is displayed.

The display of slides is determined by `Theme Part` and `Segment`. Therefore, the existence of this model does not imply that there is a dedicated Slider Segment. A slider can be displayed in different ways depending on the selected Theme Part.

One important feature of this structure is its support for dynamic supplementary information. Theme Parts can add fields such as a title, subtitle, button text, link, or appearance-related information to slide data as needed for their design, without requiring a separate table structure for each type of slider.

## Data structure

| Field | Type | Nullable | Description |
|---|---|---|---|
| `id` | BIGINT UNSIGNED | No | Unique slide ID |
| `body` | LONGTEXT | No | Main slide content; this field is translatable |
| `image` | VARCHAR(255) | Yes | Name or ID of the slide image file |
| `tag` | VARCHAR(255) | Yes | Optional label; it currently has no defined use in the system and could be used for filtering in the future |
| `user_id` | BIGINT UNSIGNED | No | ID of the user who created the slide |
| `status` | TINYINT UNSIGNED | No | Slide publication status; `0` for draft and `1` for published |
| `data` | LONGTEXT, JSON | Yes | Dynamic supplementary information in JSON format |
| `created_at` | TIMESTAMP | Yes | Slide creation time |
| `updated_at` | TIMESTAMP | Yes | Time of the last slide update |

## Relationships

### `author()`

A `belongsTo` relationship with the `User` model that returns the user who created the slide.

## Image management

### `imgUrl()`

Returns the URL of the optimized version of the slide image. If no image has been set for the slide, the URL of the site's default logo is returned.

### `imgOriginalUrl()`

Returns the URL of the original slide image. If no image is available, the default logo is used.

## Dynamic supplementary information (`data`)

The `data` field stores information added to slides as required by Theme Parts. This information is stored as a collection of key-value pairs.

For example, a Theme Part might add the following information to slides:

- Button text, such as `View offer`
- Button link, such as `/`
- Slide subtitle
- Other values required for display in the theme

This data structure allows a Theme Part to define the fields it needs without requiring a new column in the `sliders` table for each field.

### `getDatazAttribute()`

Reads the JSON data stored in `data` and converts it into an array whose keys are the field names and whose values are the stored content.

For example, data with the following structure:

`[{"key":"index_hero_btn","value":"View offer"},{"key":"index_hero_link","value":"/"}]`

is converted into an array with the keys `index_hero_btn` and `index_hero_link`.

### `addData($key, $defaultValue = null)`

Adds a new field, with its default value, to the supplementary data of all existing slides.

This method is useful when a Theme Part requires a new field and that field also needs to be added to existing slides.

### `remData($key)`

Removes the specified field from the supplementary data of all existing slides.

This method is used during the removal lifecycle of a Theme Part to clear data that is no longer needed from slides.

## Connection to Theme Part

When added, Theme Parts can define the fields they need using `Slider::addData()`, and remove them when deleted using `Slider::remData()`.

For example, the Theme Part for `ParallaxSlider` creates three fields for button text, link, and subtitle. It also creates a `COLOR`-type setting in the `Setting` model so that the slider text color can be configured through the admin panel.

In this example, the color setting is stored in the `settings` table, while data specific to each slide is stored in the `data` field of the `sliders` table. This separation keeps the Theme Part's visual settings distinct from individual slide content.

## Translating supplementary information

The `body` field is defined as translatable in the model:

`public $translatable = ['body'];`

However, the dynamic fields inside `data` do not directly use this mechanism because their structure is determined at runtime according to the Theme Part.

If one of these fields needs to be translated, the original text is translated in the inline editing section. This approach allows dynamic content to be translated without requiring a separate, fixed structure for each type of slider.

## Technical notes

- `Slider` is responsible for storing content, not determining how it is displayed; display depends on `Theme Part` and `Segment`.
- The `tag` field currently has no defined use.
- `data` allows the slide content structure to be extended without adding new columns to the table.
- `addData()` and `remData()` iterate through all existing slides, so their execution cost increases with the number of slides.
- In the current code, `$casts` is defined as `['dataz']`. Since this array does not map field names to data types and `dataz` is computed through an Accessor, it is worth checking whether this definition is actually needed or is a leftover from an earlier implementation.