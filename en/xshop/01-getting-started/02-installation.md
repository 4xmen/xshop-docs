# Getting Started with xShop

xShop is an open-source store built with Laravel. Choose the setup that matches what you want to do:

- **Development Mode:** For developers who want to work on xShop's code, including the frontend.
- **Use Mode:** For users who want to install and run xShop without starting the frontend development server.

## Prerequisites

- PHP 8.4 or later, with the `gd`, `sqlite3`, and `soap` extensions
- MySQL, MariaDB, or SQLite
- [Composer](https://getcomposer.org/)
- [Node.js](https://nodejs.org/) and [pnpm](https://pnpm.io/) to install frontend dependencies and build the production assets

> Installing ImageMagick is recommended for better image-processing performance.

## Development Mode

Choose this mode if you want to modify the project code and run the frontend development server.

### 1. Clone the repository

```bash
git clone https://github.com/4xmen/xshop.git
cd xshop
```

### 2. Configure the environment and database

Copy the example environment file:

```bash
cp .env.example .env
```

Open `.env` and configure your database connection. Create an empty database before running the next commands.

### 3. Install dependencies and prepare Laravel

```bash
composer install
php artisan key:generate
php artisan migrate:fresh --seed
php artisan storage:link
```

> **Warning:** `migrate:fresh` drops all tables in the selected database and recreates them. Do not run it against a database containing data you want to keep.

### 4. Install frontend dependencies

```bash
pnpm install
```

If pnpm asks you to approve build scripts, run the following command and approve the required packages:

```bash
pnpm approve-builds
```

If prompted, approve `esbuild` and `@parcel/watcher`.

### 5. Run the project

In the first terminal, start the Laravel server:

```bash
php artisan serve
```

In a second terminal, prepare the client and start the frontend development server:

```bash
php artisan client
pnpm dev
```

Open the local URL shown in the Laravel terminal.

### Windows note

If dependency installation fails with a Rollup-related error, run:

```bash
pnpm install @rollup/rollup-win32-x64-msvc
```

## Use Mode

Choose this mode if you want to install and use xShop without developing the frontend. This setup builds the frontend assets, so you do not need to run `pnpm dev`.

### 1. Clone the repository

```bash
git clone https://github.com/4xmen/xshop.git
cd xshop
```

### 2. Configure the environment and database

```bash
cp .env.example .env
```

Open `.env` and configure the database connection and application URL. Then create an empty database & change `APP_ENV` to `production`.

### 3. Install PHP dependencies

```bash
composer install --no-dev --optimize-autoloader
php artisan key:generate
```

### 4. Install dependencies and build the frontend assets

```bash
pnpm install
php artisan client
pnpm build
```

This builds the frontend assets for use. You do not need to run `pnpm dev`.

### 5. Run migrations and prepare storage

```bash
php artisan migrate --seed
php artisan storage:link
```

> If you are installing on a database that already contains data, do not use `migrate:fresh`; it deletes the existing tables and their data.

### 6. Configure the production server

For a production environment, review your `.env` settings and disable debug mode:

```env
APP_ENV=production
APP_DEBUG=false
```

Then cache and optimize the Laravel application:

```bash
php artisan optimize
```

Configure your web server so the site's document root points to the project's `public` directory.


### 7. Nginx Security Configuration for Production

If you are using Nginx, it is strongly recommended to add the following rules to the domain's server block after installation to prevent PHP execution in public/storage and public/upload.

```text
# Block PHP execution in public/storage
location ~* ^/storage/.*\.(php[0-9]*|phtml|phar)$ {
return 403;
}

# Block PHP execution in public/upload
location ~* ^/upload/.*\.(php[0-9]*|phtml|phar)$ {
return 403;
}
```


After saving the changes, validate the configuration and reload Nginx:

```bash
sudo nginx -t && sudo systemctl reload nginx
```


### Add Cron Job

Add a crontab entry for your project:

```bash
crontab -e
```

Add this line:

```bash
* * * * * cd /home/[yourusername]/[your-public-html-project-root] && php artisan schedule:run >> /dev/null 2>&1
```

## Admin Login

For installations populated with the seed data, the default login credentials listed in the project README are:


| Role      | Email                   | Password   |
| --------- | ----------------------- | ---------- |
| Developer | `developer@example.com` | `password` |
| Admin     | `admin@example.com`     | `password` |

::: warning
 Change the default password after logging in, especially if the application is accessible from the public internet.
:::