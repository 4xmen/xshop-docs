# Category

Model reference · `App\Models\Category`

### 1. Model

The product category management model; includes the category tree structure, appearance settings, relationships with products, and SEO and Schema Markup settings.

### 2. Table: `categories`

| Field | Type | Nullable | Comment |
|---|---|---|---|
| `id` | bigint unsigned | No | Category ID |
| `name` | text | No | Category name |
| `slug` | varchar(128) | No | Unique text identifier for the URL |
| `subtitle` | text | Yes | Category subtitle |
| `icon` | varchar(255) | Yes | Category icon |
| `description` | longtext | Yes | Category description |
| `sort` | int | No | Display order |
| `image` | varchar(2048) | Yes | Category image path |
| `svg` | varchar(2048) | Yes | SVG vector image path |
| `bg` | varchar(2048) | Yes | Background image path |
| `parent_id` | int unsigned | Yes | Parent category ID |
| `theme` | longtext (JSON) | Yes | Category-specific Theme settings |
| `canonical` | text | Yes | Canonical URL for SEO |
| `hide` | tinyint(1) | No | Whether to hide in subcategory menus |
| `deleted_at` | timestamp | Yes | Soft deletion time |
| `created_at` | timestamp | Yes | Creation time |
| `updated_at` | timestamp | Yes | Last modification time |
| `default_markup` | text | Yes | Default Schema Markup for descendant products |
| `markups` | text | Yes | Schema Markup for the category page |

### 3. Extra description of table fields

**`categories.name`, `categories.subtitle`, and `categories.description`**

Store the category name, subtitle, and description. All three fields support multiple languages.

**`categories.slug`**

The category's unique text identifier, used to address pages.

**`categories.icon`**

Stores the name of the icon selected through the Remix Icon collection's Icon Picker.

**`categories.sort`**

Specifies the category's display order.

**`categories.image`, `categories.svg`, and `categories.bg`**

- `image`: Category image.
- `svg`: Category vector image, which can be used alongside the main image.
- `bg`: Category background image, which can be used in the design of various Theme sections.

**`categories.parent_id`**

Used to create a category tree structure. This field stores the parent category ID and can be `NULL` for top-level categories.

**`categories.theme`**

Makes it possible to define Theme settings specific to a category. This feature can distinguish the category's appearance from the site's general template. Details about the Theme structure and how to use it are explained in the [Area](area.md) documentation.

**`categories.canonical`**

Stores the page's Canonical URL for managing SEO signals.

**`categories.hide`**

Specifies whether the category should be hidden in menus that display subcategories. This field controls menu visibility and does not, by itself, mean that the category page is disabled.

**`categories.default_markup`**

Stores the default Schema Markup used for products under this category, particularly when the category serves as the product's main category.

**`categories.markups`**

Stores the Schema Markup for the category page itself. Unlike `default_markup`, which is used for descendant products, this field is used for the category page's structured data.

### 4. Methods

**`markupKeywords()`**

Returns a list of replacement keywords available for use in Schema Markup, along with each keyword's title and value. For example, `%name%` can be replaced with the category name, and `app.name` retrieves the site name from the application settings.

**`bgUrl()`, `imgUrl()`, and `svgUrl()`**

Return a usable URL for the background image, main image, or SVG image. If the corresponding image is not available, the site's default logo is displayed.

**`bgOriginalUrl()` and `imgOriginalUrl()`**

Return the URL for the original versions of the background and category images, unlike regular versions, which may be optimized for display.

**`children()`**

Defines a `hasMany` relationship with this model based on `parent_id` and returns the descendant categories.

**`getRouteKeyName()`**

Specifies that Laravel should use the `slug` field instead of `id` for Route Model Binding.

**`props()`**

Defines a `belongsToMany` relationship with the `Prop` model and returns the props associated with the category. See the [Prop](prop.md) documentation for details.

**`attachs()`**

Returns the list of attachments associated with the category.

**`webUrl()`**

Returns the category page URL and applies language-related URL adjustments if the site is multilingual.

**`products()`**

Defines a `belongsToMany` relationship with the `Product` model and returns the products associated with the category.

**`published($limit = 10, $order = 'id', $dir = 'DESC')`**

Returns the list of published products under the category. The parameters specify the number of results, the sort field, and the sort direction.

**`evaluations()`**

Provides access to the rating system associated with the category. See the [Evaluation](evaluation.md) documentation for details about this system.

**`parallelCategories()`**

Returns categories that are parallel to and in the same family as the current category.

**`markup()`**

Displays or generates the Schema Markup for the category.