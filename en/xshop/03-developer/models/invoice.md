# Invoice

Management of customer invoices and orders, including financial information, order status, payment, discount, shipping method, and delivery address. This model also supports payment with customer credit and order reservations.

## `invoices` table

| Field | Type | Nullable | Description |
|---|---|---|---|
| `id` | BIGINT UNSIGNED | No | Unique invoice identifier |
| `customer_id` | BIGINT UNSIGNED | No | ID of the customer who owns the invoice; related to the [Customer](./customer.md) model |
| `status` | ENUM | Yes | Invoice status; values are `PENDING`, `CANCELED`, `FAILED`, `PAID`, `PROCESSING`, and `COMPLETED` |
| `total_price` | DECIMAL(20,2) | Yes | Total invoice amount |
| `count` | INT | Yes | Number of items in the order |
| `meta` | LONGTEXT | Yes | Additional payment information in JSON format, including information about the payment method |
| `discount_id` | BIGINT UNSIGNED | Yes | ID of the public discount applied to the invoice; related to the [Discount](discount.md) model |
| `desc` | TEXT | Yes | Customer's notes about the order, such as delivery instructions or a request to call before shipping |
| `hash` | VARCHAR(32) | Yes | Unique text identifier for accessing the invoice via URL and QR Code, without relying on a guessable numeric ID |
| `transport_id` | BIGINT UNSIGNED | Yes | Shipping method ID; related to the [Transport](transport.md) model |
| `transport_price` | DECIMAL(20,2) | No | Shipping cost; default value is `0.00` |
| `credit_price` | DECIMAL(20,2) | No | Amount of credit used to pay the invoice; default value is `0.00` |
| `reserve` | TINYINT(1) | No | Indicates whether the order was placed as a reservation; default value is `0` |
| `invoice_id` | BIGINT UNSIGNED | Yes | ID of the primary invoice associated with this invoice; used to link a reserved order to the primary order |
| `address_alt` | VARCHAR(255) | Yes | Alternative address for business customers who are shipping an order to their own customer |
| `address_id` | BIGINT UNSIGNED | Yes | ID of the customer's saved address; related to the [Address](address.md) model |
| `tracking_code` | VARCHAR(255) | Yes | Shipment tracking code |
| `deleted_at` | TIMESTAMP | Yes | Soft deletion date |
| `created_at` | TIMESTAMP | Yes | Creation date |
| `updated_at` | TIMESTAMP | Yes | Last update date |

## Invoice statuses

| Value | Description |
|---|---|
| `PENDING` | The invoice is awaiting payment or further processing |
| `CANCELED` | The invoice has been canceled |
| `FAILED` | The payment process or a related operation failed |
| `PAID` | Payment for the invoice has been recorded |
| `PROCESSING` | The order is being processed |
| `COMPLETED` | The order has been completed |

### Constants and `$invoiceStatus`

The model defines constants for the `PENDING`, `PROCESSING`, `COMPLETED`, `CANCELED`, and `FAILED` statuses. In addition to these, the `$invoiceStatus` array includes `PAID` in the list of available statuses.

### `$casts`

The `meta` field is cast to an array so its JSON data can be accessed in a structured format in the code.

## Methods

### `getRouteKeyName()`

Specifies the `hash` field as the model's routing key. Route Model Binding uses this value instead of `id`.

### `customer()`

Defines a `belongsTo` relationship with the [Customer](./customer.md) model and returns the customer who owns the invoice.

### `payments()`

Defines a `hasMany` relationship with the [Payment](payment.md) model and retrieves the payments associated with the invoice.

### `successPayments()`

Retrieves the payments associated with the invoice whose `status` is `COMPLETED`.

### `payByBankUrl($gateway)`

Generates the redirect URL for the payment gateway using the route named `redirect.bank`. The invoice ID and gateway name are passed as route parameters.

### `isCompleted()`

Checks whether the invoice status is `COMPLETED` or `PROCESSING`. Returns `true` if either condition is met.

### `orders()`

Defines a `hasMany` relationship with the [Order](order.md) model and retrieves the orders belonging to the invoice.

### `boot()`

Generates a value for `hash` when the model is created. The generated identifier's length is calculated based on the current number of `Invoice` records, and its value is created using `generateUniqueID()`.

### `storePaymentRequest($orderId, $amount, $token = null, $type = 'ONLINE', $bank = null)`

Creates a new `Payment` model record and stores the payment request information.

The stored information includes the order ID, amount, payment type, request fingerprint, gateway name, token, IP, authenticated user ID, and User-Agent. If `$type` is empty, the payment type defaults to `ONLINE`.

The payment record is linked to and saved through the `payments()` relationship.

### `storeSuccessPayment($paymentId, $referenceId, $cardNumber = null)`

Finds an existing payment and, after recording the gateway reference ID and, if provided, the card information, changes the payment status to `SUCCESS`.

It then changes the invoice status to `PAID`, prepares the information needed to send an order SMS, and dispatches the `InvoiceSucceed` event. Errors that occur while dispatching this event are logged but do not prevent the process from continuing.

### `storeFailPayment($paymentId, $message = null)`

Finds the relevant payment and, if it has not already succeeded, changes its status to `Payment::FAIL` and stores the error message.

It then sets the invoice status to `FAILED` and dispatches the `InvoiceFailed` event. If an error occurs while finding or updating the payment, a new `Payment` instance is created.

### `address()`

Defines a `belongsTo` relationship with the [Address](address.md) model and returns the address associated with the invoice.

### `evaluations()`

Retrieves the evaluation criteria associated with the invoice. This method includes three groups of criteria:

- General criteria whose `evaluationable_type` and `evaluationable_id` are empty.
- Criteria assigned to the `Invoice` model whose `evaluationable_id` is empty.
- Criteria assigned to this invoice.

### `canPayWithCredit(): bool`

Checks whether the invoice can be paid using customer credit. To return `true`, the customer must exist, have sufficient credit, and the invoice status must be either `PENDING` or `FAILED`.

### `payWithCredit(): bool`

Attempts to pay the invoice using customer credit. It first checks whether payment is possible with `canPayWithCredit()`; it then uses `CreditService` to record a credit payment transaction, creates a payment record, and records the payment and invoice status by calling `storeSuccessPayment()`.

Returns `true` on success and `false` if a prerequisite fails or an exception occurs. Payment errors are also logged.

### `isCriditIncrease()`

Checks whether the `meta` data contains a `type` value equal to `credit_charge`. This method is used to identify invoices associated with a credit increase.