# Artisan Commands

In this section we introduce the custom xShop commands and their uses. These commands manage front-end assets, develop themes, generate seed data, create controllers, and run migrations.

## 1. Building Front-End Assets

```bash
php artisan build
```

This command initiates the front-end asset build process and internally calls:

```bash
npm run build
```

Use it when direct npm execution via SSH is unavailable and the build must be performed through Artisan.

Before running, ensure the execution Area has the necessary permissions. Running a build in a Production Area is generally discouraged; assets should be prepared in a development Area or during deployment and then published.

## 2. Client Asset Generator

```bash
php artisan client
```

This command collects and prepares client-side assets. It should be executed at least once before working with the system.

After making changes to a Theme, run this command (and, if needed, the build command) before the build step:

```bash
php artisan client
php artisan build
```

It is recommended to perform these steps in a development Area or during deployment so that the design environment remains separate from the production environment. This recommendation is about responsibility separation, not a security issue with the commands themselves.

## 3. Creating a Theme Part

```bash
php artisan make:part {part} {segment}
```

This command generates the files required for a new Theme Part in the selected segment.

Before running:

- Define the Area and purpose of the Theme Part.
- Choose the appropriate segment based on where it will be used.
- Avoid creating duplicate parts; if a similar example exists, consider reusing it.

Generated files include:

- `PartName.php`: defines `onAdd`, `onRemove`, and `onMount` props
- `PartName.blade.php`: HTML structure and Blade code
- `PartName.scss`: part styles
- `PartName.js`: JavaScript behavior
- `screenshot.webp`: preview of the Theme Part

For more details, see the Theme Part creation guide: [create-new-theme-part.md](create-new-theme-part.md)

## 4. Building an xController

```bash
php artisan make:xcontroller {model}
```

`xController` is the core project tool for reducing repetitive code and simplifying CRUD implementation.

Running this command creates the controller for the model in the admin area and two Blade files for the list and form.

To learn about its capabilities and usage, read the dedicated xController documentation: [x-controller.md](x-controller.md)

## 5. Generating Sample Images for Models

### Preparing Image Sets

```bash
php artisan seeding:prepare
```

This command places ready-made image collections for seed data in the following path:

```
database/seeders/images
```

### Assigning Images to a Model

```bash
php artisan seeding:image {model} {directory}
```

This command uses images from a specified folder for the target model. For example, you can assign sample product images to the `Product` model.

### Generating Images for All Supported Models

```bash
php artisan seeding:all digital
```

The command selects random images from the chosen collection and assigns them to all supported models.

In this example, the `digital` collection is used; the expected path is `database/seeders/images/digital`.

> These commands are intended for seed data. Before running, verify the models and image directories and avoid applying them unintentionally to production data.

## 6. Updating Automated Tests

```bash
php artisan test:update
```

This command updates the system's final test file and is primarily useful during development. For instance, after adding a new admin-panel route, you may need to refresh the automated tests.

After updating tests, run them with:

```bash
php artisan test
```

Note that generating or updating a test file alone does not guarantee that all new behavior is correctly tested; review related tests as well.

## 7. Migrating from WordPress (xShift)

```bash
php artisan xshift {action} {url?}
```

This command transfers data from WordPress and WooCommerce to xShop. The `action` parameter specifies the type of data to migrate, and `url` provides the source site address.

Examples:

```bash
php artisan xshift group https://wp.example.com/
php artisan xshift post https://wp.example.com/
php artisan xshift category https://wp.example.com/
php artisan xshift product https://wp.example.com/
```

The `xshift` plugin must be installed and active on the WordPress site for these commands to work.

> **Warning:** The `xshift clear` command deletes content and product data. Review the migration documentation beforehand and back up any required data.

For full migration steps, prerequisites, and constraints, see the WordPress to WooCommerce migration guide: [migrate-from-wordpress.md](migrate-from-wordpress.md)