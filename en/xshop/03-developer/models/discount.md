# Discount

Discount management; includes a product-specific discount and a general discount that can be applied to the shopping cart.

## `discounts` table

| Field | Type | Nullable | Description |
|---|---|---|---|
| `id` | BIGINT UNSIGNED | No | Unique discount ID |
| `title` | TEXT | Yes | Discount title |
| `body` | LONGTEXT | Yes | Discount description |
| `product_id` | BIGINT UNSIGNED | Yes | ID of the associated product; if empty, the discount is general and is not assigned to a specific product |
| `type` | ENUM(`PRICE`, `PERCENT`) | No | Discount type: fixed amount or percentage |
| `code` | VARCHAR(100) | Yes | Discount code; used for general discounts that can be applied to the shopping cart |
| `amount` | DECIMAL(20,2) UNSIGNED | No | Discount amount; for `PERCENT`, a value between 0 and 100, and for `PRICE`, a fixed amount |
| `expire` | DATETIME | Yes | Discount expiration date and time; if empty, no expiration date is defined |
| `created_at` | TIMESTAMP | Yes | Creation date |
| `updated_at` | TIMESTAMP | Yes | Date of last update |
| `deleted_at` | TIMESTAMP | Yes | Soft-deletion date |

## Properties and methods

### `$translatable`

The `title` and `body` fields support storing and retrieving translations.

### `$doscount_type`

List of discount types available in the system:

- `PRICE`: Fixed-amount discount.
- `PERCENT`: Percentage discount.

### `$casts`

The `expire` field is cast to `datetime` so it can be used as a date and time.

### `product()`

Defines a `belongsTo` relationship with the [Product](product.md) model and returns the product associated with the discount. If `product_id` is empty, the discount is not associated with a specific product.