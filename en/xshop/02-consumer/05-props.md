# Product Props Management Guide (Properties Meta)

## Introduction

The **Properties Meta** section is used to define and manage product props in the store. These props can be defined for any type of store, from clothing and digital goods stores to stores selling physical and virtual products.

The purpose of this section is to provide a dynamic structure for product specifications. Instead of defining fixed fields for each product type, the required props are defined through the admin panel, and the system uses them in different sections.

The defined props have three main uses:

1. **Better search:** Enable searching and filtering products based on their specifications.
2. **Inventory and price management:** Distinguish between the different sellable variations of a product based on combinations of props, while managing quantities and price differences.
3. **Product comparison:** Display and compare corresponding product specifications to help users make better choices.

### Dynamic Structure

The process for using props is dynamic. The store manager defines the required props and settings in the Properties Meta section. The system then uses these definitions to display the relevant props in product creation and editing forms, and makes searchable props available in product filters.

This structure also makes it possible to use corresponding product specifications for comparison.

Therefore, there is no need to design a dedicated form or a separate filter for every new prop. Simply define a prop that suits the store's needs and link it to the relevant categories.

## 1. Defining and Editing a Prop

In the **Properties Meta** section, you can create and manage the props required by the store.

![Prop management page](../images/props.webp)

Each prop includes general information, related categories, settings for its options, and, if needed, an icon.

### General Prop Information

| Field | Description |
|---|---|
| `Name` | The technical name used to identify the prop in the system. It must be in Latin characters and contain no spaces. |
| `Label` | The user-facing title of the prop, such as `Color`, `Size`, or `Material`. |
| `Width` | The CSS class used to determine the prop's width in the product specifications form. |
| `Required` | Specifies whether the prop must be completed when creating a product. |
| `Searchable` | Specifies whether the prop can be used for product search and filtering. |
| `Unit` | The unit displayed for the prop's value, such as `kg`, `cm`, or `Gig`, as appropriate for the product type. |
| `Type` | Specifies the input type and how the prop's value is collected. |
| `Is effective price?` | Specifies whether the prop's value affects the product pricing mechanism. |

**Note:** The `Name` value is a technical identifier and differs from the user-facing `Label`. For example, the technical name of a prop could be `material`, while its user-facing title is `Material`.

### Prop Types (Type)

The prop type determines how its value is entered and displayed in the user interface.

| Type | Purpose |
|---|---|
| `text` | Collects a text value, such as fabric type or warranty name |
| `number` | Collects a numeric value, such as weight or dimensions |
| `checkbox` | Records a selected or unselected state, such as whether an item is waterproof |
| `color` | Selects a color from a list of color options |
| `select` | Selects one option from a list |
| `singlemulti` | Selects one value for a product, while allowing multiple values to be selected in a filter |
| `multi` | Selects multiple options for a prop |
| `date` | Collects a date |
| `time` | Collects a time |

Choose an appropriate type based on the nature of the prop and its use in the store.

For example:

- In a clothing store, you can define props such as color, size, and fabric type.
- In a digital goods store, you can define memory capacity, weight, and connection type.
- In a virtual products store, you can define props such as license type, validity period, or product format.

These are only examples of how props can be used; the system is not limited to these categories.

### Prop Width (Width)

The `Width` field determines how the prop is positioned in the product specifications form.

For example, the `col-md-6` class typically occupies half the row width, while the `col-md-12` class occupies the full row width in a twelve-column Bootstrap grid.

### Required Prop (Required)

This option specifies whether the prop must be completed when creating a product.

For example, if specifying the size is required for a clothing product, you can set the size prop as required.

### Searchability (Searchable)

When this option is enabled, the prop becomes available for product search and filtering.

The system generates the relevant filters based on the defined props and their settings. Therefore, there is no need to manually design a separate filter for each prop.

### Price-Effective Prop (Is effective price?)

This option specifies whether the prop's value plays a role in determining the product price.

For example, differences in material, size, capacity, or license type may affect the price of different variations of a product.

Enabling this option does not, by itself, create a price or inventory. Information about sellable variations and their quantities and prices must also be entered as part of product management.

## 2. Linking Props to Categories (Categories)

The **Categories** section specifies which categories' products can use each prop.

![Selecting categories related to a prop](../images/props.webp)

For example, the size prop can be linked to the clothing category, and the validity period prop can be linked to the virtual products category.

To link a prop to categories:

