# xController Documentation

## What Is xController?

`xController` is a base and generic controller in xShop designed to reduce repetitive (Boilerplate) code and simplify the implementation of CRUD operations. This tool generates much of the initial structure for controllers, forms, and admin-panel listings so that developers can focus on the custom logic of each model.

> Note: `xController` is intended for use in the admin panel and is not meant to create generic controllers for the public-facing part of the site.

## 1. Creating an xController

First create the model and its migration in the usual Laravel way. Before running the command, specify props such as `SoftDeletes` and any other model requirements, because the generated code is based on the existing model structure.

Then run:

```bash
php artisan make:xcontroller {model}
```

For example, if your model is `Category`, run:

```bash
php artisan make:xcontroller Category
```

This command creates the following files:

- Controller: in `app/Http/Controllers/Admin/`
- Views: in `resources/views/admin/{model_name}`, including list and form files
- Save Request: in `app/Http/Requests/` for defining validation rules

After the files are generated, review the code and complete it according to your model's needs.

## 2. Configuring the Controller

Next we examine the main sections of a controller built on `xController`. The example below is taken from the category controller.

```php
class CategoryController extends XController
{
    protected $cols = ['name', 'subtitle', 'parent_id'];
    protected $extra_cols = ['id', 'slug', 'image'];
    protected $searchable = ['name', 'subtitle', 'description'];
    protected $with = ['parent'];

    protected $listView = 'admin.categories.category-list';
    protected $formView = 'admin.categories.category-form';

    protected $buttons = [
        'edit' => [
            'title' => 'Edit',
            'class' => 'btn-outline-primary',
            'icon' => 'ri-edit-2-line',
        ],
        'show' => [
            'title' => 'Detail',
            'class' => 'btn-outline-light',
            'icon' => 'ri-eye-line',
        ],
        'destroy' => [
            'title' => 'Remove',
            'class' => 'btn-outline-danger delete-confirm',
            'icon' => 'ri-close-line',
        ],
    ];

    public function __construct()
    {
        parent::__construct(
            Category::class,
            CategorySaveRequest::class
        );
    }
}
```

Primary props usage:

| Prop | Purpose |
| --- | --- |
| `$cols` | Columns displayed in the list, in the order defined |
| `$extra_cols` | Additional fields required by the system that do not need to appear in the list; e.g., `slug` |
| `$searchable` | Fields that are searchable |
| `$with` | Model relationships that should be eager-loaded with records; e.g., `parent`, to reduce extra queries |
| `$listView` | Path to the list view |
| `$formView` | Path to the create/edit form view |
| `$buttons` | Definition of list operation buttons, such as edit, detail, and delete |

Props like `$_MODEL_` and `$SAVE_REQUEST` appear as comments in some controllers; in the example above, the model and request are passed to the base class via the constructor.

## 3. Core Controller Methods

### `save()`

Implements the logic for persisting model data. Assigning fields, generating a `slug`, storing files, and other model-specific operations are the developer's responsibility.

Typically the saved model should be returned at the end. Also pay attention to validation in the Save Request.

### `create()` and `edit()`

These methods display the create and edit forms. If needed, you can also pass auxiliary data to the view—for example, a list of categories for selecting a parent category.

### `update()`

In the example, the update operation is delegated to `bringUp()` in the `XController` mechanism. If you need different behavior, customize this method.

### `destroy()`

Handles record deletion. If business constraints exist—such as a category being used in settings or menus—check those constraints first before performing the deletion.

### `bulk()`

Used for batch operations on multiple records. The example includes bulk delete and restore actions. To add operations like bulk activation, add the corresponding option to the view and implement its logic in the controller.

### `restore()`

Restores soft-deleted records and is typically used with models that support `SoftDeletes`.

### Custom Methods

Methods such as `sort()` and `sortSave()` are part of the example controller's custom logic for ordering records. These methods are not required in every controller.

> To better understand the capabilities provided by `XController`, review the existing controllers in the project, especially the methods defined in the base class.

## 4. Editing the Save Request

The Save Request file defines validation rules for incoming data. Tailor these rules to your model and ensure they work correctly for both creating a record (`store`) and updating it (`update`).

For unique fields, the current record's identifier, files, and optional fields, the create and edit rules may differ.

## 5. Customizing Views

The generated Blade files are starting points that you can modify to suit your needs.

### List View

This view usually extends the generic admin-panel list template:

```php
@extends('admin.templates.panel-list-template')
```

Key sections include:

- `list-title` and `title`: list title
- `filter`: custom filters
- `bulk`: batch operation options
- `list-foot`: additional content at the bottom of the list, such as a sort button

Filters and batch operations must align with the expectations of `XController`; merely adding a field or option to Blade does not create the corresponding server-side logic.

### Form View

This view typically extends the generic admin-panel form template:

```php
@extends('admin.templates.panel-form-template')
```

Develop the form according to your model's requirements. Usually you have two main sections:

- Sidebar: for help text, tips, and auxiliary information
- Main form: for input fields and editing data

Populate previous values with `old()` and the model's data, and display validation error messages as needed.

To simplify form building, you can use the [Laravel Form Builder](<https://github.com/4xmen/laravel-form-builder>) package.

## 6. Automatic Translation Capability

In models that support the system's multilingual feature, an automatic translation button may be added to the list of actions; therefore, its absence from the `$buttons` array does not necessarily mean the feature is disabled.

## Final Notes

- Complete the model's structure and requirements before generating a controller.
- Review validation, access permissions, and delete constraints for the model.
- For customization, first study similar examples in the project.
- To fully understand the generic behavior, refer to the implementation of the base `XController` class; this documentation is based on the `CategoryController` example.