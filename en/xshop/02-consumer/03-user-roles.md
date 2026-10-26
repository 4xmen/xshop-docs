# User Access Levels in the System

User access is managed through an Access Control List (ACL) system.

However, users are divided into three general levels:

- Developer
- Admin
- User

No user is allowed to edit the access level of someone above their own level. For example, an administrator cannot modify a developer's role.

# Developer

The developer has 100% full access to the website. Therefore, do not grant developer access to any administrator, including the senior administrator.

# Admin

Administrators generally have extensive privileges, except for a few highly sensitive areas that they do not need access to:

- Changes to the website's language
- Website appearance and color scheme settings
- Website template design

All other permissions are available to administrators.

# User

A regular user whose access level is defined by administrators. All permissions available in the system's access control functionality can be edited.

After creating a user, you can configure their permissions using a form similar to the following:

![acl.png](https://raw.githubusercontent.com/4xmen/xshop-docs/refs/heads/master/images/acl.webp)