1. Select the desired categories from the list.
2. Review your selections based on the store's category structure.
3. Save your changes after completing the other settings.

Each prop can be linked to multiple categories, and each category can use multiple props.

When creating or editing a product, the system uses the props associated with the product's primary category to determine which specifications can be entered.

## 3. Defining Prop Options

Some props require a set of defined options. In such cases, the options are defined in the section for that prop.

![Managing prop options](../images/props.webp)

Each option has two main values:

| Field | Description |
|---|---|
| `Title` | The option title |
| `Value` | The technical value or the value used for the option in the system |

For example, the size prop can have options such as `S`, `M`, `L`, and `XL`. The color prop can include different colors along with their corresponding color values.

To add an option, enter its information. To remove an existing option, use the delete control on its row.

When you finish editing, click the `Save` button to save your changes.

### Difference Between Select, Singlemulti, and Multi

- **Select:** Selects one option from a list.
- **Singlemulti:** Selects one value for a product, while allowing multiple options to be selected in a filter.
- **Multi:** Selects multiple options for the value of a prop.

The `color` type is also used to select from color options.

Choose the prop type based on the store's needs so that its input and filter behavior are appropriate.

## 4. Selecting a Prop Icon (Icon)

The **Icon** section is used to select an icon associated with a prop.

![Prop icon selection section](../images/props.webp)

An icon can help visually identify a prop. For example, you can choose a suitable icon for props related to weight, color, or other specifications.

Whether the icon is displayed in different sections depends on the user interface that uses the prop.

## 5. Using Props to Enter Specifications and Manage Inventory

After defining props and linking them to categories, the system makes the relevant props available in the product creation or editing form. This depends on the product's primary category; secondary categories have no effect.

![Example of using props in the product specifications and inventory form](../images/prop-usage.webp)

This form is generated based on the defined props. Therefore, its layout and input fields depend on the product type and the settings of its related props.

In the section for managing a product's sellable variations, you can enter different combinations of props along with information such as quantity and price.

For example, a clothing store may offer a product in different sizes and colors, with each combination having a different inventory quantity and price. A virtual products store may define different product variations based on license type or validity period.

This structure helps manage inventory and price information for different variations of a product without necessarily defining a separate base product for every combination.

**Note:** The exact way props affect price and inventory depends on the prop settings and the logic used to manage a product's sellable variations.

## 6. Displaying Props in Product Filters

Props with the `Searchable` option enabled can be made available automatically in product filters.

![Example of displaying props in product filters](../images/prop-filter.webp)

The prop type determines how its filter is displayed, for example, as a single-option selection, a multiple-option selection, or a toggle.

Users can select the values they want to narrow product results based on product specifications.

This process is dynamic: when new props are defined and linked to the relevant categories, the system can generate appropriate filters based on the prop settings. There is no need to define each filter manually.

## 7. Comparing Products

Another use of the props structure is to enable comparisons between corresponding product specifications.

By defining standard props and using them for related products, product information is structured, and corresponding specifications can be reviewed side by side.

For example, in a clothing store, you can compare the size, material, and color of products. In a digital goods store, capacity, weight, and other specifications can also be compared.

Product comparison depends on defining appropriate props and entering compatible values for related products.

## 8. Saving Changes

After defining a prop, selecting categories, configuring options, and choosing an icon, save your changes using the save button for that page.

Once saved, the system can use the props according to their settings in product creation forms, filters, and other related sections.

## 9. Recommended Procedure for Defining a New Prop

To define a new prop in the store:

1. Go to the **Properties Meta** section.
2. Create a new prop.
3. Specify its technical name and user-facing title.
4. Set its input type, width, and whether it is required.
5. If it should be available in filters, enable the `Searchable` option.
6. If the prop should affect the price, configure the relevant price option.
7. Select the related categories.
8. If needed, define the prop's options.
9. Choose an appropriate icon.
10. Save your changes.
11. Check how it works in the product creation form, filters, and other related sections.

## Important Notes

- Props can be defined for all types of stores and products; they are not limited to a specific product group.
- Product specifications forms and filters are generated dynamically based on the props and their settings.
- `Searchable` is used for search and filtering; `priceable` specifies the prop's role in determining the price.
- Linking a prop to a category specifies which group of products can use that prop.
- Defining corresponding props and entering compatible values is important for accurate product comparisons.
- After creating or editing a prop, check its behavior in the product creation form and related sections.
- Props can be reordered.