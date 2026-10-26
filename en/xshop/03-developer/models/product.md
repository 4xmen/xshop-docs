# Product

The `Product` model is the core of the product system. In addition to basic product information, it is responsible for relationships with categories, creators, props, prices, inventory, discounts, comments, attachments, and product-specific theme settings.

## `products` table
| Field | Type | Nullable | Description |
|---|---|---|---|
| `id` | BIGINT UNSIGNED | No | Product ID |
| `name` | TEXT | No | Product name; translatable |
| `slug` | VARCHAR(255), unique | No | Unique text identifier for the URL; the model route is built using this field |
| `description` | LONGTEXT | Yes | Full product description; translatable |
| `table` | LONGTEXT | Yes | Tabular product information; translatable |
| `excerpt` | TEXT | Yes | Product summary displayed below the product name and used for SEO-related purposes; translatable |
| `sku` | VARCHAR(255), unique | Yes | Product stock keeping unit (SKU); unique if provided |
| `virtual` | TINYINT(1) | Yes | Specifies whether the product is virtual, such as a service that does not require physical delivery |
| `downloadable` | TINYINT(1) | Yes | Specifies whether purchasing the product provides access to a downloadable file |
| `price` | DECIMAL(20,2) UNSIGNED | Yes | Product price; if the product has quantity options, the price is also calculated from them |
| `buy_price` | DECIMAL(20,2) UNSIGNED | No | Product purchase price, used to calculate gross profit margin |
| `category_id` | BIGINT UNSIGNED | No | ID of the product's primary category; associated with `Category` |
| `user_id` | BIGINT UNSIGNED | No | ID of the user who created the product; associated with `User` |
| `on_sale` | TINYINT(1) | Yes | Apparently intended to indicate sale status, but according to the current documentation, it is not used in the project logic |
| `stock_quantity` | BIGINT UNSIGNED | Yes | Actual product inventory quantity |
| `stock_status` | ENUM('IN_STOCK', 'OUT_STOCK', 'BACK_ORDER') | Yes | Inventory status: `IN_STOCK`, `OUT_STOCK`, or `BACK_ORDER` |
| `rating_count` | BIGINT UNSIGNED | Yes | Number of ratings submitted for the product |
| `average_rating` | DECIMAL(3,2) UNSIGNED | Yes | Product's average rating |
| `status` | TINYINT UNSIGNED | No | Publication status; `0` for draft and `1` for published |
| `view` | BIGINT UNSIGNED | No | Number of product views |
| `sell` | BIGINT UNSIGNED | No | Number of product sales |
| `image_index` | TINYINT UNSIGNED | No | Index of the featured image in the product's image collection; indexing starts at zero |
| `theme` | LONGTEXT, JSON | Yes | Theme information specific to this product |
| `canonical` | TEXT | Yes | Canonical URL for SEO |
| `promote` | VARCHAR(255) | Yes | Field related to scheduled publication or content promotion on other websites; not yet implemented |
| `keyword` | TEXT | Yes | SEO-related keyword |
| `markups` | TEXT | Yes | Product Schema Markup information |
| `deleted_at` | TIMESTAMP | Yes | Time when the product was soft-deleted |
| `created_at` | TIMESTAMP | Yes | Creation time |
| `updated_at` | TIMESTAMP | Yes | Last update time |

## Translation and model properties

The following fields are translatable:

```php
public $translatable = [
    'name',
    'excerpt',
    'description',
    'table',
];
```

The model also has two accessors named `qz` and `qidz`, whose output is cast to arrays:

```php
protected $casts = [
    'qz' => 'array',
    'qidz' => 'array',
];
```

These names alone do not indicate the precise meaning of these fields; their behavior is explained in the product options section.

## Pricing and inventory

### Product options (`quantities`)

A product can be defined with or without quantity options, or with several quantity options. The `quantities()` relationship retrieves the options associated with the product.

- If the product has no quantity options, its price is read from `products.price`.
- If the product has quantity options, its base price is the lowest price among those options.
- If the product is unavailable, the `getPrice()` method returns the translated string `Unavailable`.
- If an active discount exists, the discount amount or percentage is applied to the price.
- If the final price is zero or empty, the string `Call us!` is displayed.
- `oldPrice()` and `oldPricePure()` return the base price without applying a discount; the former formats the amount with the currency symbol, while the latter returns the raw value.

### Inventory status

The allowed values defined in the model are:

```php
public static $stock_status = [
    'IN_STOCK',
    'OUT_STOCK',
    'BACK_ORDER',
];
```

The `isAvailable()` method considers a product available only when both of the following conditions are met:

- `stock_quantity` is not zero.
- `stock_status` is `IN_STOCK`.

Therefore, setting the status to `BACK_ORDER` alone is not enough for the product to be considered available.

When quantity options exist, the `renewPriceAndStock()` method:

