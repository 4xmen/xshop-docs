# Password Recovery

Password recovery methods:

- Standard recovery via email
- Recovery using Tinker
- Recovery through a database management tool such as phpMyAdmin

## 1. Recovery Using the "Forgot Password" Form

The user clicks the "Forgot Password?" link on the login page, enters their account email address, and receives a password reset link via email. By opening the link, they can set a new password.

This method works provided that the project's email delivery settings have been configured correctly beforehand. If the password reset email does not arrive, check the email configuration and Laravel logs.

## 2. Recovery Using Tinker

This method is intended for an administrator or developer who has access to the project's execution environment. Run the following command in the project terminal:

```
php artisan tinker
```

Then, find the user by email and save the new password:

```
$user = App\Models\User::where('email', 'user@example.com')->firstOrFail();

$user->password = Illuminate\Support\Facades\Hash::make('New-Strong-Password');
$user->save();
```

Replace the email address with that of the intended user and the password with a secure value. Do not store the plaintext password in the project code or logs.

## 3. Changing the Password Through phpMyAdmin or a Database Management Tool

This method is useful when an administrator has access to the database but cannot use Tinker. Do not write a plaintext password directly to the `password` column; its value must be hashed.

If PHP CLI is available on the server, you can generate the hash without using Tinker:

```
php -r "echo password_hash('New-Strong-Password', PASSWORD_BCRYPT), PHP_EOL;"
```

Copy the output value into the `password` column for the same user. The following SQL example assumes that the table is named `users` and the user's ID is `123`:

```
UPDATE users
SET password = 'PASTE_HASH_HERE'
WHERE id = 123;
```

In phpMyAdmin, you can also perform this operation by editing the user's row: enter the generated hash in the `password` column and save the changes. The table or column name may differ in your project.

### Important Notes

- Email-based recovery is the standard method for users to recover their own passwords.
- Only authorized administrators or support personnel should use Tinker or database management tools.
- Do not send the hash to the user; provide only the new or temporary password through a secure channel.
- After logging in with a temporary password, ask the user to change it.

Debugging Note: If the user cannot log in after the database has been updated, make sure the hash was stored in the correct column for the correct account and that the project's hashing method is compatible with bcrypt.