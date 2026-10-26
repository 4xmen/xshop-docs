# Contact

## Table: `contacts`

| Field | Type | Nullable | Comment |
|---|---|---|---|
| `id` | BIGINT UNSIGNED | No | Internal record identifier |
| `name` | VARCHAR(255) | No | Name of the message sender |
| `email` | VARCHAR(255) | No | Email address of the message sender |
| `subject` | VARCHAR(255) | Yes | Message subject |
| `mobile` | VARCHAR(15) | No | Sender's mobile phone number |
| `hash` | VARCHAR(32) | Yes | Message tracking code |
| `body` | TEXT | No | Message text submitted through the contact form |
| `is_answered` | TINYINT(1) | No | Message response status |
| `created_at` | TIMESTAMP | Yes | Time the message was submitted |
| `updated_at` | TIMESTAMP | Yes | Time of the last message update |

## Additional Field Details

- `name`, `email`, and `mobile`: The message sender's contact information, collected through the contact form.
- `subject`: The message subject; this field is optional.
- `body`: Stores the main text of the message submitted by the user.
- `hash`: The message tracking code, used to identify and track the message without exposing the sequential `id`. This field has a unique value, but can be `NULL` in the current table structure.
- `is_answered`: Indicates whether the message has been answered; its default value is `0`.
- `id`: The internal database identifier, which differs from the message's public tracking code.

## Methods

### `boot()`

A model lifecycle method that registers a `creating` event during model initialization to generate the `hash` value before a new record is created.

In the `creating` event, `generateUniqueID()` is called with an argument equal to the current number of records in the `contacts` table plus 2, and the result is assigned to the `hash` field.

This mechanism is used to generate a tracking code when a message is submitted.