# Migration Guide: WordPress and WooCommerce to xShop

## Table of Contents

- 1. Introduction
- 2. Prerequisites
- 3. Architecture and How the Migration Works
- 4. Installing the xshift Plugin in WordPress
- 5. Preparing the xShop Project
- 6. Running the Migration Commands
- 7. Overview of Migration Operations
- 8. Clearing Existing Data
- 9. Transferring Images and Media Files
- 10. Managing Redirects
- 11. Migration Duration
- 12. Common Errors and Solutions
- 13. Important Notes and Limitations
- 14. Post-Migration Checklist
- 15. Summary

---

## 1. Introduction

The `xshift` feature is a tool for transferring data from a website built on WordPress and WooCommerce to the xShop system.

This tool provides the required data to the xShop project in JSON format through a dedicated WordPress plugin. A Laravel Artisan command then retrieves the data and stores it in the xShop database and file storage.

The data supported in the current implementation includes:

- Product categories (Product Categories)
- Content groups (Groups)
- Posts and blog articles (Posts)
- Store products (Products)
- Category images
- Featured images of posts
- Product images
- Post tags
- Basic product inventory, price, and SKU data
- Creation of redirects for URLs that have changed after the migration

> **Note:** Transferring users, orders, invoices, and other store data is not implemented as a standalone operation in the current code. The presence of models for this data in the code does not mean that migrating it is supported.

## 2. Prerequisites

Before starting the migration, check the following items.

### 2.1. Source Site Prerequisites

- The WordPress site must be accessible.
- The WooCommerce plugin must be installed and active if you intend to transfer store products.
- The dedicated `xshift` plugin must be installed and active.
- The plugin's API path must be accessible from the xShop project.
- The required images and files must be downloadable via URL.

### 2.2. xShop Project Prerequisites

- The xShop project must be installed and runnable.
- The database connection settings in the `.env` file must be correct.
- The project's PHP and Composer dependencies must be installed.
- The required tables and migrations must have been run.
- There must be enough disk space to store images.
- The PHP execution user must have write access to the storage paths.
- At least one user must exist in the users table, because migrated posts and products are assigned to the first user in the system.

### 2.3. Creating a Backup

Before running the migration on a production environment, back up the database and the project files.

In particular, before running the clear operation, make sure you are certain about deleting the existing data.

**It is recommended to perform the first migration run in a development environment or on a test copy of the target site.**

## 3. Architecture and How the Migration Works

The migration process consists of two parts.

### Part One: The WordPress Plugin

The `xshift` plugin is located in the project's `thirdparty` folder. This plugin exposes WordPress data through a dedicated API at the following path:


```
/wp-json/xshift/v1
```

For example, post data is retrieved from the following path:


```
https://wp.example.com/wp-json/xshift/v1/posts
```

The paths used in the current code are as follows:

| API Path | Data |
| --- | --- |
| `/product-categories` | Product categories |
| `/categories` | Content groups |
| `/posts` | Posts |
| `/products` | Products |

### Part Two: The Laravel Artisan Command

The migration command is implemented in the following class:

```
app/Console/Commands/xShift.php
```

Command name:


```bash
php artisan xshift
```

The general structure of the command is as follows:



```bash
php artisan xshift {action} {url?}
```

- `action`: The desired migration operation
- `url`: The URL of the source WordPress site

The `url` parameter is optional in the command definition, but it is required for data retrieval operations.

In each migration operation, xShop retrieves JSON data from the WordPress API and then creates the corresponding records in the target database.

## 4. Installing the xshift Plugin in WordPress

1. Log in to the WordPress admin panel.

2. From the Plugins section, select the option to add a new plugin.

3. Install the `xshift` plugin located in the `thirdparty` folder of the xShop project.

4. Activate the plugin.

5. Verify the API address. For example, if the WordPress site address is `http://wp.test/`, the posts API path will be as follows:


```
http://wp.test/wp-json/xshift/v1/posts
```

The address above is only an example. Replace it with the actual address of the source site.

**Security note:** If the API exposes site data to requesters without authentication, control access to it according to the migration conditions. In a production environment, it is better to use HTTPS.

## 5. Preparing the xShop Project

Go to the main folder of the xShop project:


```bash
cd /path/to/xShop
```

If needed, check the installation status of dependencies and the project settings:


