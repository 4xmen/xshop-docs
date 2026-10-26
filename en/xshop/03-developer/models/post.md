# Post

The `Post` model is used to manage posts and the site's text content. Each post is associated with a group (`Group`) and a user (`User`), and supports features such as publishing or saving drafts, counting views, pinning important posts, automatic tables of contents, custom themes, and SEO settings.

## `posts` table structure

| Field | Type | Nullable | Description |
|---|---|---|---|
| `id` | BIGINT UNSIGNED | No | Post ID |
| `title` | TEXT | No | Post title |
| `slug` | VARCHAR(255) | No | Text identifier for the post in the URL; unique |
| `subtitle` | TEXT | No | Post subtitle |
| `body` | LONGTEXT | No | Main post content |
| `group_id` | BIGINT UNSIGNED | No | Post group ID; associated with the `groups` table |
| `user_id` | BIGINT UNSIGNED | No | Author ID; associated with the `users` table |
| `status` | TINYINT UNSIGNED | No | Post status; `0` for draft and `1` for published |
| `view` | INT UNSIGNED | No | Number of post views |
| `is_pinned` | TINYINT(1) | No | Indicates whether the post is pinned as important |
| `hash` | VARCHAR(14) | No | Short post identifier used in short links |
| `like` | INT UNSIGNED | No | Number of likes |
| `dislike` | INT UNSIGNED | No | Number of dislikes |
| `icon` | VARCHAR(128) NULL | Yes | Name of the Remix Icon selected through the Icon Picker |
| `table_of_contents` | TINYINT(1) | No | Whether the automatic table of contents is enabled |
| `theme` | LONGTEXT | Yes | JSON data for this post's custom theme |
| `canonical` | TEXT | Yes | Canonical URL for SEO |
| `promote` | VARCHAR(255) | Yes | Field intended for publishing or promoting content on another site; not yet implemented |
| `keyword` | TEXT | Yes | SEO-related keywords |
| `deleted_at` | TIMESTAMP | Yes | Soft deletion time |
| `created_at` | TIMESTAMP | Yes | Creation time |
| `updated_at` | TIMESTAMP | Yes | Last update time |
| `markups` | TEXT | Yes | Custom Schema Markup data for the post |

## Post status and display

### `status`

Specifies the post status:

- `0`: Draft
- `1`: Published

### `view`

Stores the number of post views.

### `is_pinned`

Used to identify important, pinned posts, similar to the Sticky Posts feature in WordPress.

### `like` and `dislike`

Store the number of likes and dislikes for the post.

### `hash`

A short identifier for the post, currently intended for use in short links. This field is unique in the database.

### `icon`

Stores the name of the Remix Icon selected for the post. The icon is selected through the Icon Picker.

## Automatic table of contents

### `table_of_contents`

This field specifies whether the automatic table of contents is enabled for the post.

The table of contents is generated from HTML headings, from `h1` through `h6`.

## Custom post theme

### `theme`

Stores JSON data for this post's custom theme.

This feature allows a post to have its own custom theme without necessarily using the site's general appearance. The custom theme architecture and how its components are loaded are described in the [Part](part.md) document.

## SEO settings

### `canonical`

Stores the post's canonical URL to specify its reference URL for search engines.

### `keyword`

Stores keywords related to the post for SEO settings.

### `markups`

Used to store custom Schema Markup for the post. This data can specify the structured markup associated with this post.

## Planned feature: `promote`

The `promote` field is intended for a feature that will allow a post to be promoted or published on another site, similar to publishing content through mechanisms such as RSS Push, with a link to the original post.

This idea is also planned for products, but the feature has not yet been implemented in the current project. Therefore, it should not be considered an active system feature.

## Database relationships

- `group_id` references the `groups` table, and deleting a group is restricted with `ON DELETE RESTRICT`.
- `user_id` references the `users` table, and deleting a user is restricted with `ON DELETE RESTRICT`.
- The `slug` and `hash` fields are each unique.
- The `theme` field has a `CHECK (json_valid(theme))` constraint; therefore, any non-`NULL` value must be valid JSON.

