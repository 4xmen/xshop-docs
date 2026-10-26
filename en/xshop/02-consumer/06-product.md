# Product Management Guide

This guide explains how to create and edit a product in the admin panel. The product form is designed as a four-step wizard so that basic information, images, additional details, and product inventory can be managed in separate sections.

Some information in this form is interdependent; for example, a product's inventory count can be calculated from the options defined in Properties Meta. Attachments can also be made available to everyone or exclusively to customers who have purchased the product.

## Overview of the Steps


Step 1 - Basic Data  
Product name and URL, price, main category, creators, description, SEO keyword, and product-specific template settings.

Step 2 - Medias  
Upload product images, select the featured image, and manage gallery images.

Step 3 - Additional Data  
Inventory, publication status, tags, other categories, virtual or downloadable product settings, specification table, discounts, attachments, and Schema Markup.

Step 4 - Quantities  
Define different product options based on features such as color or storage capacity, along with the quantity and price of each option.

## Step 1: Basic Product Data
![product1.webp](../../../images/product1.webp)
Image reference: Fourth submitted image - Basic Data form

Enter the product's main information in this step. This information is used on the product page, in search and categories, and in SEO-related sections.

### Basic Information Fields

| Field                 | Description                                                                                                            |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| Name                  | The product name displayed to customers.                                                                               |
| Slug                  | The text identifier used in the product URL. If the form supports it, you can leave this blank to have it generated automatically. |
| Base price            | The product's base price. For products with quantity options, the price can be calculated from those options.          |
| Purchase price        | The product's purchase price, used to calculate the gross profit margin.                                               |
| Creators              | Creators, brands, or people associated with the product.                                                               |
| Main product category | The product's main category.                                                                                            |
| SKU                   | The product's inventory identifier; it must be unique if provided.                                                      |
| Status                | The product's publication status: draft or published.                                                                  |
| Excerpt               | A short product summary for display in various sections of the site and for SEO-related uses.                          |
| Description Text      | The full product description, which can be edited with a Rich Text Editor.                                              |
| Keyword [SEO]         | The target keyword for SEO analysis and optimization.                                                                  |

### SEO Analysis

The product description editor includes SEO evaluation features. After you enter content and a keyword, the system can display an SEO score, suggestions for improvements, and metrics such as content length, keyword usage, average sentence length, and paragraph structure.

This evaluation can help improve content quality. However, the displayed score alone does not guarantee better search engine rankings.

### Product-Specific Template Settings

The gray button with a color-palette icon at the top of the form lets you configure a custom template for that product.

- These settings are used to customize the display of the selected product.
- Its changes are separate from the custom template settings for other products and apply only to that product.
- Use this feature when the selected product needs to be displayed differently from the site's general template.

## Step 2: Product Media and Images
![product2.webp](../../../images/product2.webp)
Image reference: Third submitted image - Medias form

This step is designed for uploading and managing product images. Images can be used in the product gallery and as the featured image.

### Uploading Images

To add an image, click the upload area or drag and drop files into it.

This section includes the following features:

- Select one or more images: You can upload multiple images at the same time.
- Featured image (Index Image): The first and/or second image can be designated as the featured image.
- Change the featured image: According to the instructions shown in the form, double-click an image to make it the featured image.
- Delete an image: Use the delete button below the relevant image.

Note: The featured image should show the product clearly and attractively, as it may appear in product listings, on the product details page, and in other sections of the site.

## Step 3: Additional Data
![product3.webp](../../../images/product3.webp)
Image reference: Second submitted image - Additional Data form

This step includes additional product settings, general inventory, categories, specifications, discounts, attachments, and structured data.

### 3.1. Product Inventory and Status

| Field          | Description                                                                                                                          |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| Stock quantity | The product's inventory count. If the product has quantity options, this value can be updated automatically from the sum of the options' inventory counts. |
| Status         | The product's inventory status. The defined values are `IN_STOCK`, `OUT_STOCK`, and `BACK_ORDER`.                                    |
| Tags           | Tags associated with the product for topic-based categorization and to help search for and retrieve content.                          |

Inventory status differs from inventory count. For example, a product may have the `IN_STOCK` status, but its inventory count must also be greater than zero for it to be considered available.

If the product has options such as color and storage capacity, configure each option's inventory in Step 4. In this case, the system can calculate the product's total inventory from the sum of the options' inventory counts.

### 3.2. Product Categories

In this section, you can also associate the product with additional categories.

- The main category is set in Step 1.
- In this section, you can select additional categories from the category tree.
- Selecting multiple categories associates the product with multiple sections of the site; the main category is still managed through its dedicated field.

### 3.3. Canonical URL

The Canonical field is used in SEO to specify the product page's canonical URL.

Use this field when you want search engines to treat a specific URL as the primary version of the content; for example, when similar content is accessible from multiple URLs.

If you do not need a custom canonical URL, leave the value unchanged.

### 3.4. Product Type: Virtual and Downloadable

Virtual product - Virtual product

Use this option for products or services that do not require physical shipping. Enabling it identifies the product as virtual.

Downloadable product - Downloadable product

Use this option for products whose purchase provides access to downloadable files, such as an e-book, a learning resource, or digital content.

These options serve different purposes and can be configured as needed for the product type.

### 3.5. Description Table

Use this section to record structured product information in a table.

Use it to display technical specifications or additional product information, such as comparison details, model information, or specifications that you want displayed in a table on the product page.

