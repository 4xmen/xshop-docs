# Order

The `Order` model stores one row of order items. Each record is associated with an invoice and a product, and stores information such as the quantity, selected inventory item, and total amount for that row.

An invoice can have multiple orders; the overall payment and invoice information is stored in the [Invoice](invoice.md) model.

## `orders` table structure

| Field | Type | Nullable | Description |
|---|---|---|---|
| `id` | BIGINT UNSIGNED | No | Order ID |
| `invoice_id` | BIGINT UNSIGNED | No | ID of the associated invoice; related to the `invoices` table |
| `product_id` | BIGINT UNSIGNED | No | ID of the ordered product; related to the `products` table |
| `quantity_id` | BIGINT UNSIGNED | Yes | ID of the selected inventory item or product type; related to the [Quantity](./quantity.md) model |
| `count` | INT | Yes | Number of units ordered of the product or selected inventory item; defaults to `1` |
| `price_total` | DECIMAL(20,2) UNSIGNED | No | Total amount for this order row, equal to the quantity multiplied by the unit price |
| `data` | LONGTEXT | Yes | The selected inventory item's (`prop`) properties as JSON, for convenient access when displaying them as a group |
| `created_at` | TIMESTAMP | Yes | Creation time |
| `updated_at` | TIMESTAMP | Yes | Last update time |

## Relationships and methods

### `product()`

Defines a `belongsTo` relationship with the [Product](product.md) model and returns the product associated with the order row.

### `quantity()`

Defines a `belongsTo` relationship with the [Quantity](./quantity.md) model and returns the inventory item or type selected for the product.

Since `quantity_id` can be `NULL`, an order is not necessarily associated with a `Quantity` record.

### `invoice()`

Defines a `belongsTo` relationship with the [Invoice](invoice.md) model and returns the invoice associated with the order.

## Database notes

- The `data` field is validated using the `CHECK (json_valid(data))` constraint; therefore, any non-`NULL` value must be valid JSON.
- Deleting an invoice also deletes its dependent orders; the `invoice_id` relationship has `ON DELETE CASCADE`.
- Deleting a product also deletes its dependent orders; the `product_id` relationship has `ON DELETE CASCADE`.
- The provided SQL does not define a foreign key for `quantity_id`; therefore, this database definition does not ensure referential integrity with the inventory table.
- Although `count` defaults to `1`, it still accepts `NULL`. This is meaningless for virtual products.