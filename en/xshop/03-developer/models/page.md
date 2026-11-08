# Page

The `Page` model is used to manage website pages and their textual content. A page can also be a child of another page and supports features such as publishing or draft status, view counts, custom themes, and SEO settings.

## `pages` Table Structure

| Field | Type | Nullable | Description |
|---|---|---|---|
| `id` | BIGINT UNSIGNED | No | Page identifier |
| `title` | TEXT | No | Page title |
| `slug` | VARCHAR(255) | No | Text identifier used in the URL; unique |
| `subtitle` | TEXT | No | Page subtitle |
| `body` | LONGTEXT | No | Main page content |
| `parent_id` | BIGINT UNSIGNED | No | Page identifier; related to the `groups` table |
| `status` | TINYINT UNSIGNED | No | Page status: `0` for draft and `1` for published |
| `view` | INT UNSIGNED | No | Number of page views |
| `icon` | VARCHAR(128) NULL | Yes | Name of the Remix Icon selected through the Icon Picker |
| `theme` | LONGTEXT | Yes | JSON data for this page’s custom theme |
| `canonical` | TEXT | Yes | Canonical URL for SEO |
| `markups` | TEXT | Yes | Page-specific Schema Markup data |
| `deleted_at` | TIMESTAMP | Yes | Soft-deletion timestamp |
| `created_at` | TIMESTAMP | Yes | Creation timestamp |
| `updated_at` | TIMESTAMP | Yes | Last update timestamp |

## Page Status and Display

### `status`

Specifies the page’s status:

- `0`: Draft
- `1`: Published

### `view`

Stores the number of page views.

### `icon`

Stores the name of the Remix Icon selected for the page. The icon is selected through the Icon Picker.

## Custom Page Theme

### `theme`

Stores information about the page’s custom theme as JSON.

This feature allows a page to have its own dedicated theme without necessarily using the website’s general appearance. The architecture of custom themes and how their components are loaded are described in [Part](part.md).

## SEO Settings

### `canonical`

Stores the page’s canonical URL, specifying its reference URL for search engines.

### `markups`

Stores page-specific Schema Markup. This data can define structured data associated with the page.

## Database Relationships

- `parent_id` references the `pages` table and uses `ON DELETE RESTRICT` when the parent page is deleted.
- The `slug` field is unique.
- The `theme` field has a `CHECK (json_valid(theme))` constraint; therefore, any non-`NULL` value must be valid JSON.

## Features, Methods, and Relationships

### Translatability

```php
public $translatable = ['title', 'subtitle', 'body'];
```

The `title`, `subtitle`, and `body` fields are translatable.

### `parent()`

Defines a `belongsTo` relationship with the same model and returns the parent page through the `parent_id` field.

### `children()`

Defines a `hasMany` relationship with the same model and returns child pages whose `parent_id` matches the ID of the current page.

### `getRouteKeyName()`

Specifies `slug` as the key used for route model binding. Therefore, this model uses the page’s text identifier to resolve it in a route.

### `markupKeywords()`

Provides a list of variables that can be used in Schema Markup. The following items are present in the provided portion of the method:

- `app.name`: The application name from the `app.name` setting
- `title`: The page title

Each item includes a display label and its corresponding value. The complete list of variables depends on the remainder of the method’s implementation.

### `registerMediaConversions(?Media $media = null)`

Registers the image conversions used for page images with Spatie Media Library.

- Conversion name: `page-image`
- Image dimensions are obtained from the `page_thumb` setting and the `imageSizeConvertValidate()` function.
- The image is cropped to the specified dimensions.
- Image optimization and sharpening with `sharpen(10)` are applied.
- The conversion runs as `nonQueued()`, meaning it is not placed in a processing queue.
- The output format is taken from the `optimize` setting; if its value is `false`, `webp` is selected.
- If the `watermark` setting is enabled, `public/upload/images/logo.png` is added as a watermark at the bottom-left of the image. Its size and opacity are obtained from the application settings.

### `imgUrl()`

Returns the URL of the page’s optimized image. If media exists, it returns the `page-image` conversion URL for the first media item; otherwise, it returns the URL of the site’s default logo.

### `orgUrl()`

Returns the original URL of the page’s first media item without selecting the `page-image` conversion. If no media exists, it returns the URL of the site’s default logo.

[//]: # (### `comments()`)

[//]: # ()

[//]: # (Defines a `morphMany` relationship with the [Comment](comment.md) model and returns the comments associated with the page.)

[//]: # ()

[//]: # (### `approvedComments()`)

[//]: # ()

[//]: # (In the current implementation, this method also returns the same `morphMany` relationship with the `Comment` model.)

[//]: # ()

[//]: # (The provided code contains no condition that limits the results to approved comments. Therefore, the method name does not fully match its current behavior unless approval filtering is applied elsewhere.)

### `attachs()`

Defines a `morphMany` relationship with the [Attachment](attachment.md) model and returns the files and attachments associated with the page.

### `webUrl()`

Generates the public page URL using the route named `client.page` and the `slug` value, then applies `fixUrlLang()` to adjust the URL according to the site’s language logic.

### `webUrlLang($lang)`

Generates the public page route URL and then replaces `config('app.url')` to add the specified language prefix to the URL.

The exact behavior of this method depends on the application’s URL structure and the value of `$lang`.

### `markup()`

This method is intended to generate the page’s Schema Markup. Since the method body is not included in the provided code, the Schema type and output-generation details cannot be determined from the available information.