- Sets the product's inventory to the sum of the options' `count` values.
- Sets the product's price to the lowest price among the options whose `count` is greater than zero.
- Then saves the product.

**Note:** In the current code, the lowest-price calculation is performed only when at least one option exists. If none of the options has a positive inventory count, the resulting price should be reviewed.

## Discounts

- `discounts()` returns all discounts associated with the product.
- `activeDiscounts()` returns discounts whose expiration date is today or later, or that have no expiration date.
- `hasDiscount()` first checks whether the product is available, then checks for at least one discount with no expiration date or a future expiration date.

In `getPrice()`, a discount of type `PRICE` is subtracted from the price as a fixed amount; other types are calculated as percentages in this method.

## Product files and images

### Attachments

The `attachs()` method defines a polymorphic `morphMany` relationship with the `Attachment` model. It is used to retrieve files attached to the product.

The `visible_attachs()` method controls access to attachments based on whether the product has been purchased:

- **Guest user:** Receives only attachments whose `is_premium` value is false.
- **Logged-in customer who has purchased the product:** Receives all attachments, including premium files.
- **Logged-in customer who has not purchased the product:** Receives only non-premium attachments.

This method relies on the customer's `purchased_products()` relationship to check whether the product has been purchased.

### Image conversions

The model uses Media Library to manage images and generate converted versions.

The `registerMediaConversions()` method defines the following versions:

- `product-thumb`: A thumbnail with dimensions configured in `product_thumb`.
- `product-image`: A product image with dimensions configured in `product_image`.
- `product-optimized`: An optimized version in WebP format.

The first two versions are cropped, optimized, and sharpened. If the `watermark` setting is enabled, a logo watermark is applied to them. The format of the first two versions is taken from the `optimize` setting; if it is false, WebP is selected.

### Image methods

| Method | Use |
|---|---|
| `imgUrl()` | The `product-image` image at the `image_index` index, or the default logo |
| `originalImageUrl()` | The original file for the featured image, or the default logo |
| `originalOptimizedImageUrl()` | The `product-optimized` version of the featured image, or the default logo |
| `thumbUrl()` | The `product-thumb` version of the featured image, or the default logo |
| `imgUrl2()` | The `product-image` version of the second image, or the default logo |
| `thumbUrl2()` | The `product-thumb` version of the second image, or the default logo |

If no usable image is found, these methods return the `assets/upload/logo.svg` path.

## Product props (`Prop`)

The `fullMeta($limit = 99)` method retrieves the product's props using `getAllMeta()` and prepares them for display.

For each prop, the value and the corresponding prop definition are collected from the `Prop` model. The display value (`human_value`) is processed according to the prop type:

- `color`: Displays a color swatch.
- `checkbox`: Displays a check or cross mark.
- `select` and `singlemulti`: Converts the stored value to its corresponding text label from the prop data.
- Other types: Displays a text or array value; an empty value is displayed as `-`.

The prop's `unit` is also appended to the display value. Finally, the props are sorted by `sort`, and the output is limited to the number specified by `$limit`.

## Model relationships

| Method | Relationship | Description |
|---|---|---|
| `attachs()` | `morphMany` | Product attachments; [Attachment](attachment.md) |
| `comments()` | `morphMany` | All product comments; [Comment](comment.md) |
| `approvedComments()` | `morphMany` | Comments with `status = 1` |
| `categories()` | `belongsToMany` | Categories associated with the product; [Category](category.md) |
| `category()` | `belongsTo` | The product's primary category via `category_id`; [Category](category.md) |
| `creators()` | `belongsToMany` | Creators, brands, or other people associated with the product; [Creator](creator.md) |
| `quantities()` | `hasMany` | Product quantity options; [Quantity](./quantity.md) |
| `discounts()` | `hasMany` | All product discounts; [Discount](discount.md) |
| `activeDiscounts()` | `hasMany` | Discounts without an expiration date or with an expiration date that has not passed; [Discount](discount.md) |
| `quesions()` | `hasMany` | Questions associated with the product; [Question](question.md) |

## URLs and routing

- `getRouteKeyName()` selects `slug` as the model's route key.
- `webUrl()` builds the product page URL using the route named `client.product` and aligns it with the active language using `fixUrlLang()`.
- `webUrlLang($lang)` returns the product URL with the language prefix in the URL.

## Other methods

### `markupKeywords()`

Defines the keywords that can be used to build Schema Markup. The provided code excerpt shows the `app.name` key with its translated title and the value `config('app.name')`; the full list of keywords cannot be determined from the available code snippet.

### `isFav()`

Checks whether the product is a favorite for the current customer:

- `-1`: The customer is not logged in.
- `1`: The product is in the list of products associated with the customer.
- `0`: The product is not in the customer's list.

### `markup()`

The method for generating product Schema Markup. The output details depend on the full implementation.