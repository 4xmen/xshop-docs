# Area

Model reference · `App\Models\Area`

### 1. Model

The `Area` model is one of the core components of the system's Theme management engine. It specifies the structure of each type of site page or Area, which `segment`s it can use, and how many `theme part`s can be defined within it.

In this architecture, the site's appearance is not determined by a single unified template for all pages. Each Area can have its own structure and components; for example, the product page, product list, post page, shopping cart, and contact page each have an independent `Area`.

Some `Area`s are also intended for special purposes rather than regular pages, such as `defaultHeader`, `defaultFooter`, `preloader`, and `floats`.

To understand this model, distinguish these three main concepts:

- **Area:** An Area that defines the configurable structure of a page or section of the site, such as `product` or `products-list`.
- **segment:** The type or position of a page section where specific content or structure can be placed, such as `header`, `footer`, `slider`, or `product_grid`. The segments for this system are located in `resources/views/segments/`.
- **theme part:** A reusable Theme component that belongs to a segment and can be placed in an Area. The relationship between Areas and theme parts is managed through the `Part` model.

Therefore, `Area` specifies what is allowed to be placed in a given scope; `segment` specifies the type of position, and `theme part` is a specific implementation of that section.

### 2. Table: `areas`

| Field | Type | Nullable | Comment |
|---|---|---|---|
| `id` | bigint unsigned | No | Area ID |
| `name` | varchar(255) | No | Unique Area name |
| `max` | tinyint | No | Maximum number of permitted theme parts |
| `icon` | varchar(255) | Yes | Remix Icon name |
| `valid_segments` | longtext (JSON) | No | List of segments permitted in this Area |
| `preview` | varchar(255) | Yes | Preview View name |
| `use_default` | tinyint(1) | No | Determines whether to use the default Header and Footer settings |
| `sort` | int | No | Area display order |
| `created_at` | timestamp | Yes | Creation time |
| `updated_at` | timestamp | Yes | Last modification time |

### 3. Extra description of table fields

**`areas.name`**

Specifies the unique name of the Area. This name is used to identify the Area in the system and, because it has a `UNIQUE` constraint, no two Areas can have the same name.

Examples of Area names:

- `index` - Home page
- `product` - Product details page
- `products-list` - Product list page
- `post` - Post details page
- `posts-list` - Post list page
- `contact-us` - Contact page
- `under-construction` - Under construction page
- `product-grid` - Area specifically for displaying products in a Grid layout
- `defaultHeader` and `defaultFooter` - Areas for the default Header and Footer sections
- `preloader` - Area for the Preloader
- `floats` - Area for the site's floating components

**`areas.max`**

Specifies the maximum number of theme parts that can be placed in an Area.

This value is not the same for all Areas because each Area has different requirements. For example, in the Seeder, `max` is set to `1` for `preloader`, `1` for `product-grid`, and `10` for the home page (`index`).

In an Area such as Footer, the number of usable components can also be limited so that its structure does not exceed the specified count.

**`areas.icon`**

Stores the name of the icon used in the admin panel. These icons are selected from the Remix Icon collection and help users quickly identify Areas in the panel interface.

For example, the Seeder uses `ri-layout-grid-line` for the `product-grid` Area and `ri-loader-2-line` for `preloader`.

**`areas.valid_segments`**

Stores a list of segments that are permitted for use in this Area. This value is stored as JSON and makes it possible to define a different structure for each Area.

For example, in the Seeder, the `product` Area can use segments such as `header`, `footer`, `product`, `comments`, `ads`, and `attachments`, while the `product-grid` Area accepts only the `product_grid` segment.

This constraint means that each Area has a defined set of usable positions, and arbitrary segments cannot be placed in it without considering its definition.

The model defines a general list of known segments; however, the permitted segments for each Area are stored independently in `valid_segments`. Consequently, a segment being "known to the system" is not the same as it being "permitted in a specific Area."

**`areas.preview`**

Stores the name of the route used to preview the Area. For Areas with a defined preview, this field specifies which route should be used to display it.

For example, the Seeder sets `client.welcome` for the `index` Area, `client.products` for `products-list`, and `null` for `product-grid`.

Therefore, a preview is not required for every Area.

**`areas.use_default`**

Specifies whether the Area uses the default `defaultHeader` and `defaultFooter` structures or has its own Header and Footer.

This feature is intended to distinguish Areas that should use the site's shared components from those with their own structures.

**`areas.sort`**

Specifies the display order of the Areas. This field is used to sort Areas in the user interface or in parts of the system where their order matters.

Its default value is `0`, and a different value can be defined for specific Areas. For example, the Seeder sets `97` for `index` and `99` for `defaultHeader`. However, the value is adjusted during display to prevent conflicts with other elements.

### 4. Methods

**`getSegmentAttribute()`**

```php
public function getSegmentAttribute()
{
    return json_decode($this->valid_segments, true);
}
```

This accessor converts the JSON value stored in `valid_segments` into a PHP array so that the code can work with the list of permitted segments.

For example, if `valid_segments` has this JSON value:

```json
["header", "footer", "ads"]
```

Accessing the `segment` property returns an equivalent array:

```php
['header', 'footer', 'ads']
```

As a result, the converted value can be used in the application logic instead of processing the JSON string directly.

**`getRouteKeyName()`**


Specifies that when Laravel uses Route Model Binding for this model, it should use the `name` field instead of the default `id` field.

For example, if Route Model Binding is defined for this model, an Area can be identified by a name such as `product`. This behavior is consistent with the uniqueness of `areas.name` in the database.

**`parts()`**


Defines a `hasMany` relationship with the `Part` model. This relationship makes all theme parts associated with an Area available.

This relationship is an important part of the Theme structure because an Area can have multiple theme parts, although their number is subject to the `max` constraint and the system's management logic.

For example, this relationship can be used to retrieve the theme parts for the home page Area or the product details Area.

**`defPart()`**

```php
public function defPart()
{
    $p = $this->parts()->first();

    return 'segments.' . $p->segment . '.' . $p->part . '.' . $p->part;
}
```

This method returns a View path for directly using the theme part associated with the Area. Its primary purpose is to provide a short, reusable path for including a Theme component in other parts of the template, without having to manually specify that component's View path throughout the application.

To understand its use, consider the `product-grid` Area. It is intended to display a product in a Grid layout; that is, it provides a reusable structure for displaying a product, not necessarily a standalone page with a complete Header and Footer.

In the following example, the products related to the current product are first retrieved, and then the View for the `product-grid` Area is included for each product:

```php
@foreach(\App\Models\Product::whereIn('id', $product->relatedProduct())->get() as $p)
    <div class="item">
        @include(
            \App\Models\Area::where('name', 'product-grid')->first()->defPart(),
            ['product' => $p]
        )
    </div>
@endforeach
```

In this example, the code does not directly specify the file path of a particular template. Instead, it finds the Area named `product-grid`, and `defPart()` returns the View path for its first `Part`. That View is then included for each product with the `product` variable.

The advantage of this approach is that the place where the product is used in the template does not depend on a hard-coded file path. Instead, it follows the Theme definition in the system. As a result, if the theme part associated with this Area changes, the consuming code will continue to use the path obtained from the Area itself.

It is important to note that `defPart()` selects only the first associated `Part`; it does not render all of the Area's theme parts, and the logic for selecting the first item is defined in this method. The final View path is also constructed from the `segment` and `part` values of that record.