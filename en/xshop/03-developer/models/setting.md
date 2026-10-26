# Setting

The `Setting` model is responsible for managing system settings. In addition to storing setting values, this model provides the information the system needs to define their input type, title, display method, and validation.

Unlike a simple key-value structure, each setting can have its own data type, title, section, active status, additional information, and display settings. This structure makes it possible to add new settings to the administration interface without having to design a dedicated page for each one.

An important use of this architecture is to define the settings required by Theme Parts, so that when a component is added to a Theme, its required settings are created as well.

## Data structure
| Field | Type                    | Nullable | Description |
|---|------------------------|---|---|
| `id` | BIGINT UNSIGNED        | No | Unique setting ID |
| `section` | VARCHAR(255)           | No | The section the setting belongs to; for example, `General`, `SEO`, `Media`, `SMS`, or `Theme` |
| `type` | ENUM(described below) | No | Setting type, which specifies the input behavior and how its value is received |
| `title` | VARCHAR(255)           | No | Setting title displayed in the administration panel |
| `active` | TINYINT(1)             | No | Whether the setting is active or inactive |
| `key` | VARCHAR(255), unique   | No | Unique setting key used to access its value |
| `value` | LONGTEXT               | Yes | Setting value, which can be translated |
| `raw` | LONGTEXT               | Yes | Raw, untranslated setting value |
| `ltr` | TINYINT(1)             | No | Specifies whether the input should be displayed left-to-right |
| `is_basic` | TINYINT(1)             | No | Specifies whether the setting value must follow the basic settings validation rules |
| `size` | TINYINT                | No | Setting column width in the Bootstrap Grid-based UI, from 1 to 12 |
| `data` | LONGTEXT, JSON         | Yes | Additional setting information in JSON format; its use depends on the setting type and its consumer |
| `created_at` | TIMESTAMP              | Yes | Setting creation time |
| `updated_at` | TIMESTAMP              | Yes | Time of the last setting update |

The `key` field has a uniqueness constraint in the database; therefore, two settings cannot have the same key, even if they belong to different sections.

## Setting sections

The `section` field specifies which section of the administration panel contains a setting. The system's default sections are:

### General

General site settings, such as the site name, title, keywords, and social media information.

### SMS

Settings related to text messages, including authentication message text. The message text can be defined directly or use message templates.

### SEO

Settings related to SEO and related behavior, such as multilingual sitemap settings, category sitemaps, and using Canonical URLs for products and posts.

### Media

Settings for media management, such as thumbnail dimensions, image output format, image optimization, automatic watermarking, and the site logo.

### Theme

Settings related to the Theme and its components. In addition to general Theme settings, this section can contain settings required by registered Theme Parts.

These are the system's default sections; the model's structure is not limited to these five.

## Setting key and value

### `key`

The primary key used to access a setting. For example, a setting with the key `cache_number` can be retrieved using the setting helper:

`getSetting('cache_number')`

This key is the setting's logical identifier at the application level, so there is no need to know the database record's numeric ID to access it.

### `value`

The setting value, defined in the model as a translatable field:

`public $translatable = ['value'];`

As a result, this field's value can vary according to the application's current language. For example, if a setting contains text displayed to the user, its value can be translated.

### `raw`

Stores the raw setting value for cases where the untranslated value is needed.

For example, suppose a setting's value is defined as a number or as a string such as `500x500`. If the `value` is affected by the translation mechanism, the untranslated value may be more suitable for processing or validation.

The `raw` field makes it possible to distinguish between the value used in a translation context and the raw value required for processing.

## Setting types (`type`)

The `type` field determines the type of input each setting uses and how its value is made available to the administrator. It supports a predefined set of types, defined in the model's `$settingTypes`.

### Text and general inputs

| Type | Use |
|---|---|
| `TEXT` | Accepts ordinary single-line text |
| `NUMBER` | Accepts a numeric value |
| `LONGTEXT` | Accepts multiline text |
| `CODE` | Accepts code such as a Google Webmaster script |
| `EDITOR` | Accepts text using the CKEditor editor |
| `CHECKBOX` | Toggle or Switch input |
| `FILE` | Uploads files; for permitted, non-sensitive files, not dangerous executable files such as PHP |
| `COLOR` | Selects a color |
| `ICON` | Selects an icon |

### Selecting a single value

| Type | Use |
|---|---|
| `CATEGORY` | Selects a product category |
| `GROUP` | Selects a post group |
| `CREATOR` | Selects a creator or author |
| `MENU` | Selects an existing menu |
| `SELECT` | Selects a value from a list of options |

