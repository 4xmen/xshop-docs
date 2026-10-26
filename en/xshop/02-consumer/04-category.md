# Category Management Guide

## Page Overview

The category editing page is used to manage information, textual content, images, the category's position in the site structure, and its display and SEO settings.

On this page, you can define the category, link it to a parent category, specify the images required by the template, and, if needed, configure the Schema Markup for the category page or its child products.

Figure 1 - Overview of the category editing page. The numbers indicate the locations of the form sections.

![category.webp](./../../../images/category.webp)

## 1. Editing the Category's Main Information

This section manages the category's main information and content.

| Field         | Purpose                                                                                                                                                 |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Category name | Specifies the category name.                                                                                                                           |
| Category slug | The text identifier used in the category page URL. According to the panel guide, if this field is empty, its value is generated automatically.           |
| Subtitle      | Specifies the category subtitle.                                                                                                                       |
| Group Parent  | Selects the parent category to place the current category in the hierarchy.                                                                             |
| Hide in menu  | Specifies whether the category should be hidden from menus that display child categories. This option alone does not mean that the category page is disabled. |
| Description   | Adds the category description. This section uses a text editor for writing and formatting content.                                                     |

The category name, subtitle, and description support multilingual content.

Note: Hiding a category from the menu is different from disabling it. This option controls its display in menus that show child categories.

> Important note: Click the gray button next to the title, which has a paint palette icon, to design a separate template for this category.

## 2. Selecting a Category Icon

In this section, you can select the category icon. The selected icon can be used to visually represent the category in parts of the site that support icons.

## 3. Feature Image

This section is for selecting the category's main image. The selected image may be displayed in lists or other parts of the site that use a feature image to represent a category.

To select an image, use the file upload option in this section.

## 4. Background Image

In this section, you can specify the category's background image. This image is available for some template layouts and may be used in the design of various parts of the site.

Whether this image is used depends on the template's design and settings.

## 5. SVG Image

This section is for selecting an image in SVG format. In some templates, an SVG image can be used alongside the feature image or in sections specifically designed for it.

Note: The feature image, background image, and SVG image do not serve the same purpose. Choose each one based on the template's requirements and the intended display location.

## 6. Category Attachments

This section manages attachments associated with the category.

The Add attachment button lets you start the process of adding an attachment. The number next to the button indicates how many attachments are displayed in this section.

Details about the types of attachments that can be added and how they are displayed depend on how attachments work in the panel.

## 7. Canonical URL

The Canonical field is used to enter the category page's canonical URL in the SEO settings.

This URL helps search engines identify the canonical version of the page, which is important when managing similar pages or URLs with identical content.

Note: Enter this value carefully. The Canonical URL should match the page you want to identify as the canonical version.

## 8. Default Schema Markup for Child Products

This section defines the Schema Markup for the category's child products - that is, the structured data intended for products associated with this category.

Schema Markup is a type of structured data that presents content information in a format search engines can understand. For example, a `Product` schema may specify a product's name, description, and price.

### How to Use

Enter the Schema Markup in the editor. You can add one or more schemas in this section; there is no limit to one schema.

For example, a schema could look like this:

```
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "%name%",
  "description": "%desc%",
  "offers": {
    "@type": "Offer",
    "price": "%price%",
    "priceCurrency": "USD"
  }
}
</script>
```

In this example, `%name%`, `%desc%`, and `%price%` are variables used to replace the corresponding product values. The system replaces the variables when the content is displayed.

The example above is only an example of a usable structure; the fields and values in each schema must be valid and appropriate for the content type and its actual information.

### Variable Insertion Buttons

Above the editor are buttons for inserting replaceable values, such as `Name`, `Description`, `Price`, and other items shown in the panel.

1. To view the guide for a variable, hover over its button. The guide displays the related value or description.
2. If you have selected part of the text in the editor, clicking a variable button replaces the selected text with the corresponding variable.
3. If no text is selected, the variable is inserted at the current cursor position.

For example, clicking the `Name` button can insert `%name%` where needed. This lets you use the appropriate variable instead of entering a fixed value directly.

### Selecting Syntax

The `Syntax` option is to the right of the variable buttons. Use it to select the code syntax in the editor. In the image, the selected value is `HTML`.

Since Schema Markup can be written in different formats, choose the format that suits the content you are entering.

## 9. Category Page Schema Markup

This section defines the Schema Markup for the category page itself, not its child products.

To define structured data for the category page, enter the relevant code in this editor. As in the previous section, you can enter multiple schemas; this section is not limited to one schema.

The buttons above the editor are also used to insert replaceable variables into the schema text. They work similarly to those in section 8:

- Hover over a button to display the variable guide.
- Select text and click a button to replace the selected text.
- If no text is selected, the variable is inserted at the cursor position.
- The system replaces the variables when the content is displayed.

In this section, the variables shown in the image include items such as `App name`, `Name`, `Subtitle`, `Description`, `URL`, and `Image`.

Difference Between the Two Schema Markup Sections

| Section                                            | Purpose                                                    |
| -------------------------------------------------- | ---------------------------------------------------------- |
| Default Schema Markup for Child Products (number 8) | Defines structured data for products associated with the category |
| Category Page Schema Markup (number 9)             | Defines structured data for the category page itself       |

Therefore, before entering code, first determine whether you want to define information for the child products or for the category page.

## Saving Changes

After completing the information and configuring the required sections, use the Save button at the bottom of the page to save your changes.

Before saving, it is a good idea to review the category name and URL, parent category, images, and content entered in the Schema Markup sections to ensure that the information matches your intended purpose.