```bash
composer install
php artisan migrate
```

Run the `php artisan migrate` command only in accordance with the project's deployment procedure, especially if the database already contains data.

Next, verify that at least one user exists in the system.

To run the migration, enter the source site address in a suitable format:


```text
http://wp.test/
```

The current code normalizes the address by removing the leading and trailing `/`. As a result, the presence or absence of a trailing slash usually makes no difference.

## 6. Running the Migration Commands

### 6.1. Migrating Content Groups



```bash
php artisan xshift group http://wp.test/
```

This command retrieves data from the `/categories` path and stores the content groups in the corresponding table.

The data transferred in the current code:

- ID
- Name
- Description
- Slug
- Parent group ID

If the group's URL path changes, a redirect is also recorded.

### 6.2. Migrating Posts



```bash
php artisan xshift post http://wp.test/
```

This command retrieves post data from the `/posts` path.

The transferred data includes the following:

- Post ID
- Title
- Slug
- Post content
- Post excerpt
- Related groups
- Tags
- Featured image, if available
- Post creation date

In the current implementation, the status of posts is set to `1` during the migration, and posts are assigned to the first user in the system.

### 6.3. Migrating Product Categories



```bash
php artisan xshift category http://wp.test/
```

This command retrieves product category data from the `/product-categories` path.

The transferred data is as follows:

- Category ID
- Name
- Description
- Slug
- Parent category
- Category image, if available

Category images are stored in the following path:



```text
storage/app/public/categories/
```

In addition, if the image is processed successfully, an optimized version of it is created using the existing functionality in `XController`.

### 6.4. Migrating Products



```bash
php artisan xshift product http://wp.test/
```

This command retrieves WooCommerce products from the `/products` path.

The data transferred in the current code:

- Product ID
- Name
- Slug
- Full description
- Short description
- Related categories
- SKU, if available
- Stock quantity, if available
- Price, if available
- Stock status
- Product images
- Product creation date

Product stock status is mapped according to the following table:

| WooCommerce Value | xShop Value |
| --- | --- |
| `instock` | `IN_STOCK` |
| `onbackorder` | `BACK_ORDER` |
| `outofstock` | `OUT_STOCK` |

If a product has multiple images, the downloaded images are added to that product's media collection.

### 6.5. Recommended Order of Command Execution

To fully migrate the supported content, the following order is recommended:



```bash
php artisan xshift group http://wp.test/
php artisan xshift category http://wp.test/
php artisan xshift post http://wp.test/
php artisan xshift product http://wp.test/
```

Groups and categories are transferred first so that the required relational data is available in the target when posts and products are transferred.

Although the current code does not directly depend on the existence of categories and groups in the post and product operations, the order above reduces the likelihood of foreign key errors.

**Important:** In the current version, there is no explicit check for the existence of group and category IDs before running the post and product operations. Therefore, you must make sure that the IDs received from WordPress are compatible with the structure of the target data.

## 7. Overview of Migration Operations

| Operation | Description | Target Table Must Be Empty |
| --- | --- | --- |
| `group` | Transfer content groups | Required |
| `category` | Transfer product categories | Required |
| `post` | Transfer posts | Required |
| `product` | Transfer products | Required |
| `clear` | Clear some tables and data | Requires user confirmation |

For the `group`, `category`, `post`, and `product` operations, if the table of the corresponding model already contains records, the command stops with an error message.

For example:



```text
The table must be empty to migrate
```

In this situation, you must check the state of the target data. If you intend to restart the migration from scratch, you can consider the clear operation after creating a backup.

Note that an empty main table does not necessarily mean that pivot tables, media files, or other related data are also empty.

## 8. Clearing Existing Data

To clear the data specified in the migration command, the following command is used:



```bash
php artisan xshift clear
```

This operation is not allowed in the `production` environment, and in other environments it asks for user confirmation before running.

Sample confirmation message:



```text
Are you sure you want to clear all data?
```

If confirmed, the clear operation is performed.

### 8.1. Data That Is Cleared

According to the current code, the following tables and models are affected:

- The `category_product` pivot table
- The `group_post` pivot table
- `Category`
- `Group`
- `Post`
- `Creator`
- `Invoice`
- `Order`
- `Product`

Pivot tables are cleared with `TRUNCATE`, and models are cleared using `truncate()`.

