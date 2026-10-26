# AdminLog

Model reference · `App\Models\AdminLog`

### 1. Model

The model for recording system administrators' actions, including those of Admin, Developer, or User accounts. It is designed to log operations performed on system resources and can be used as an activity history, work report, and accountability tool for administrators in organizational systems.

- For example, user x edited category z.
- Another example: user y deleted a product.

Executed operations are recorded, not activities that are purely for display; for example, simply viewing a list of information does not create a log.

### 2. Table: `admin_logs`

| Field | Type | Nullable | Comment |
|---|---|---|---|
| `id` | bigint unsigned | No | Log identifier |
| `user_id` | bigint unsigned | No | Identifier of the user who performed the operation |
| `action` | varchar(255) | No | Type of operation performed |
| `loggable_type` | varchar(255) | Yes | Type of model or resource affected by the operation |
| `loggable_id` | bigint unsigned | Yes | Identifier of the record affected by the operation |
| `created_at` | timestamp | Yes | Log creation time |
| `updated_at` | timestamp | Yes | Time the log was last edited |

### 3. Extra description of table fields

**`admin_logs.user_id`**

Specifies which user performed the operation. This field references the `users` table.

Deleting a user associated with a log is not permitted because of the database's `ON DELETE RESTRICT` constraint; this preserves users' activity history.

Related model documentation: [User](user.md).

**`admin_logs.action`**

Specifies the type of operation performed. Common examples include:

- `create` - creates a record
- `update` - edits a record, including operations defined as `bringup` in the system logic.
- `delete` - deletes a record
- `restore` - restores a deleted record

Custom operations defined in Controllers can also be recorded in this field. Its value indicates the type of operation, not the full details of the changes made.

**`admin_logs.loggable_type` and `admin_logs.loggable_id`**

Together, these fields specify which model and record the operation was performed on. This structure is designed for polymorphic references to different resources.

For example, if an operation is performed on a product, `loggable_type` specifies the product model type, and `loggable_id` specifies that product's identifier.

Both fields are optional; therefore, a log can be recorded without a reference to a specific record.

**Bulk actions**

If an administrator performs a bulk action on multiple records, a separate log is recorded for each affected record. This makes it possible to review the activity history of each record independently.

**Organizational use and accountability**

This table can be used to review administrators' operational histories, prepare activity reports, and track operations performed in organizational systems.

However, the presence of a record in this table alone does not conclusively prove every detail of an operation. The table stores the operation type, the user who performed it, and the related reference; it does not necessarily include the values before and after a change or other execution details.

### 4. Methods

**`user()`**

A `belongsTo` relationship with the `User` model; returns the user who performed the recorded operation.

Related model documentation: [User](user.md).