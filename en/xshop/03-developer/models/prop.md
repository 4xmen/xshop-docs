# Prop

The `Prop` model is responsible for defining dynamic, configurable product properties. Instead of defining a separate column for each product attribute, you can define properties such as color, capacity, weight, material, water resistance, and similar attributes, then use them to record specifications, search, filter, and, when needed, determine price and inventory.

Props are associated with categories; therefore, the properties that can be recorded for a product are determined by its category. The relationship between `Prop` and `Category` is many-to-many.

## `props` table

| Field | Type | Description |
|---|---|---|
| `id` | BIGINT UNSIGNED | Prop ID |
| `name` | VARCHAR(90), unique | The technical key for the prop. It must be in Latin characters and contain no spaces, because it is used as an array key in different parts of the application |
| `label` | TEXT | The display label for the prop; translatable |
| `width` | VARCHAR(300), default `col-md-6` | CSS class for determining the prop's width and display in the user interface; Bootstrap classes are used by default |
| `required` | TINYINT(1), default 0 | Specifies whether this prop must be completed when creating a product |
| `searchable` | TINYINT(1), default 1 | Specifies whether the prop can be used in product search and filtering |
| `type` | VARCHAR(60) | The data type and input behavior of the prop |
| `unit` | TEXT, nullable | The unit for measuring or displaying the value, such as `gr` for grams or `Gig` for capacity; translatable |
| `sort` | INT UNSIGNED, nullable | The display order of props |
| `options` | LONGTEXT, nullable | Options associated with the prop type, such as a list of colors or selectable options |
| `priceable` | TINYINT(1), default 0 | Specifies whether the value of this prop affects the product price |
| `icon` | VARCHAR(128), nullable | The prop's icon name from the Remix Icon collection |
| `created_at` | TIMESTAMP, nullable | Creation time |
| `updated_at` | TIMESTAMP, nullable | Last update time |
| `deleted_at` | TIMESTAMP, nullable | Time when the prop was soft-deleted |

## Prop types (`prop_types`)

The types defined in the model are:

```php
public static $prop_types = [
    'text',
    'number',
    'checkbox',
    'color',
    'select',
    'multi',
    'singlemulti',
    'date',
    'time',
];
```

The behavior of each type is based on the system's current design:

| Type | Use |
|---|---|
| `text` | Accepts a text value |
| `number` | Accepts a numeric value |
| `checkbox` | Records a selected/unselected value |
| `color` | Selects from a list of colors |
| `select` | Selects one option from a list |
| `singlemulti` | Selects one option when recording product specifications, while allowing multiple options to be selected in the search and filter interface |
| `multi` | Selects multiple options |
| `date` | Accepts a date |
| `time` | Accepts a time |

### Difference between `select`, `singlemulti`, and `multi`

These three types differ in the number of options selected and their use:

- `select`: The user selects one option from a list.
- `singlemulti`: The value recorded for the product is one option, but multiple options can be selected in search and filtering.
- `multi`: Multiple options can be selected for the prop value.

The `color` type also works with a list of colors, but is specifically intended for displaying and selecting colors.

## Prop options (`options`)

The `options` field stores information about the options associated with the prop as JSON. In the current implementation, each option has two values: `title` and `value`.

- `title`: The option's display title.
- `value`: The value or ID used for the option.

The model provides three accessors for retrieving this information.

### `optionz`

```php
public function getOptionzAttribute()
{
    return json_decode($this->options);
}
```

Converts the JSON stored in `options` into a PHP structure. The result is a list of options, each of which can include `title` and `value`.

### `dataz`

```php
public function getDatazAttribute()
{
    $result = [];

    foreach (json_decode($this->options) as $item) {
        $result[$item->title] = $item->value;
    }

    return $result;
}
```

Converts the options into an array with the `title => value` structure.

### `datas`

```php
public function getDatasAttribute()
{
    $result = [];

    foreach (json_decode($this->options) as $item) {
        $result[$item->value] = $item->title;
    }

    return $result;
}
```

Converts the options into an array with the `value => title` structure. This structure is used to convert a stored value into its display title; for example, `fullMeta()` in the `Product` model uses `datas` to display the option title.

## Category-dependent props

### `categories()` relationship

```php
public function categories()
{
    return $this->belongsToMany(Category::class);
}
```

Each prop can be associated with multiple categories, and each category can have multiple props.

When creating or editing a product, the props associated with its primary category determine which specifications can be recorded. This relationship makes it possible to manage the required props for each product type without defining a separate, fixed structure for every category.

## How props affect price and inventory

### `priceable`

This field specifies whether a prop's value plays a role in the product price.

For example, the following attributes may affect the price of a product such as the iPhone 13 Pro Max:

- Storage capacity: 256 or 512 GB
- Device color
- Single-SIM or dual-SIM support

With this design, all these configurations can belong to a single base product, while the selected specification values distinguish the available options for sale and their prices.

This property is important alongside the product's quantity options (`Quantity`), because inventory can be recorded for specific combinations of props. For example, there may be three units in stock for one combination of storage capacity and SIM type, and only one unit for another.

**Note:** `priceable` indicates the role of the prop in the table. Review the `Quantity` implementation and order-creation code for details of price calculation and the precise relationship between prop values and inventory records.

## User interface properties

- `label`: The title shown to the user in the form.
- `width`: The CSS class used to determine the element's width in the form.
- `required`: Whether the value is required when creating a product.
- `searchable`: Whether the prop is included in product search and filtering.
- `icon`: The icon associated with the prop from Remix Icon.
- `sort`: The display order of props.
- `unit`: The unit for measuring or displaying the value.

These settings make it possible to build much of the product specifications form from prop definitions, rather than requiring changes to a fixed form or database structure for each prop.

## Translation

The following fields are translatable:

```php
public $translatable = [
    'label',
    'unit',
];
```

The technical `name` key is not translatable, because it is used to identify the prop and access its value in data structures. `label` and `unit` are intended for display to the user and can vary across languages.