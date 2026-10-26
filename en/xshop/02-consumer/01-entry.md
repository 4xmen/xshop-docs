# Logging In to the System

The default login method for users, or more specifically, administrators, is the approach recommended by Laravel and Laravel UI, which uses email and password authentication.

Additionally, direct registration is not enabled in the system. Users must be created using a seeder, or a new user must be created by one of the administrators.

If you have not changed your password after seeding, the default login credentials are as follows:

| Role      | Email                   | Password   |
| --------- | ----------------------- | ---------- |
| Developer | `developer@example.com` | `password` |
| Admin     | `admin@example.com`     | `password` |
| User      | `user@example.com`      | `password` |

> Change the default password after logging in, especially if the application is accessible from the public internet.

Login page:

![login.png](https://raw.githubusercontent.com/4xmen/xshop-docs/refs/heads/master/images/login.webp)
