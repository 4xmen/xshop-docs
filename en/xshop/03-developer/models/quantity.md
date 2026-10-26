# Quantity

The `Quantity` model stores the inventory and price for each combination of a product's props. A product can have multiple `Quantity` records, each representing a sellable variant of the same product.

For example, different combinations of capacity, color, and SIM type can be recorded as separate records for a product such as an iPhone. Each combination can have its own inventory and price.

## `quantities` table

| Field | Type | Description |
|---|---|---|
| `id` | BIGINT UNSIGNED | Inventory record ID |
| `product_id` | BIGINT UNSIGNED | ID of the associated product; foreign key to `products.id` |
| `count` | INT UNSIGNED, default 0 | Number of units available for this product combination |
| `price` | DECIMAL(20,2), default 0 | Price of this product combination |
| `image` | BIGINT UNSIGNED, nullable | Index of the product image used to display the image associated with this combination |
| `data` | LONGTEXT, nullable | Information about the selected props for this combination, stored as JSON |
| `deleted_at` | TIMESTAMP, nullable | Time when the record was soft-deleted |
| `created_at` | TIMESTAMP, nullable | Creation time |
| `updated_at` | TIMESTAMP, nullable | Last update time |

Physically deleting a product also deletes its associated `quantities` records, as specified by the foreign key (`ON DELETE CASCADE`).

## Relationship with the product

The `product()` method defines a `belongsTo` relationship with the `Product` model and returns the product that owns this record.

## Prop information (`data`)

The `data` field stores the specifications for a product combination as JSON. The JSON keys are the technical prop names (`Prop.name`), and their values specify the selected value for each prop.

For example, a record can store props such as color, storage capacity, and SIM type. This information is associated with the props defined for the product's primary category.

### `getMetaAttribute()`

This accessor converts the value of `data` into structured information ready for display.

How it works:

1. Converts the JSON stored in `data` to an array. If the result is `null`, it returns an empty array.
2. Retrieves the props associated with the product's primary category based on the names present in the JSON.
3. Adds the following information for each prop to the output:
   - `label`: Prop title
   - `human_value`: Display-ready value
   - `type`: Prop type
   - `value`: Original stored value
4. Generates the display value according to the prop type:
   - `color`: HTML color swatch
   - `checkbox`: Check or cross icon
   - `select` and `singlemulti`: Converts the stored value to the option title using `Prop.datas`
   - Other types: Displays a text or array value; an empty value is replaced with `-`.
5. Appends the prop's `unit` to `human_value`.

The final output is an array of props keyed by each prop's technical name.

## Use in the store

Together, `Quantity`, `Product`, and `Prop` have three distinct responsibilities:

- `Product`: General and basic product information.
- `Prop`: Defines props, input types, options, and display rules.
- `Quantity`: Records a specific combination of prop values along with the price and inventory for that combination.

This separation makes it possible to manage multiple sellable variants of a product without creating a separate product record for each variant.