# Credit

**Model purpose:** This model is used to manage a customer's financial credit in the system and can be thought of as a wallet. A customer's credit may increase when their account is topped up, increase through a refund for a returned product, or be used to pay expenses. Once all available credit has been settled, the balance can reach zero.

`credits` records track financial operations related to credit. Each record stores the operation type, amount, processing status, and information related to the customer and payment.

## Table: `credits`

| Field | Type | Nullable | Comment |
|---|---|---|---|
| `id` | BIGINT UNSIGNED | No | Unique credit transaction identifier |
| `amount` | DECIMAL(20,2) | No | Credit amount for the transaction |
| `type` | VARCHAR(255) | No | Credit operation type |
| `status` | VARCHAR(255) | No | Transaction processing status |
| `customer_id` | BIGINT UNSIGNED | No | Identifier of the customer associated with the transaction |
| `invoice_id` | BIGINT UNSIGNED | Yes | Identifier of the associated invoice |
| `reference_id` | VARCHAR(255) | Yes | Reference identifier associated with the payment method |
| `description` | TEXT | Yes | Transaction description |
| `processed_at` | TIMESTAMP | Yes | Time the operation was processed |
| `data` | LONGTEXT | Yes | Additional transaction information in JSON format |
| `deleted_at` | TIMESTAMP | Yes | Record soft-deletion time |
| `created_at` | TIMESTAMP | Yes | Record creation time |
| `updated_at` | TIMESTAMP | Yes | Time of the last update |
| `payment_id` | BIGINT UNSIGNED | Yes | Identifier of the associated payment |

## Additional Field Details

- `amount`: Specifies the credit amount for the operation.
- `type`: Specifies the type of credit operation:
  - `CHARGE`: Adds credit to the customer's account.
  - `PAYMENT`: Uses credit to make a payment.
  - `REFUND`: Returns credit to the customer, for example, when a product is returned.
  - `ADMIN_ADJUSTMENT`: An adjustment to the credit made by a system administrator.
- `status`: Specifies the transaction processing status:
  - `PENDING`: The operation is awaiting processing.
  - `COMPLETED`: The operation was completed successfully.
  - `FAILED`: The operation failed.
  - `CANCELLED`: The operation was cancelled.
- `customer_id`: Specifies the customer to whom the credit transaction belongs. The database relationship also deletes associated credit records when the customer is deleted.
- `invoice_id`: Stores the identifier of the invoice if the transaction is associated with one. The database relationship also deletes the associated credit record when the invoice is deleted.
- `reference_id`: Stores the reference identifier associated with the payment method and is used to look up details related to `CreditPayment`.
- `description`: Stores a description of the operation, usually entered by an administrator or the system.
- `processed_at`: Specifies when the financial operation was processed.
- `data`: Stores additional transaction information in JSON format; for example, a message recorded when a payment succeeds or information needed to review the operation history.
- `payment_id`: Stores the identifier of a payment record if the credit transaction is associated with one. The database relationship restricts deletion of the associated credit record when the payment is deleted.

## Methods

### `$fillable`

Allows the `customer_id`, `type`, `amount`, `status`, `payment_id`, `invoice_id`, `reference_id`, `description`, `data`, and `processed_at` fields to be mass-assigned on the model.

### `$casts`

Specifies the data types used by the model when reading and writing fields:

- `data`: Cast to an array.
- `processed_at`: Cast to a date-time (`datetime`) object.
- `amount`: Cast to an integer (`int`).

**Note:** The `amount` column type in the database is `DECIMAL(20,2)`, but the current cast converts it to `int`. If fractional amounts need to be preserved, this cast should be reviewed.

### `$types`

Provides an array of the allowed credit operation types: `CHARGE`, `PAYMENT`, `REFUND`, and `ADMIN_ADJUSTMENT`.

### `$statuses`

Provides the defined statuses for credit transactions: `PENDING`, `COMPLETED`, `FAILED`, and `CANCELLED`.

### `customer()`

Defines a `belongsTo` relationship with the [Customer](./customer.md) model and returns the customer associated with the transaction.

### `payment()`

Defines a `belongsTo` relationship with the [Payment](payment.md) model and returns the payment associated with the transaction through `payment_id`.

### `invoice()`

Defines a `belongsTo` relationship with the [Invoice](invoice.md) model and returns the invoice associated with the transaction through `invoice_id`.

### `isCharge()`

Checks whether the transaction type is `CHARGE`; returns `true` if so, and `false` otherwise.

### `isPayment()`

Checks whether the transaction type is `PAYMENT`; returns `true` if so, and `false` otherwise.

### `isCompleted()`

Checks whether the transaction status is `COMPLETED`; returns `true` if so, and `false` otherwise.