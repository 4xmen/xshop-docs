# Payment

The `Payment` model stores information about payment requests and transactions associated with an invoice. An invoice can have multiple payments, such as an unsuccessful payment attempt followed by a retry, or payments made using different methods.

This model stores information such as the payment amount, method and status, gateway-related identifiers, and additional transaction details.

## `payments` table structure

| Field | Type | Nullable | Description |
|---|---|---|---|
| `id` | BIGINT UNSIGNED | No | Payment ID |
| `invoice_id` | BIGINT UNSIGNED | No | ID of the associated invoice; related to the `invoices` table |
| `amount` | DECIMAL(20,2)| Yes | Payment amount |
| `type` | ENUM | Yes | Payment method; defaults to `ONLINE` |
| `status` | ENUM | Yes | Payment status; defaults to `PENDING` |
| `order_id` | VARCHAR(255) | No | Unique ID of the payment request or order |
| `reference_id` | VARCHAR(255) | Yes | Transaction reference ID with the gateway or payment provider |
| `comment` | TEXT | Yes | Payment-related notes |
| `meta` | LONGTEXT | Yes | Additional payment information in JSON format |
| `created_at` | TIMESTAMP | Yes | Creation time |
| `updated_at` | TIMESTAMP | Yes | Last update time |

## Payment methods

The `type` field accepts the following values:

- `ONLINE`: Online payment
- `CHEQUE`: Payment by check
- `CASH`: Cash payment
- `CARD`: Card payment
- `CASH_ON_DELIVERY`: Payment on delivery

## Payment statuses

The `status` field accepts the following values:

- `PENDING`: Payment awaiting resolution
- `SUCCESS`: Successful payment
- `FAIL`: Failed payment
- `CANCEL`: Canceled payment

## Payment identifiers

### `order_id`

A unique identifier for the payment request or order. In `Invoice::storePaymentRequest()`, this value is received and stored through the `$orderId` parameter.

For credit payments, a value with the `CREDIT_` prefix and the current time is also generated. Therefore, this field is not necessarily the store order ID; it can be an internal identifier or one associated with the payment process.

The database enforces the uniqueness of `order_id`.

### `reference_id`

Stores the transaction reference ID. For example, in the PayPal implementation, after the payment is confirmed, the Capture ID is returned as `reference_id`.

This ID differs from `order_id`: the former refers to the completed transaction, while the latter is used to identify the payment request or order.

### `comment`

Stores text notes related to the payment. In `Invoice::storeFailPayment()`, the received error message is stored in this field. Other uses depend on the logic for each payment method.

## Additional information

### `meta`

Stores additional payment information in JSON format. In `Invoice::storePaymentRequest()`, this field contains information such as the request fingerprint, gateway name, token, IP, authenticated user ID, and User-Agent.

For successful payments, additional information such as `card_number` is also added to `meta`. In the PayPal example, the payer's email address is stored here instead of a card number.

The `meta` field is validated using the `CHECK (json_valid(meta))` constraint; therefore, any non-`NULL` value must be valid JSON.

## Relationships and database constraints

- Every payment must be associated with an invoice.
- The `invoice_id` relationship to the `invoices` table has `ON DELETE CASCADE`; deleting an invoice also deletes its dependent payments.
- `amount` is of type `BIGINT UNSIGNED`, so negative values and fractional amounts cannot be stored directly in this column.
- Although the `type` and `status` fields have default values, they are nullable; therefore, the database also accepts `NULL`.

## Note to review

The `amount` type differs from the amount fields in the `invoices` and `orders` tables. Before changing the column type, review the currency unit and how amounts are stored across all gateways; some gateways accept amounts in the smallest integer currency unit. The final decision should be based on the actual amount contract used by the application.