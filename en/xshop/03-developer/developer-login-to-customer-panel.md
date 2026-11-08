
## Developer Login to Customer Panel

To simplify the development and testing process, a dedicated route is provided to allow developers to log in directly as a customer without going through the regular authentication flow, such as receiving and entering verification codes via SMS or email.

This feature is particularly useful when testing customer-specific pages and functionalities that require authentication. It eliminates the need to repeatedly interact with SMS or email delivery services during development.

### Route


```http
GET /login/as/{mobile}
```

### Usage

The route supports two login scenarios:

**1\. Login as a Specific Customer**

Provide the customer's mobile number to authenticate directly as that customer:



```http
/login/as/09123456789
```

**2\. Login as a Random Customer**

Pass `1` as the route parameter to randomly select a customer from the database and authenticate using that customer's account:

```http
/login/as/1
```

After a successful login, the route returns the authenticated customer's information, including their name and other customer details. This allows developers to identify which customer account is currently being used.

### Requirements and Restrictions

The following conditions must be met to use this feature:

- The route is only available in non-production environments.
- The current user must already be authenticated.
- The current user must have the `developer` role.
- Authentication is performed using the `customer` guard. Subsequent requests will therefore be processed using the selected customer's identity.

If any of these conditions are not met, the request will be rejected with a `403 Forbidden` response.

### Security Notice

This feature is intended exclusively for development and testing purposes and must never be accessible in the production environment.

Access must remain restricted to authenticated users with the `developer` role.

**Primary Purpose:** To enable developers to quickly access customer-specific pages and functionality without going through the regular authentication process or relying on SMS and email verification services.
