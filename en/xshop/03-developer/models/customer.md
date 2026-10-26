# Customer

**Model purpose:** This model stores the store's customer information and manages relationships related to purchases, invoices, addresses, support tickets, favorites, comments, and the customer's financial credit. It also provides information for authentication, categorizing customers based on their purchase history, and recording internal administrator notes.

## Table: `customers`

| Field | Type | Nullable | Comment |
|---|---|---|---|
| `id` | BIGINT UNSIGNED | No | Unique customer identifier |
| `name` | VARCHAR(255) | Yes | Customer name |
| `email` | VARCHAR(255) | Yes | Customer email address |
| `email_verified_at` | TIMESTAMP | Yes | Time the email address was verified |
| `password` | VARCHAR(255) | Yes | Customer account password |
| `mobile` | VARCHAR(15) | Yes | Customer's mobile phone number |
| `dob` | DATE | Yes | Customer's date of birth |
| `sms` | VARCHAR(10) | Yes | Field related to the SMS authentication code |
| `code` | VARCHAR(10) | Yes | Field related to the authentication code |
| `colleague` | TINYINT(1) | No | Indicates whether the customer is a colleague |
| `description` | TEXT | Yes | Internal administrator note about the customer |
| `credit` | DECIMAL(20,2) | No | Customer's financial credit balance |
| `total_purchases` | BIGINT | No | Number of purchases recorded for the customer |
| `sex` | ENUM('MALE','FEMALE') | Yes | Customer's recorded sex |
| `height` | INT | Yes | Customer's height |
| `weight` | DECIMAL(8,2) | Yes | Customer's weight |
| `avatar` | VARCHAR(255) | Yes | Profile image file name or identifier |
| `card` | LONGTEXT | Yes | Current shopping cart information in JSON format |
| `remember_token` | VARCHAR(100) | Yes | Token for the remember-me login functionality |
| `created_at` | TIMESTAMP | Yes | Record creation time |
| `updated_at` | TIMESTAMP | Yes | Time of the last update |
| `deleted_at` | TIMESTAMP | Yes | Record soft-deletion time |

## Additional Field Details

- `email` and `mobile`: Both have unique constraints in the database; duplicate non-`NULL` values are not accepted.
- `email_verified_at`: Stores the time the email address was verified.
- `sms` and `code`: Both are used in the authentication process, but the precise difference between their roles is not clear from the provided code and requires reviewing the authentication logic.
- `colleague`: Indicates whether the customer belongs to the colleagues group. This status may be used for colleague-specific features, such as allowing a temporary address for order delivery.
- `description`: An internal administrator note about the customer, not intended for public display to the customer. It can be used to record administrative notes about interacting with the customer.
- `credit`: Stores the customer's financial credit balance. Its relationship to transactions in the [Credit](credit.md) model and how this value is updated should be reviewed in the system's financial logic.
- `total_purchases`: Stores the number of the customer's purchases and is used by the `loyalty()` method to determine their loyalty level.
- `sex`, `height`, and `weight`: Additional customer information.
- `avatar`: Specifies the customer's profile image.
- `card`: Stores the customer's current shopping cart in JSON format and can be used to transfer or restore the cart across platforms, such as a website and mobile app.
- `deleted_at`: Enables soft deletion of the customer.

## Methods

### `$hidden`

Hides the `password` and `remember_token` fields from the model's standard serialized output, such as when converting it to an array or JSON.

### `$casts`

Casts `email_verified_at` to `datetime` and `dob` to `date`.

### `invoices()`

Defines a `hasMany` relationship with the [Invoice](invoice.md) model and returns the invoices belonging to the customer.

### `tickets()`

Defines a `hasMany` relationship with the [Ticket](ticket.md) model and returns all tickets associated with the customer, including main tickets and replies.

### `main_tickets()`

Retrieves the customer's tickets where `parent_id IS NULL`. This method is used to access main or parent tickets, meaning tickets that initiate a support conversation.

### `products()`

Defines a many-to-many (`belongsToMany`) relationship with the [Product](product.md) model through the `customer_product` pivot table.

### `addresses()`

Defines a `hasMany` relationship with the [Address](address.md) model and returns the addresses associated with the customer.

### `favorites()`

Defines a many-to-many relationship with the `Product` model through the `customer_product` pivot table and is used to access the customer's favorite products.

**Note:** This method uses the same pivot table as the `products()` method. The semantic difference between these methods depends on the pivot table structure and how it is used in the application.

### `comments()`

Defines a polymorphic (`morphMany`) relationship with the [Comment](comment.md) model and returns the comments authored by the customer.

### `evaluations()`

Retrieves related evaluations from the [Evaluation](evaluation.md) model. The results include three groups: public evaluations without a specific association, evaluations of type `Customer` without a specified identifier, and evaluations specific to this customer.

### `avatar()`

Returns the URL of the customer's profile image. If `avatar` is empty or `NULL`, the default image `assets/default/unknown.svg` is provided; otherwise, the file URL is built from the `customers/` storage path.

### `purchased_products()`

Retrieves the identifiers of products purchased by the customer by joining the `orders` and `invoices` tables. Only invoices with the `PAID`, `COMPLETED`, or `PROCESSING` statuses are included. The output contains `product_id` identifiers, not complete product models.

### `hasRole()`

In the current version, always returns `false`. Therefore, this method currently confirms no roles for the customer.

### `credits()`

Defines a `hasMany` relationship with the [Credit](credit.md) model and returns the credit transactions associated with the customer.

### `creditHistory()`

Retrieves the customer's credit transactions through a `hasMany` relationship and sorts them by `created_at` in descending order, placing newer records first.

### `getFormattedCreditAttribute()`

Formats the customer's `credit` value using `number_format()` and makes it available as the computed `formatted_credit` attribute.

### `hasSufficientCredit(int $amount): bool`

Checks whether the customer's credit balance is greater than or equal to the required amount. Returns `true` if `credit >= amount`; otherwise, returns `false`.

### `loyalty()`

Determines the customer's level based on the value of `total_purchases`:

- Fewer than 2 purchases: `new`
- More than 5 purchases: `loyal`
- From 2 to 5 purchases, inclusive: `regular`

### `unsuccessInvoices()`

Retrieves the customer's invoices through the `invoices()` relationship and returns only those with the `PENDING`, `CANCELED`, or `FAILED` status. This method provides a filtered relationship for accessing unpaid, canceled, or failed invoices.