## Properties, methods, and relationships

### Translatability

```php
public $translatable = ['title', 'subtitle', 'body'];
```

The `title`, `subtitle`, and `body` fields are translatable.

### `groups()`

Defines a `belongsToMany` relationship with the [Group](group.md) model. This relationship retrieves the groups associated with the post.

Note that this relationship uses Laravel's default pivot table for many-to-many relationships; the pivot table's name and structure are not specified in the provided code.

### `author()`

Defines a `belongsTo` relationship with the `User` model and returns the post's author. The foreign key is `user_id`, and the referenced key is `id`.

### `getRouteKeyName()`

Specifies `slug` as the key used for Route Model Binding. Therefore, this model uses the post's text identifier to identify it in a Route.

### `markupKeywords()`

Provides a list of variables that can be used in Schema Markup. The following items are shown in the provided portion of the method:

- `app.name`: Application name from the `app.name` setting
- `title`: Post title

Each item includes a display title and its corresponding value. The complete list of variables depends on the rest of the method's implementation.

### `registerMediaConversions(?Media $media = null)`

Registers the image conversions used for post images with Spatie Media Library.

- Conversion name: `post-image`
- Image dimensions are read from the `post_thumb` setting and the `imageSizeConvertValidate()` function.
- The image is cropped to the specified dimensions.
- Image optimization and sharpening are applied with `sharpen(10)`.
- The conversion runs as `nonQueued()`, meaning it is not added to the processing queue.
- The output format is taken from the `optimize` setting; if its value is `false`, `webp` is selected.
- If the `watermark` setting is enabled, the `public/upload/images/logo.png` logo is placed as a watermark at the bottom left of the image. Its size and opacity are read from the application settings.

### `imgUrl()`

Returns the URL of the optimized post image. If a media image exists, the URL for the `post-image` conversion is retrieved from the first media item; otherwise, the URL of the site's default logo is returned.

### `orgUrl()`

Returns the original URL of the post's first media item without selecting the `post-image` conversion. If no media item exists, the URL of the site's default logo is returned.

### `spendTime()`

Calculates the estimated reading time for the post based on its content.

First, HTML tags are removed from `body`. The length of the resulting string is then divided by `1350` and rounded up to the next integer. Finally, the calculated number is returned with the translatable phrase `minute(s)`.

This calculation is based on string length, not an exact word count. Therefore, the resulting reading time is an estimate based on the current implementation.

### `comments()`

Defines a `morphMany` relationship with the [Comment](comment.md) model and returns the comments associated with the post.

### `approvedComments()`

In the current implementation, this method also returns the same `morphMany` relationship with the `Comment` model.

The provided code contains no condition that limits the results to approved comments. Therefore, the method's name does not fully match its current behavior unless an approval filter is applied elsewhere.

### `mainGroup()`

Defines a `belongsTo` relationship with the [Group](group.md) model and returns the post's main group through `group_id`.

This relationship differs from `groups()`: `mainGroup()` retrieves the main group from the `group_id` column, whereas `groups()` is a many-to-many relationship.

### `attachs()`

Defines a `morphMany` relationship with the [Attachment](attachment.md) model and returns the files and attachments associated with the post.

### `webUrl()`

Generates the post's public URL using the Route named `client.post` and the `slug` value, then applies `fixUrlLang()` to adjust the URL according to the site's language logic.

### `webUrlLang($lang)`

Generates the post's public Route URL and then adds the specified language prefix to the URL by replacing `config('app.url')`.

The exact behavior of this method depends on the application's URL structure and the value of `$lang`.

### `markup()`

This method is intended to generate Schema Markup for the post. Since the method body was not included in the submitted code, the Schema type and output-generation details cannot be determined from the available information.