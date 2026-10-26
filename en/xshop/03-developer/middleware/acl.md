# Acl Middleware

This Middleware is responsible for controlling users' access to various operations in the admin panel and serves as part of the project's Access Control Layer (ACL). Its purpose is to ensure that regular admin panel users can access only the sections and operations for which they have been granted the necessary permissions.

Based on the current Route name, this Middleware determines which section of the admin panel and which operation the request pertains to, then checks the user's access to that operation. If the user does not have the required permission, the request is stopped with a `403 Forbidden` error, and the requested operation cannot be executed.

Users with the `admin` or `developer` role are exempt from the usual access-level checks in this Middleware. For other users, access to administrative operations is checked against the permissions defined for their account. Sections such as `home` and `ckeditor` are also exempt from the usual operation access checks, so ACL restrictions are not applied to them.

In addition to checking access to regular operations, this Middleware also handles requests to bulk-delete data. For such requests, the user's access is checked against the permissions associated with the delete operation, preventing bulk operations from being executed without the appropriate permission.

If a user has no defined permissions, they are redirected to the admin panel's logout route. This behavior prevents users without permission to use the system's administrative sections from continuing to use them.

The core logic for defining and managing access is implemented in conjunction with the `Access` and `User` models. This Middleware uses the existing mechanisms for checking permissions and is responsible for enforcing access restrictions while processing admin panel requests. For details about the access structure, how permissions are assigned to users, and the Access Control Layer implementation, refer to the documentation for the `Access` and `User` models.

[03-user-roles.md](../../02-consumer/03-user-roles.md)
[access.md](../models/access.md)
[user.md](../models/user.md)