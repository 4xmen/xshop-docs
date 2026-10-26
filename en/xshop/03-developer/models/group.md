# Group

Manages groups of posts. Each group can have a name, description, image, background, custom appearance settings, and SEO and Schema Markup information. Groups can form a tree structure through parent-child relationships and can be associated with multiple posts.

## `groups` table

| Field | Type | Nullable | Description |
|---|---|---|---|
| `id` | BIGINT UNSIGNED | No | Unique group ID |
| `name` | TEXT | No | Group name |
| `slug` | VARCHAR(128) | No | Unique text identifier used in the group URL |
| `subtitle` | TEXT | Yes | Group subtitle |
| `description` | LONGTEXT | Yes | Group description |
| `image` | VARCHAR(2048) | Yes | Group image |
| `bg` | VARCHAR(2048) | Yes | Group background image |
| `sort` | INT | No | Group sort value; defaults to `0` |
| `parent_id` | INT UNSIGNED | Yes | Parent group ID; used to create a hierarchical structure |
| `theme` | LONGTEXT | Yes | Custom appearance settings for the group in JSON format |
| `canonical` | TEXT | Yes | Canonical URL for SEO |
| `hide` | TINYINT(1) | No | Determines whether the group is hidden in the menu as a subgroup; defaults to `0` |
| `deleted_at` | TIMESTAMP | Yes | Soft-deletion date |
| `created_at` | TIMESTAMP | Yes | Creation date |
| `updated_at` | TIMESTAMP | Yes | Date of last update |
| `default_markup` | TEXT | Yes | Default Schema Markup for associated posts, if used by the application logic |
| `markups` | TEXT | Yes | Schema Markup for the group page |

## Properties and methods

### `$translatable`

The `name`, `subtitle`, and `description` fields support storing and retrieving translations.

### `markupKeywords()`

Returns a set of keywords available for use in Schema Markup, along with each keyword's display title and value. These values allow information such as the application name and group name to be used in Markup templates.

### `posts()`

Defines a `belongsToMany` relationship with the [Post](post.md) model and retrieves posts associated with the group through the pivot table.

### `parent()`

Defines a `belongsTo` relationship with this model and returns the parent group through the `parent_id` field.

### `children()`

Defines a `hasMany` relationship with this model and returns child groups whose `parent_id` matches the current group's ID.

### `getRouteKeyName()`

Sets `slug` as the model's route key. As a result, Route Model Binding uses `slug` instead of `id`.

### `author()`

Defines a `belongsTo` relationship with the [User](user.md) model and returns the user associated with the group.

### `imgUrl()`

Returns the URL of the optimized group image from the `optimized/groups/` path. If no image is defined, the site's default logo URL is returned.

### `imgOriginalUrl()`

Returns the URL of the original group image from the `groups/` path. If no image is defined, the site's default logo URL is returned.

### `bgUrl()`

Returns the URL of the optimized group background image from the `optimized/groups/` path. If no background image is defined, the site's default logo URL is returned.

### `bgOriginalUrl()`

Returns the URL of the original group background image from the `groups/` path. If no background image is defined, the site's default logo URL is returned.

### `attachs()`

Defines a polymorphic `morphMany` relationship with the [Attachment](attachment.md) model and retrieves attachments associated with the group.

### `webUrl()`

Generates the group page URL using the route named `client.group` and the `slug` value, then adjusts the URL language with `fixUrlLang()`.

### `published($limit = 10, $order = 'id', $dir = 'DESC')`

Retrieves posts associated with the group that have `status = 1`. The `$order` and `$dir` parameters determine the sort order, and `$limit` determines the number of results. The output includes only the `title`, `slug`, and `icon` fields.

### `evaluations()`

Retrieves evaluation criteria associated with the group. This method considers three groups of criteria:

- Global criteria whose `evaluationable_type` and `evaluationable_id` are both empty.
- Criteria assigned to the `Group` model whose `evaluationable_id` is empty.
- Criteria assigned to the current group.

### `markup()`

Displays the appropriate Schema Markup output for the group page.