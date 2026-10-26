# User

The `User` model is used to manage system users, account information, roles, access levels, and users' relationships with different parts of the application. Each user can create content, participate in tickets, post comments, and access different parts of the system according to their role and permissions.

## Data structure

| Field | Type | Nullable | Description |
|---|---|---|---|
| `id` | BIGINT UNSIGNED | No | Unique user ID |
| `name` | VARCHAR(255) | No | User name |
| `email` | VARCHAR(255), unique | No | User email address; unique and usable for Route Model Binding |
| `email_verified_at` | TIMESTAMP | Yes | Email verification time |
| `password` | VARCHAR(255) | No | User's hashed password |
| `mobile` | VARCHAR(20) | Yes | User's mobile number |
| `avatar` | VARCHAR(1024) | Yes | User avatar filename |
| `role` | ENUM('DEVELOPER', 'ADMIN', 'USER', 'SUSPENDED') | No | User role; one of `DEVELOPER`, `ADMIN`, `USER`, or `SUSPENDED` |
| `darkmode` | TINYINT(1) | No | User's preferred theme setting; defaults to `1` |
| `remember_token` | VARCHAR(100) | Yes | Token for the Remember Me feature |
| `created_at` | TIMESTAMP | Yes | Account creation time |
| `updated_at` | TIMESTAMP | Yes | Last account update time |
| `deleted_at` | TIMESTAMP | Yes | User soft deletion time |
| `markups` | TEXT | Yes | User-specific Schema Markup data |

## Properties

### `$roles`

List of roles defined in the model:

- `DEVELOPER`: Developer
- `ADMIN`: Administrator
- `USER`: Regular user
- `SUSPENDED`: Suspended user

### `$hidden`

The `password` and `remember_token` fields are excluded from serialized output when the model is converted to an array or JSON.

### `casts()`

- `email_verified_at`: Cast to the `datetime` type.
- `password`: Automatically hashed when assigned through Laravel's `hashed` feature.

## Methods

### `getRouteKeyName()`

Uses the `email` field instead of `id` for Route Model Binding.

### `markupKeywords()`

Returns the list of keywords available for use in Schema Markup, along with their corresponding labels and values. Values can come from application settings or user information.

For example, the `%name%` keyword can be replaced with the user's current name to update the Schema Markup to reflect their information.

### `posts()`

A `hasMany` relationship with the `Post` model; posts created by the user.

### `postsPercent()`

The percentage of the system's total posts that belong to the user; returns `100` if there are no posts.

### `products()`

A `hasMany` relationship with the `Product` model; products belonging to the user.

### `productsPercent()`

The percentage of the system's total products that belong to the user; returns `100` if there are no products.

### `tickets()`

A `hasMany` relationship with the `Ticket` model; tickets associated with the user through the `user_id` field.

### `ticketsPercent()`

The percentage of the system's total tickets associated with the user; returns `100` if there are no tickets.

### `comments()`

A polymorphic `morphMany` relationship with the `Comment` model; comments for which the user is identified as the author.

### `commentsPercent()`

The percentage of the system's total comments that belong to the user; returns `100` if there are no comments.

### `logs()`

A `hasMany` relationship with the `AdminLog` model; logs recorded for the user through the `user_id` field.

### `accesses()`

A `hasMany` relationship with the `Access` model; accesses recorded for the user.

### `hasAnyAccess($name)`

Checks whether the user has at least one access entry matching the specified route name. Suspended users are denied access, while administrators and developers have unrestricted access.

### `hasAnyAccesses($array)`

Checks whether the user has at least one of the accesses in the array. Suspended users are denied access, while administrators and developers have unrestricted access.

### `hasAccess($route)`

Checks whether the user has access to the specified route. Suspended users are always denied access.

### `evaluations()`

Returns general evaluations, evaluations associated with the `User` model, and evaluations assigned to the current user.

### `avatar()`

Returns the user's avatar URL; if no avatar is available, it uses the default image `assets/default/unknown.svg`.

## Notes

- The `email` field has a unique index, so the table cannot contain two users with the same email address.
- The `role` field in the database specifies the user's primary role. The `spatie/laravel-permission` package is also used to manage roles and permissions; do not assume these two mechanisms are equivalent without reviewing the application logic.
- In access-checking methods, users with the `SUSPENDED` role are denied access, even if a direct access entry has been recorded for them.
- The `postsPercent()`, `productsPercent()`, `ticketsPercent()`, and `commentsPercent()` methods calculate the user's share of all records in each section. If the total number of records is zero, they return `100`.
- The `markups` field stores user-specific Schema Markup. The keywords defined in `markupKeywords()` allow variable values, such as the user's name, to be substituted.
- The `darkmode` field stores the user's theme setting; its default value is `1`.
- The `deleted_at` field exists in the table; whether Soft Deletes are enabled depends on the model configuration.