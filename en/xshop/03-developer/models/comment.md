# Comment

## Table: `comments`

| Field | Type | Nullable | Comment |
|---|---|---|---|
| `id` | BIGINT UNSIGNED | No | Unique comment identifier |
| `body` | TEXT | No | Comment text |
| `name` | VARCHAR(100) | Yes | Guest author's name |
| `email` | VARCHAR(100) | Yes | Guest author's email address |
| `ip` | VARCHAR(45) | No | IP address of the comment submitter |
| `status` | TINYINT | No | Comment review status |
| `parent_id` | BIGINT UNSIGNED | Yes | Parent comment identifier for replies |
| `commentable_type` | VARCHAR(255) | No | Type of the content model the comment belongs to |
| `commentable_id` | BIGINT UNSIGNED | No | Identifier of the content the comment belongs to |
| `commentator_type` | VARCHAR(255) | Yes | Type of the model for the registered author |
| `commentator_id` | BIGINT UNSIGNED | Yes | Identifier of the registered author |
| `created_at` | TIMESTAMP | Yes | Comment creation time |
| `updated_at` | TIMESTAMP | Yes | Time of the last comment update |

## Additional Field Details

- `body`: The text of the submitted comment or reply.
- `status`: The comment review status:
  - `-1`: Rejected
  - `0`: Pending
  - `1`: Accepted
- `parent_id`: The parent comment identifier for replies. A `NULL` value indicates that the comment has no specified parent.
- `commentable_type` and `commentable_id`: Specify a polymorphic relationship with the content the comment is about, such as a product or clip.
- `commentator_type` and `commentator_id`: Identify the registered author. The author can be a customer or a system administrator.
- `name` and `email`: Store the guest author's information, that is, the information of someone who submits a comment without a system account.
- Guest author information and registered author information are alternative ways to identify the author and should not be used simultaneously.
- `ip`: Stores the IP address of the comment submitter.

## Methods

### `commentable()`

Defines a polymorphic `morphTo` relationship and returns the content the comment belongs to.

### `children()`

Returns all comments whose `parent_id` matches this comment's identifier; that is, its direct replies.

### `parent()`

Defines a `belongsTo` relationship with the `Comment` model and returns the parent comment through `parent_id`.

### `approved_children()`

Retrieves related replies through a `hasMany` relationship with the condition `status = 1`; that is, it returns only approved replies.

**Note:** In the current code, this relationship uses the `sub_comment_id` column, whereas the `children()` relationship is defined based on `parent_id`. If `sub_comment_id` does not exist in the table, this method needs to be corrected.

### `commentator()`

Determines the comment author's information based on the author type and returns an array containing `name`, `email`, and `url`:

- **Guest author:** The `name` and `email` values are taken from the comment itself, and `url` is an empty string.
- **Customer (`Customer`):** The name and email address are read from the customer record, and `url` points to the customer edit page in the admin panel.
- **Administrator (`User`):** The name and email address are read from the administrator record, and `url` points to the administrator edit page in the admin panel.