This section is managed with a Rich Text Editor, so you can adjust the table content and formatting to suit the product.

### 3.6. Discounts

You can manage product-related discounts in the Discounts section. Use the Add new discount button to add a discount.

| Field         | Description                                                                    |
| ------------- | ------------------------------------------------------------------------------ |
| Title         | The discount title, used to identify it in the admin panel.                    |
| Type          | Discount type: `PRICE` for a fixed amount and `PERCENT` for a percentage discount. |
| Amount        | The discount amount: a monetary amount for a fixed discount, or a number from zero to one hundred for a percentage discount. |
| Discount code | The discount code, which can be used in the cart for code-based discounts.     |
| Expire date   | The discount's expiration date and time. If left blank, no expiration date is set. |

The difference between fixed-amount and percentage discounts:

- A fixed-amount discount subtracts a specific amount from the price.
- A percentage discount reduces the price by a percentage.

In the system model, a discount associated with a specific product is linked to that product through `product_id`. If this field is blank, the discount is considered general and is not assigned to a specific product.

### 3.7. Product Attachments

You can add files related to the product in the Attachments section, such as a user guide, PDF, learning resource, or digital files.

Adding an attachment

Use the add button to attach the desired file to the product. Attachments can have access settings in addition to a title and file name.

Premium Attachment

The shield icon indicates that an attachment has special access. Enable the switch next to it to mark the attachment as premium.

File access works as follows:

- A guest user or a customer who has not purchased the product: Can access only non-premium attachments.
- A signed-in customer who has purchased the product: Can access both non-premium and premium attachments.

Therefore, if a file should be available only to customers who have purchased the product, mark it as a premium attachment.

### 3.8. Product Schema Markup

At the end of this step, the Markups section is available for configuring the product's Schema Markup.

Schema Markup is structured data that helps search engines better understand the content type and its information. In this section, you can define or edit the Markup template for the product.

For information about the editor, supported keywords, buttons for automatically inserting values, Syntax selection, and Reset behavior, refer to the Schema Markup editor documentation.

## Step 4: Inventory and Quantity Options
![product4.webp](../../../images/product4.webp)
Image reference: First submitted image - Quantities form

This step applies to products offered in multiple variations or combinations, such as different colors, storage capacities, or combinations of several features.

For example, a phone may be available in Rose Gold with 64 GB and 128 GB storage capacities. Each combination can have its own price and inventory count.

### 4.1. Defining Product Options

Enter the features for a product option in each row.

| Field            | Description                                                                         |
| ---------------- | ----------------------------------------------------------------------------------- |
| Color            | The color of the product option. A color input may be provided to make color selection easier. |
| Warranty         | The warranty status or type for the option.                                         |
| Internal storage | The internal storage capacity or a similar feature, depending on the specifications defined for the product. |
| Count            | The inventory count for this option.                                                |
| Price            | The price for this option.                                                         |

Use the add button to create a new option. Each row represents a specific combination of features and can have a different quantity and price.

For example:

| Color     | Storage | Count | Price |
| --------- | ------- | ----- | ----- |
| Rose Gold | 64 GB   | 1     | 3000  |
| Rose Gold | 128 GB  | 1     | 3200  |

In this example, the total inventory across the options is 2 units.

### 4.2. How Options Relate to Product Inventory

The inventory defined in this step is linked to the product's overall inventory.

According to the Product model logic, the `renewPriceAndStock()` method, when quantity options exist:

- Calculates the product's inventory count from the sum of the options' `count` values.
- Sets the product's base price based on the lowest price among options with an inventory count greater than zero.

Therefore, for products with options, carefully configure the price and inventory for each combination in this step. The product's overall inventory count can be updated automatically from this information.

Note: In the current implementation, calculating the base price depends on at least one option having a positive inventory count. If no options are in stock, check the current system logic to determine how the price behaves.


### 4.3. Where Are Features Defined?

The options available in this step depend on features defined in the feature management section and Properties Meta.

In simple terms:

- First, define features such as color, warranty, or storage capacity.
- Then, make these features available for the product.
- In Step 4, create the desired combinations and set the quantity and price for each one.

If a required feature is not available in this step, first check its definition in the feature management section.
[Properties Meta Documentation](05-props.md)

## Navigation and Publication Buttons

Navigation and publication buttons are located at the bottom of the wizard steps.

| Button  | Purpose                                                                  |
| ------- | ------------------------------------------------------------------------ |
| Previous | Return to the previous step to review or edit information.              |
| Next     | Move to the next step to continue completing the form.                   |
| Publish  | Save and publish the product according to the system's publication status and logic. |

Before final publication, review the product's basic information, images, categories, prices, inventory, and attachments. If the product has premium files, also check their access settings.

## Recommended Pre-Publication Checklist

- The product name, Slug, and main category are complete.
- The base price and purchase price have been entered correctly.
- The product description has been reviewed, and important SEO suggestions have been considered.
- Product images have been uploaded, and an appropriate featured image has been selected.
- Additional categories and tags have been configured.
- The inventory status matches the product's actual quantity.
- If quantity options are available, the price and count for each option have been reviewed.
- Discounts and their expiration dates have been checked.
- Premium attachments and file access levels have been reviewed.
- Canonical and Schema Markup have been configured if needed.

Together, these four steps cover the complete product creation and editing process, from entering initial information and images to configuring features, managing inventory, and publishing the product on the site.