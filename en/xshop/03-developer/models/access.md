# Access

Model reference · `App\Models\Access`

### 1. Model

The user access model in the ACL (Access Control List) system. This model defines which sections or operations of the system each user can access.

Access is controlled based on Route names. In addition to restricting requests through the ACL Middleware, this model is also used to determine whether site menus are displayed.

The system divides users into three main levels:

- **Developer:** Full access to the system, including sensitive and administrative sections.
- **Admin:** Broad administrative access, but without access to some critical and sensitive parts of the system, such as changing the site's Theme or defining a new language.
- **User:** A regular user whose permitted access is determined by an administrator.

This classification represents the system's overall logic; details about the roles and their restrictions are explained in the [User](user.md) model documentation.

### 2. Table: `accesses`

| Field | Type | Nullable | Comment |
|---|---|---|---|
| `id` | bigint unsigned | No | Access record identifier |
| `user_id` | bigint unsigned | No | User identifier |
| `route` | varchar(255) | No | Route name the user is permitted to access |
| `owner` | tinyint(1) | No | Restricts access to resources owned by the user; not yet complete |
| `created_at` | timestamp | Yes | Creation time |
| `updated_at` | timestamp | Yes | Last edit time |

### 3. Extra description of table fields

**`accesses.user_id`**

Specifies which user this permission belongs to and references the `users` table.

Related model documentation: [User](user.md).

**`accesses.route`**

Stores the Route name the user is permitted to access. The value of this field must match a Route name in the Laravel system.

For example:

- `admin.product.index`
- `admin.product.create`

When checking a request, the ACL Middleware checks the Route name to determine whether a regular user is allowed to access it.

This information is also used to determine which menus should be displayed to the user. Therefore, in addition to controlling requests, the ACL also helps build a user interface tailored to the user's permissions.

**`accesses.owner`**

This field is intended to support resource ownership-based access restrictions, but it has not yet been implemented or completed and should not currently be considered an active, reliable feature.

The design goal is that, when enabled, users can only view or edit resources they own. For example, they could view or modify their own posts but would not have access to other users' posts.

### 4. Methods

This model has no custom methods defined.