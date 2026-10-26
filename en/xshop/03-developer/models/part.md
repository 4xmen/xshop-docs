# Part

The `Part` model is used to store settings and references to reusable components in the site's theming system. Each record specifies which Theme Part should be loaded from which Segment and in what order. It can also be associated with an `Area` or assigned a custom Theme for a specific entity.

In this architecture, **Segment specifies the type or placement of a theme component, while Part specifies which implementation of that component to use.**

## `parts` table structure

| Field | Type | Nullable | Description |
|---|---|---|---|
| `id` | BIGINT UNSIGNED | No | Record ID |
| `area_id` | BIGINT UNSIGNED | Yes | ID of the associated Area, if any |
| `segment` | VARCHAR(255) | No | Segment name, such as `footer` or `menu` |
| `part` | VARCHAR(255) | No | Name of the Theme Part to use, such as `AplMenu` or `WaveFooter` |
| `data` | LONGTEXT | No | Additional JSON data associated with the Part; defaults to an empty JSON array |
| `sort` | INT | No | Order in which the Part is displayed or loaded; defaults to `0` |
| `custom` | VARCHAR(255) | Yes | Identifies a custom Theme associated with a specific entity |
| `created_at` | TIMESTAMP | Yes | Creation time |
| `updated_at` | TIMESTAMP | Yes | Last update time |

## The concepts of Segment and Part

### `segment`

The Segment name specifies the category or Segment path from which the theme component is selected. For example:

- `menu`
- `footer`

This value corresponds to the Segment directory structure in the theming system.

### `part`

Specifies which implementation of a Segment to use. For example:

- `AplMenu` for a menu
- `WaveFooter` for a footer

As a result, multiple Theme Parts can exist for a single Segment, and the value of `part` determines which one is used.

## Custom Theme for entities

### `custom`

This field is used to specify a custom Theme for a specific entity; for example, assigning a dedicated Landing Page to a group or another entity.

In this case, Part settings can be associated with that entity's custom Theme instead of relying solely on the site's general settings.

This capability makes it possible to create a custom appearance for an entity. How this Theme is identified and loaded depends on the theming system's implementation logic.

## Additional data

### `data`

The `data` field is intended to store additional JSON data associated with the Part. It can hold information required when registering or loading the Theme Part.

So far, according to the project description, this field has not been used in practice. However, it could be used in the future for capabilities such as storing additional data or information related to updating the preview image.

### `sort`

Specifies the order in which Parts are placed. This field makes it possible to determine the order in which theme components are used.

## Database notes

- The `data` field has a `CHECK (json_valid(data))` constraint; therefore, the stored value must be valid JSON.
- The `area_id` field has no foreign key in the provided SQL; its relationship with `Area` is not enforced by this database definition.
- The `custom` field is nullable; therefore, not all Parts are necessarily associated with a custom Theme.
- The table does not define a uniqueness constraint for the combination of `area_id`, `segment`, `part`, and `custom`; therefore, the uniqueness of such a combination cannot be inferred from the SQL structure.

## Methods and relationships

### `getBladeWithData($item = null)`

This method returns the Blade template path and the data required to render the Theme Part.

It first constructs the class for the Part using the value of `part`, then calls the static `onMount()` method on that class. The result is returned as an array with two keys:

- `blade`: The template path, in the form `segments.{segment}.{part}.{part}`
- `data`: The data returned by the `onMount()` method.

The `$item` parameter is optional and is used when preparing the Part's data depends on the current page entity.

For example, a footer Part might prepare its required data without receiving an external entity. By contrast, a product grid or gallery image Part can receive the current entity to prepare the appropriate data for display.

### `getBlade()`

This method constructs the class for the Part using the value of `part`, calls the static `onMount($this)` method, and returns the Blade path in the form `segments.{segment}.{part}.{part}`.

Unlike `getBladeWithData()`, this method does not include the `onMount()` result in its return value.

### `area()`

Establishes a `belongsTo` relationship with the [Area](area.md) model and returns the Area associated with this Part.

### `getAreaNameAttribute()`

Provides the computed `area_name` attribute:

- If `area_id` has a value, returns the name of the associated Area through `$this->area->name`.
- Otherwise, returns the value of the `custom` field.

## Usage in a Blade template

When rendering Parts, `getBladeWithData()` is first called, and the resulting template path and data are then passed to `@include`:

```php
@php($p = $part->getBladeWithData($gallery))
@include($p['blade'], ['data' => $p['data']])
```

In this example, the `$gallery` entity is passed to the Part so that, if needed, `onMount()` can prepare data associated with it.

For Parts that do not depend on the current entity, the parameter is omitted:

```php
@php($p = $part->getBladeWithData())
@include($p['blade'], ['data' => $p['data']])
```

This pattern is also used for general components, such as the default header and footer.

**Architectural note:** Each Theme Part can have its own appearance and internal settings and, if needed, can also receive data related to the current entity. This separates the theme component's appearance logic from the content data it displays.