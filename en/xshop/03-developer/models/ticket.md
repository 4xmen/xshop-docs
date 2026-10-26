# Ticket

The `Ticket` model is used to manage customer support tickets. Each ticket can include a customer message, an administrator response, a handling status, and child tickets. Tickets can also be evaluated and rated.

## Data structure
| Field | Type | Nullable | Description |
|---|---|---|---|
| `id` | BIGINT UNSIGNED | No | Unique ticket ID |
| `title` | VARCHAR(128) | Yes | Ticket title; used for parent tickets without a category |
| `customer_id` | BIGINT UNSIGNED | No | ID of the customer who submitted the ticket |
| `user_id` | BIGINT UNSIGNED | Yes | ID of the user or administrator who submitted the response |
| `body` | TEXT | No | Ticket message text; not translated |
| `status` | ENUM('PENDING', 'ANSWERED', 'CLOSED') | No | Ticket handling status |
| `answer` | TEXT | Yes | Administrator response text |
| `parent_id` | INT UNSIGNED | Yes | Parent ticket ID, used to identify child tickets |
| `created_at` | TIMESTAMP | Yes | Ticket creation time |
| `updated_at` | TIMESTAMP | Yes | Last ticket update time |

## Properties

### `$ticket_statuses`

Specifies the valid ticket statuses:

- `PENDING`: Awaiting handling
- `ANSWERED`: Answered
- `CLOSED`: Closed

The database default status is `PENDING`.

## Relationships

- `customer()`: A `belongsTo` relationship with the `Customer` model; the customer who submitted the ticket.
- `user()`: A `belongsTo` relationship with the `User` model; the administrator or user associated with the response.
- `subTickets()`: A `hasMany` relationship with the `Ticket` model; child tickets, ordered by `id` in ascending order.

## Methods

### `evaluations()`

Returns the evaluations available for the ticket, including general evaluations, evaluations assigned to the `Ticket` model, and evaluations assigned to the current ticket.

## Notes

- `customer_id` is required, and its foreign key references the `Customer` model. Deleting a customer also deletes the associated tickets (`ON DELETE CASCADE`).
- `user_id` is optional and references the `User` model. Deleting the associated user also deletes the associated tickets (`ON DELETE CASCADE`).
- The `parent_id` field is used to create a parent-child structure. The table defines an index for this field, but no foreign key is defined.
- Tickets can be evaluated and rated using the `Rate` rating system.
- The `answer` field is intended to store the administrator's response, while `body` stores the original ticket message.
- The `status` field is an `ENUM` type and accepts only `PENDING`, `ANSWERED`, and `CLOSED`.