### 8.2. Important Warning About the clear Operation

::: warning
**This command is not designed for selective or safe clearing.**

- Data in the listed tables is deleted.
- Order and invoice data are also included in the clear list.
- Clearing may affect data relationships and integrity.
- Other pivot tables that are not specified in the code are not necessarily cleared.
- Media files and storage folders are not generally cleared in the `clear` operation.
- The `Redirect` model is also not cleared in this operation; therefore, previous redirects may remain.
  Before running this command, back up the database and make sure the deletion of data is approved.

In addition, in the current code, the `DB::statement('SET FOREIGN_KEY_CHECKS=0')` statement is executed before the operation is checked, and restoring this setting to its original value at the end of the command is not explicitly done. Check its behavior in your database environment and version.
:::

## 9. Transferring Images and Media Files

Images are retrieved through the URLs in the API response. The Guzzle library is used to download files.

In the current implementation:

- The maximum wait time for a download request is 30 seconds.
- Responses other than HTTP 200 are considered download failures.
- Files are received as a stream and saved to a temporary file.
- Category images are stored and optimized in their own dedicated folder.
- Post and product images are added to the corresponding media collections through the Media Library feature.

The storage path for category images:



```text
storage/app/public/categories/
```

### Important Notes About Images

- The volume of images may significantly increase the migration time.
- If the source server serves images with access restrictions, the download may fail.
- If a download error occurs, the error information is not recorded in full and in a structured way in the current code.
- Management of temporary files and their cleanup is not explicitly guaranteed in all code execution paths.
- For products and posts, the final file names and organization depend on the project's Media Library settings.

After the migration, check category images, featured images of posts, and the product gallery on the target site.

## 10. Managing Redirects

To prevent broken links, the migration code compares the old URL of each piece of content with its new URL.

If the old and new URL paths differ, a record is created in the `Redirect` model.

The stored data includes the following:

- `source`: The old path
- `destination`: The new path
- `status`: The value `1`
- `expire`: The expiration date, 180 days after the time the operation is run

To compare paths, the Path part of the URL is extracted, and differences in domain or Query String parameters are not taken into account in this comparison.

For example, if the old URL is as follows:



```text
https://wp.example.com/old-post/
```

and the new URL is as follows:



```text
https://shop.example.com/blog/new-post
```

the paths differ and a redirect record is created.

### Notes on Redirects

- Only path differences are checked; a change of domain alone will not create a redirect.
- The `status` value is set to `1` in the code; the HTTP redirect type must be determined by the model logic or the redirect management system.
- The expiration date is generated using the `y-m-d` format, which stores the year as two digits. If the target column requires a four-digit year, this part must be corrected.
- Re-running the migration without clearing previous redirects may create duplicate records.
- You must verify that the target system processes the paths stored in `Redirect` as expected.

## 11. Migration Duration

The duration of the migration depends on various factors:

- Number of posts and products
- Number of categories and groups
- Number of images
- Size of media files
- Response speed of the source site
- Internet speed between the source and target
- Hardware resources of the target server
- Image processing time

In small projects, the migration may take a few minutes; in large sites with many images, this process may take several hours.

During execution, keep the terminal open until the operation finishes and check the error output.

## 12. Common Errors and Solutions

### 12.1. URL Required Error

If the migration command is run without the WordPress address, the following message is displayed:



```text
url is necessary to migrate
```

Solution:

Add the source site address to the command:



```bash
php artisan xshift post https://wp.example.com/
```

### 12.2. Target Table Not Empty Error

If the target table contains data, the following message is displayed:



```text
The table must be empty to migrate
```

Solution:

- First, check the existing data.
- If necessary, create a backup.
- Perform the clear operation only in a suitable environment and with confirmation of data deletion.

### 12.3. Receiving an Invalid Response from the API

If the API path is wrong, the plugin is not active, or the source site is unavailable, retrieving data will fail.

For an initial check, check the URL corresponding to the operation in a browser or with `curl`:

bash

```
curl -i https://wp.example.com/wp-json/xshift/v1/posts
```

The response must be valid in terms of HTTP and JSON structure.

For the main API request, the current code does not fully perform error handling and JSON structure validation; therefore, some errors may cause the operation to fail instead of displaying a specific message.

