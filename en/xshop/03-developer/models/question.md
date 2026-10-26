# Question

The `Question` model is used to record customers' questions about products. These questions may concern product specifications, features, or related services. For example, a customer might ask whether a product includes after-sales service or what the shoulder width of a garment is.

## Data structure
| Field | Type | Nullable | Description |
|---|---|---|---|
| `id` | BIGINT UNSIGNED | No | Unique question ID |
| `body` | TEXT | No | Customer's question |
| `customer_id` | BIGINT UNSIGNED | No | ID of the customer who submitted the question |
| `answer` | TEXT | Yes | Answer submitted to the question; may be empty |
| `product_id` | BIGINT UNSIGNED | No | ID of the product the question is about |
| `status` | TINYINT | No | Question status, with a value of `0` or `1` |
| `created_at` | TIMESTAMP | Yes | Question creation time |
| `updated_at` | TIMESTAMP | Yes | Last update time |

## Relationships

- `product()`: A `belongsTo` relationship with the `Product` model; the product the question is about.
- `customer()`: A `belongsTo` relationship with the `Customer` model; the customer who submitted the question.

## Methods

### `product()`

Returns the product associated with the question.

### `customer()`

Returns the customer who submitted the question.

## Notes

- Questions are associated with a specific product and are not designed for general questions about the site.
- The answer is stored in the `answer` field and is optional.
- If a customer or product is deleted, the related questions are also deleted according to the database's foreign key constraints.
- The `status` field accepts the values `0` and `1`; the precise meaning of each value is not specified in this document.