### Time and location inputs

| Type | Use |
|---|---|
| `LOCATION` | Selects a geographic location and retrieves information such as longitude and latitude |
| `DATE` | Selects a date using a dual Jalali and Gregorian Date Picker |
| `DATETIME` | Selects a date and time with support for the Jalali and Gregorian calendars |
| `TIME` | Selects a time without a date |

### Selecting sets

These types are intended for cases where a setting requires multiple entities or values.

| Type | Use |
|---|---|
| `CATEGORY_SET` | Selects multiple product categories |
| `GROUP_SET` | Selects multiple post groups |
| `CREATOR_SET` | Selects multiple creators or authors |
| `SETS` | Selects multiple values from a set of options; similar to the `SET` concept in MySQL |

### Query-based types

| Type | Use |
|---|---|
| `PRODUCT_QUERY` | Defines a query for selecting products based on criteria such as category, order, and filters |
| `POST_QUERY` | Defines a similar query for selecting posts |

These two types differ from selecting a single product or post; their purpose is to provide a way to define a set of results based on selection criteria.

## Dynamic settings for Theme Parts

An important use of the `Setting` model is to provide the settings required by theme components.

Suppose a Theme Part for displaying a contact form is added to a Theme. This component might require the following settings:

- Company address with type `LOCATION`
- Contact form color with type `COLOR`
- Category of the company's sponsor products with type `CATEGORY_SET`

In this architecture, the settings required by a Theme Part are created when it is added and become available in the `Theme` section. This allows the Theme Part developer to define settings associated with that component without having to design a dedicated administration page for each setting.

The lifecycle of these settings is also tied to the Theme Part: when the Theme Part is deleted, its dependent settings are deleted as well; they are not merely deactivated.

This feature makes it possible to manage a Theme's settings centrally and according to its active components. It also allows different components to have varied settings without being limited to a fixed set of predefined settings.

## Basic settings validation

The `is_basic` field is intended to identify settings whose values must follow validation rules specific to basic settings.

For example, an image size setting might require a value such as `500x500`, or the image output format might need to be selected from permitted values such as `jpg` and `webp`.

In these cases, the `validateSettingRequest` helper is used to validate the input value.

This mechanism helps ensure that settings on which the Theme or other parts of the system depend are checked for format and permitted values before they are saved.

## Additional information (`data`)

The `data` field is used to store additional information associated with a setting. This information is stored as JSON and can serve different purposes depending on the setting type or the component that consumes it.

Examples of its uses include:

- Storing a permitted numeric range, such as `{"xmin":0,"xmax":9007199254740992}`
- Storing the name of a CSS variable, such as `{"name":"login-bg-color-1"}`
- Storing a list of default options for a `SELECT` input

In the CSS example, the variable name can be used in parts of the system to add or use a CSS variable.

Therefore, `data` differs from `value`: `value` is the setting's primary value, whereas `data` stores additional information required to interpret, display, or use that setting.

## Display settings

### `ltr`

This field is used to set the input's display direction to left-to-right. For example, URLs and code should generally be displayed with `LTR` direction to make them easier to read and edit in a Persian interface.

### `size`

This field specifies the setting's size in the administration interface layout. Its value is based on Bootstrap's twelve-column Grid and ranges from 1 to 12.

For example, a value of `12` means the setting occupies the full row width, while a value of `4` means it occupies one-third of the width.

### `active`

Specifies whether the setting is active or inactive. Its default value is `1`.

This field differs from `is_basic`: `active` relates to the setting's status, whereas `is_basic` is used to indicate whether it requires validation specific to basic settings.

## Methods

### `getData()`

Converts the contents of the `data` field to a PHP array using `json_decode`:

`json_decode($this->data, true)`

This method makes the setting's additional information available to the consumer as an array.

## Technical notes

- The `key` is unique in the database; therefore, when defining a new setting, choose a key that has not already been used.
- The `value` field is translatable, whereas `raw` is intended for accessing the raw, untranslated value.
- The `data` value must be valid JSON; this is enforced by the `CHECK (json_valid(data))` constraint in the database.
- The permitted setting types are defined in `$settingTypes`. Adding a new value to this list alone does not guarantee that all required input, storage, and validation behavior has been implemented.
- Dynamic settings associated with Theme Parts are part of those components' lifecycle; therefore, deleting a Theme Part can result in the deletion of its associated settings.