### 12.4. Image Download Error

If an image is not retrieved, check the following:

- The target server's access to the image URL
- The validity of the URL
- The HTTP response status
- Network restrictions and firewall
- Target disk space
- Write access to the storage folders

### 12.5. User-Related Error

Posts and products are recorded with the ID of the first user in the system. If no user exists in the `users` table, the operation may fail.

Solution:

Before the migration, verify that at least one valid user exists.

### 12.6. Category or Group ID Error

The current code uses the IDs received from WordPress to associate posts and products with groups and categories.

If the target IDs do not exist or do not match the source data, there is a possibility of errors or incorrect associations.

Solution:

First transfer the groups and categories, and then migrate the posts and products.

### 12.7. PHP or Database Version Errors

If runtime errors occur, check the PHP version, the MySQL or MariaDB version, the Laravel settings, and the project dependencies.

Also make sure that the structure of the database columns and relationships is compatible with the current xShop models.

## 13. Important Notes and Limitations

The following items relate to the current implementation and must be considered before migrating a live site.

### 13.1. No Global Transaction

The migration operations are not run in a single database transaction. If an operation fails midway, part of the data may already have been recorded.

Since re-running each operation stops if records exist in the main table, continuing the migration after a failure may require controlled clearing or manual correction of the data.

### 13.2. Possibility of ID Collisions

The IDs of the source records are used directly in the target models.

If an ID is already in use in the target database, a duplicate primary key error may occur or data relationships may be corrupted.

### 13.3. Incomplete Transfer of Product Features

In the current code, the transfer of advanced WooCommerce features, product variables and variations (Variations), discounts, taxes, coupons, orders, and transaction history is not implemented.

In addition, the code for transferring additional product data is explicitly still under development.

### 13.4. Status of Posts and Products

The status of posts and products is set to `1` in the current code. This value does not necessarily represent the original status of the content in WordPress.

### 13.5. Dependence on the API Data Structure

The code expects certain fields, including the IDs of related categories, to be present in the API response. Missing or empty arrays can cause errors.

### 13.6. Error Logging and Progress Reporting

The current implementation does not provide a comprehensive report of the number of successful, failed, and skipped records. In addition, error handling is not consistent across all requests and database operations.

For large migrations, adding Logging, progress reporting, and the ability to resume the operation from the point of failure is recommended.

### 13.7. Security Considerations

- Use HTTPS to connect to the source site.
- Protect the source API against unauthorized access.
- Restrict access to running Artisan commands.
- Avoid running `clear` on production data without a backup.
- For file downloads, restrict the allowed domains; retrieving arbitrary URLs from the API can create the risk of unintended access to internal server resources.
- For large files, check memory limits, execution time, and disk space.

## 14. Post-Migration Checklist

After the operation finishes, check the following items:

- [ ] The number of content groups matches the expected data.
- [ ] Product categories have been created correctly.
- [ ] Posts have been transferred with the correct title, slug, and content.
- [ ] The association of posts with groups is correct.
- [ ] Post tags have been transferred.
- [ ] Featured images of posts are visible.
- [ ] Products have the correct name, description, and price.
- [ ] Product SKU and inventory have been transferred correctly.
- [ ] Product images and galleries are visible.
- [ ] The association of products with categories is correct.
- [ ] The required redirects have been created.
- [ ] Old and new URLs have been reviewed from an SEO perspective.
- [ ] Laravel and server error logs have been checked.
- [ ] Incomplete or undownloaded media files have been identified.
- [ ] Backups of the source and target have been retained.
- [ ] Sensitive or operational data has been reviewed after the migration.

## 15. Summary

To migrate data from WordPress and WooCommerce to xShop, first install and activate the `xshift` plugin on the source site. Then, in the xShop project folder, run the migration operations in the order of groups, categories, posts, and products.

Sample commands:



```bash
php artisan xshift group https://wp.example.com/
php artisan xshift category https://wp.example.com/
php artisan xshift post https://wp.example.com/
php artisan xshift product https://wp.example.com/
```

If the target tables already contain data, the corresponding operation stops. In this situation, before any clearing, create a backup and review the effect of the `clear` operation on the existing data.

Finally, do not evaluate the success of the data transfer solely based on the commands having finished; also verify the images, record relationships, redirects, and the correctness of the store data in the target environment.