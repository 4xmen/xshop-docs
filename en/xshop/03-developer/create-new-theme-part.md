# Theme Part Creation Guide

## 1. Introduction

In xShop, a **Theme Part** is an independent section of the website theme that can be placed in various locations of the user interface, and whose appearance and behavior can be developed to suit the needs of the project.

For example, you can create Theme Parts for displaying the latest products, a slider, a list of categories, a contact form, or the website header or footer.

Each Theme Part can include the following files:

- **PHP:** To define the behavior and lifecycle of the Theme Part
- **Blade:** To implement the HTML structure and display data
- **SCSS:** To define styles
- **JavaScript:** To add interactive behavior
- **Screenshot:** To display a preview of the Theme Part in the admin panel

This structure helps you develop different sections of the theme independently of one another, reuse them in different places, and give the administrator control over the settings of each section according to the needs of the website.

> **Recommendation:** Develop and test Theme Parts in the development environment, and move the changes to the production environment after review and preparation.

## 2. Choosing the Right Segment

Each Theme Part belongs to a **Segment**. A Segment determines the type and general purpose of the Theme Part, and specifies in which parts of the theme that section can be used.

The main folder of Segments is located at the following path:



```text
resources/views/segments
```

Before creating a Theme Part, first determine its purpose, and then choose the Segment that matches it.

### 2.1. List of Default Segments

The table below introduces the Segments available in the current project structure and their typical purposes.

| Folder Name | Purpose |
| --- | --- |
| `attachment` | Displaying a single attachment |
| `attachments` | Displaying the attachments related to a model |
| `attachments_page` | The page listing the website's attachments |
| `card` | Sections related to the cart or shopping cart |
| `categories` | Displaying the list of product categories |
| `category` | Displaying a single product category |
| `clip` | Displaying a specific clip |
| `clips` | Displaying a collection of clips in different sections of the website |
| `clips_page` | The standalone page listing clips |
| `comments` | Displaying the comments of a model |
| `compare` | Displaying product comparison |
| `contact` | The contact us page |
| `creator` | Displaying an author or creator |
| `customer` | The customer panel section |
| `floats` | Floating sections of the website |
| `footer` | Types of footers |
| `galleries` | Displaying the list of image galleries |
| `galleries_page` | The standalone page listing galleries |
| `gallery` | Displaying a single image gallery |
| `group` | Displaying a specific group |
| `groups` | Displaying a collection of groups |
| `header` | Types of headers |
| `index` | Components usable on the home page |
| `invoice` | Displaying an invoice |
| `login` | The user login page |
| `menu` | Types of menus |
| `other` | Other sections of the website |
| `parallax` | Sections with a parallax effect |
| `post` | Displaying a specific post |
| `posts` | Displaying a collection of posts |
| `posts_page` | The standalone page listing posts |
| `preloader` | Types of preloaders |
| `product` | Displaying a specific product |
| `product_grid` | Displaying a product in card or product grid format |
| `products` | Displaying a collection of products in different sections of the website |
| `products_page` | The standalone page listing products |
| `register` | The user registration page |
| `slider` | Types of sliders |
| `top` | Common sections at the top of the website |
| `under` | The page or section for maintenance mode |

> This table shows the typical purposes of Segments. To confirm the permitted usage locations and the conventions of each Segment, also review the existing project structure.

### 2.2. Segment Selection and Naming Pattern

One important point in choosing a Segment is the difference between **displaying a collection of content in a section of a page** and **displaying a standalone page for listing content**.

In naming Segments, the following pattern is usually applied:

- Singular name, such as `clip` or `product`: Displaying a specific piece of content
- Plural name, such as `clips` or `products`: Displaying a collection of content that can be used in different sections of the website
- Plural name with the `_page` suffix, such as `clips_page` or `products_page`: A standalone page listing content

For example, if you want to display the latest clips on the home page, the appropriate Segment is usually `clips`, even if the data is retrieved with a custom Query.

However, if you want to create a standalone page for displaying the clip archive, you must use the Segment for `clips_page`.

| Need | Suggested Segment |
| --- | --- |
| Displaying a specific clip | `clip` |
| Displaying the latest clips on the home page | `clips` |
| Displaying popular clips in a section | `clips` |
| Displaying the clip archive on a standalone page | `clips_page` |
| Displaying a specific product | `product` |
| Displaying suggested products in a section | `products` |
| Displaying the main product list | `products_page` |
| Displaying a specific post | `post` |
| Displaying the latest posts on the home page | `posts` |
| Displaying the post archive | `posts_page` |

**Important note:** A Segment usually determines the purpose and usage location of a Theme Part, not its Query or the method of retrieving its data. Therefore, two Theme Parts with different data, such as the latest products and suggested products, can both be placed in the `products` Segment.

This pattern is a naming guideline and must be aligned with the actual conventions of the project.

### 2.3. Can a New Segment Be Created?

Yes. If needed, you can create a new Segment; however, adding a folder alone is not enough.

You must also define the permitted usage locations of the new Segment in the settings related to `Area`.

For more information, read the following document: [area.md](models/area.md)

In this document, review the `valid_segments` section and add the new Segment to the list of permitted values according to the project's defined structure.

Before creating a new Segment, check whether one of the existing Segments already covers your need. Avoid creating duplicate or overly specific Segments unless they have a clear functional difference.

### 2.4. The default-assets Folder

The `default-assets` folder is used to store the default assets used by Theme Parts and is not itself considered a Segment.

During development, review the structure of the existing assets to determine which files are shared and which are specific.

## 3. Creating a Theme Part

After choosing a Segment, choose an appropriate name for the Theme Part.

To create a Theme Part, use the following command:



```bash
php artisan make:part {part} {segment}
```

The command parameters are as follows:

- `part`: The name of the Theme Part
- `segment`: The name of the desired Segment

For example, to create a section for displaying the latest products in the `index` Segment, run the following command:



```bash
php artisan make:part LatestProducts index
```

In this example:

- `LatestProducts` is the name of the Theme Part.
- `index` is the chosen Segment.

The command creates the Theme Part files in the folder of the chosen Segment.

After the command runs successfully, you will have five main files.

## 4. Theme Part File Structure

| File | Purpose |
| --- | --- |
| `PartName.php` | Defines the behavior and lifecycle of the Theme Part |
| `PartName.blade.php` | Defines the HTML structure and content display |
| `PartName.scss` | Defines the styles |
| `PartName.js` | Defines interactive behavior |
| `screenshot.webp` | The preview image of the Theme Part |

In this table, `PartName` is the name of the Theme Part and must be replaced with the actual file names.

### Suggestion for Starting Development

If your intended design is complex, it is better to first prepare its visual structure, and once the design is finalized, move the HTML, style, and JavaScript code into the Theme Part files.

Before starting development, make sure a similar Theme Part does not already exist. If a similar section exists, duplicating it and modifying the new version is usually faster and more consistent with the project structure.

## 5. The PHP File: Defining Theme Part Behavior

The PHP file is where the behavior of the Theme Part and its interaction with the system's settings and data are defined.

In this file, you can create the required settings when the Theme Part is added, prepare the data needed for display, and clean up the related resources when it is removed.

The following sample is taken from the existing project structure:



```php
class MeloContact
{
    public static function onAdd(Part $part = null)
    {
        $setting = new Setting();
        $setting->section = 'theme';
        $setting->key = $part->area_name . '_' . $part->part;
        $setting->value = Group::first()->id;
        $setting->type = 'GROUP';
        $setting->size = 6;
        $setting->title = $part->area_name . ' ' . $part->part;
        $setting->save();

        $setting = new Setting();
        $setting->section = 'theme';
        $setting->key = $part->area_name . '_' . $part->part . '_title';
        $setting->value = __('Contact us');
        $setting->type = 'TEXT';
        $setting->size = 6;
        $setting->title = $part->area_name . ' ' . $part->part . ' title';
        $setting->save();
    }

    public static function onRemove(Part $part = null)
    {
        Setting::where(
            'key',
            $part->area_name . '_' . $part->part
        )->first()?->delete();

        Setting::where(
            'key',
            $part->area_name . '_' . $part->part . '_title'
        )->first()?->delete();
    }

    public static function onMount(Part $part = null)
    {
        return $part;
    }
}
```

In this sample, three methods are used: `onAdd`, `onRemove`, and `onMount`.

### 5.1. The onAdd Method

The `onAdd` method runs when the Theme Part is added and is used to perform its initial operations.

One of the main uses of this method is to create settings that the website administrator can change through the admin panel.

In the sample above, two settings are created.

**First setting: Selecting a group**



```php
$setting->key = $part->area_name . '_' . $part->part;
$setting->value = Group::first()->id;
$setting->type = 'GROUP';
```

This setting is used to select a group. Its initial value is the ID of the first existing record in the `Group` model.

If no group exists in the system, the expression `Group::first()->id` can cause an error. If the groups table may be empty, you must handle this situation.

**Second setting: Section title**



```php
$setting->key = $part->area_name . '_' . $part->part . '_title';
$setting->value = __('Contact us');
$setting->type = 'TEXT';
```

This setting creates a text value for the section title. Its initial value is `Contact us`, defined using Laravel's translation function.

The `size` and `title` properties also specify the information related to the setting.

To learn about the types of settings that can be used, read the following document:

Settings Documentation

### 5.2. Naming Setting Keys

The key of each setting must be unique and identifiable so that it does not conflict with the settings of other Theme Parts.

In the sample above, the setting key is built from a combination of the Area name and the Part name:



```php
$part->area_name . '_' . $part->part . '_title'
```

To define multiple settings in a Theme Part, use meaningful suffixes:



```php
$part->area_name . '_' . $part->part . '_title'
$part->area_name . '_' . $part->part . '_description'
$part->area_name . '_' . $part->part . '_limit'
```

This pattern improves code readability and reduces the likelihood of key conflicts.

When cloning a Theme Part, be sure to check the setting keys; leftover keys from the original version may cause two sections to be connected to a shared setting.

### 5.3. The onMount Method

The `onMount` method is used to perform required operations when the Theme Part is loaded or prepared. The exact time it is called depends on the internal implementation of xShop.

In this section, you can prepare the data needed for display or modify the input data.

Example:



```php
public static function onMount(Part $part = null)
{
    return $part;
}
```

This sample returns the same `Part` object and makes no changes to it.

If the Theme Part needs computed or processed data, you can place the related logic in this section, provided it is compatible with the project's method-calling convention.

**Performance notes:**

- Avoid running unnecessary Queries.
- Avoid heavy processing on every page load.
- Optimize the retrieval of multiple data items as much as possible.
- Keep business logic separate from the Blade template as much as possible.

### 5.4. The onRemove Method

The `onRemove` method is used to clean up the resources related to the Theme Part when it is removed.

For example, if you created settings in `onAdd`, you must delete the settings related to that same Theme Part in `onRemove`.

In the sample above, the two created settings are deleted:



```php
Setting::where(
    'key',
    $part->area_name . '_' . $part->part
)->first()?->delete();
```

And:



```php
Setting::where(
    'key',
    $part->area_name . '_' . $part->part . '_title'
)->first()?->delete();
```

The `?->` operator ensures that if no record is found, the `delete()` method is not called on a `null` value.

**Key principle:** Every resource you create when the Theme Part is added must also be cleaned up when it is removed, if necessary.

### 5.5. The Theme Part Lifecycle

Lifecycle methods must be defined according to the internal conventions of xShop. Before renaming methods or adding a new method, review how they are called in the system core and in existing Theme Parts.

## 6. The Blade File: Structure and Content Display

The `PartName.blade.php` file is where the HTML structure and the content display of the Theme Part are defined.

In this file, you can use Blade features, the project's helper functions, and the Vue.js components supported by the system.

A Theme Part can have static content or retrieve the data it needs dynamically from the system.

### 6.1. Sample: Displaying the Latest Products

In the example below, four active and recent products are retrieved, and each product is displayed using the Theme Part for `product_grid`.



```blade
<section
    class="LatestProducts live-setting"
    data-live="{{ $data->area_name . '_' . $data->part }}"
>
    {{-- use gfx variables --}}
    <div class="{{ gfx()['container'] }}">
        <h1>
            {{ __('Latest products') }}
        </h1>

        <div class="row">
            {{-- get productus from db --}}
            @foreach(
                \App\Models\Product::where('status', 1)
                    ->orderByDesc('id')
                    ->limit(4)
                    ->get() as $product
            )
                <div class="col-lg-3 col-md-6">
                    <div class="product-item">
                        {{-- use product grid default theme part --}}
                        @include(
                            \App\Models\Area::where('name', 'product-grid')
                                ->first()
                                ->defPart(),
                            compact('product')
                        )
                    </div>
                </div>
            @endforeach
        </div>

        <div class="p-4 text-center mt-2">
            {{-- Use helper function to get all product page --}}
            <a href="{{ productsUrl() }}" class="btn btn-secondary">
                {{ __('All products') }}
            </a>
        </div>
    </div>
</section>
```

### 6.2. Explanation of the Sample's Components

**The****`live-setting`****class and the****`data-live`****attribute**



```blade
<section
    class="LatestProducts live-setting"
    data-live="{{ $data->area_name . '_' . $data->part }}"
>
```

These two items are used to connect the Theme Part to the live editing mechanism.

The `live-setting` class helps the system identify the target section, and the `data-live` attribute specifies the identifier related to the settings of that section.

In this sample, the value of `data-live` is built from a combination of the Area name and the Part name.

When the website administrator selects the desired section through the live editing interface, the system must be able to associate it with the settings of that same Theme Part.

> **Important note:** Do not remove or change the `live-setting` class and the `data-live` attribute without reviewing the system's internal mechanism; doing so may break the live editing functionality.

**Using the****`gfx()`****function**



```blade
<div class="{{ gfx()['container'] }}">
```

This function is used to retrieve the design classes used by the project and helps align the section's structure with the design system.
See the documentation: [Using GFX](../02-consumer/10-gfx.md) and [GFX model](models/gfx.md)
**Retrieving products**



```php
\App\Models\Product::where('status', 1)
    ->orderByDesc('id')
    ->limit(4)
    ->get()
```

This Query sorts active products by ID from newest to oldest and retrieves a maximum of four products.

In a real project, if possible, separate the data retrieval logic from the template to make maintenance and optimization easier.

**Reusing another Theme Part**



```blade
@include(
    \App\Models\Area::where('name', 'product-grid')
        ->first()
        ->defPart(),
    compact('product')
)
```

In this section, the default Theme Part for displaying the product card is found and used in the current template by passing the `product` variable.

This method prevents code duplication and makes it possible to reuse existing design components.

Note that the existence of the target Area and the variables required by the target Theme Part must be guaranteed.

**Link to view all products**



```blade
<a href="{{ productsUrl() }}" class="btn btn-secondary">
    {{ __('All products') }}
</a>
```

In this sample, the `productsUrl()` function returns the address of the products page, and the `__()` function is used to translate the text.

### 6.3. Important Notes in Blade Development

- Use appropriate naming for CSS classes.
- Use the project's helper functions and shared components as much as possible.
- Define user-visible text using the project's translation mechanism.
- Avoid repeating similar Queries on a single page.
- When using `first()`, consider whether the target record exists.
- Pass the variables required for `@include` explicitly.
- Keep the HTML structure consistent with the existing design system.

## 7. The SCSS File: Defining Styles

The `PartName.scss` file is used to define the specific styles of the Theme Part.

In this file, you can define styles related to the HTML structure, spacing, colors, typography, responsiveness, and interactive states.

For example:

scss

```
.LatestProducts {
    .product-item {
        height: 100%;
    }

    .product-title {
        margin-bottom: 0.75rem;
    }
}
```

This code is a sample of an SCSS structure and must be aligned with the actual classes of the theme.

### 7.1. Suggested Styling Principles

- Keep styles within the scope of the Theme Part's dedicated class as much as possible.
- Avoid unintentionally changing the styles of the website's global elements.
- Use the variables and design tools defined in the project.
- Check the behavior of the section at different screen sizes.
- Consider both right-to-left (RTL) and left-to-right (LTR) modes.
- Before defining a new variable, check whether a similar variable already exists in the project.

## 8. The JavaScript File: Adding Interactive Behavior

The `PartName.js` file is used to add interactive behavior to the Theme Part.

The JavaScript code of this section must be written according to the project's script loading and execution mechanism.

For example:

javascript

```
window.addEventListener('load', function () {
    // your code of Theme Part
});
```

This example shows that the code inside the `load` event is executed.

### 8.1. Important JavaScript Notes

- Avoid defining duplicate variables and Event Listeners if the section is reloaded.
- If the Theme Part is re-rendered during the live editing process, check the lifecycle of creating and removing Event Listeners.
- Manage JavaScript dependencies according to the project's standards.
- Avoid accessing DOM elements before they are ready.
- After changing JavaScript, perform the steps for building client-side assets.

## 9. The screenshot.webp File: Theme Part Preview

The `screenshot.webp` file is the preview image of the Theme Part, which helps the administrator recognize its appearance when selecting or managing theme sections.

After completing the design:

1. Take a suitable image of the designed section.

2. Place the image with the name `screenshot.webp` in the location expected for the Theme Part.

3. Verify that it is displayed correctly in the admin panel.

The preview image should represent the actual appearance of the Theme Part as closely as possible.

## 10. Reusing and Cloning a Theme Part

Before starting development, review the existing Theme Parts.

If a similar Theme Part exists, it is usually better to duplicate its folder and modify the new version to suit your needs, rather than starting from scratch.

### 10.1. Cloning Steps

1. Duplicate the folder of the similar Theme Part in the relevant Segment.

2. Change the file names and the PHP class to match the new Theme Part.

3. Check the setting keys and modify them if necessary so that they do not conflict with the original version.

4. Modify the Blade, SCSS, and JavaScript files according to the new requirements.

5. Update the preview image.

6. If necessary, rebuild the Autoload of PHP classes.

7. Prepare the front-end assets according to the project's procedure.

8. Test the new Theme Part in the development environment.

### 10.2. Important Notes When Cloning

- The PHP class name must be consistent with the project's naming structure.
- Check the file names and related references.
- The setting keys of the new version must not unintentionally be shared with the original version.
- Remove unnecessary dependencies.
- Check the live setting functionality.
- If the names or structure of classes change, update the Autoload.

## 11. Building Front-End Assets and Preparing the Project

### 11.1. The Client Asset Generator Command

To collect and prepare front-end changes, the following command is used:



```bash
php artisan client
```

This command is used to prepare client-side assets in the current project structure, and it must have been run at least once before you start working with the system.

After making changes to the site's Theme, running this command and performing the necessary steps for building assets (Assets Build) is also required.

> **Recommendation:** Preferably perform these processes in the development environment, and then move the verified output to the production environment according to the project's deployment process. The goal is to separate the design and preparation stages from the Production runtime environment; it is not that these commands are inherently unreliable.

### 11.2. Adding npm Dependencies

If your Theme Part needs a new npm package, add the dependency according to the project's structure and package management procedure.

Before installing a new package, review the existing dependencies to avoid installing similar libraries multiple times.

After adding the dependency, perform the necessary steps for installing and building assets according to the project's procedure.

### 11.3. Updating Composer Autoload

After adding a new Theme Part and before using it in a deployed environment, run the following command if necessary:



```bash
composer dump-autoload
```

This command rebuilds the Autoload information of PHP classes in Composer.

Running it alone does not replace the other Build steps, Cache clearing, or project deployment; perform the necessary steps according to the xShop release procedure.

## 12. Important Notes During Development

### 12.1. RTL and LTR Compatibility

A Theme Part must have an appropriate appearance and behavior in both right-to-left and left-to-right modes.

Check items such as icon direction, spacing, text alignment, element positions, and animations in both modes.

### 12.2. Performance and Efficiency

- Avoid heavy and unnecessary Queries in the template.
- Control the number of database requests.
- Keep JavaScript and SCSS files as optimized as possible.
- Manage images and external resources with regard to page performance.
- Check the behavior of the Theme Part on different pages.

### 12.3. Live Settings

When developing a Theme Part, maintain its connection to the live editing mechanism.

If you use the project's existing pattern, the `live-setting` class and the `data-live` attribute must be defined according to the system's convention.

In this document's sample, the value of `data-live` is built from a combination of the Area name and the Part name. When cloning, check its value against the identifier of the new Theme Part.

### 12.4. Final Review

After completing development, check the following items:

- Correct display of the Theme Part in the intended location
- Correct functioning of the settings in the admin panel
- Live editing functionality
- Correct loading of the required resources
- RTL and LTR compatibility
- Behavior at different screen sizes
- No errors in the browser Console and Laravel logs
- No conflicts with other Theme Parts

## 13. Final Checklist

Before delivering or publishing the Theme Part, check the following items:

- [ ] The appropriate Segment has been chosen.
- [ ] Creation of a duplicate Segment or Theme Part has been avoided.
- [ ] The required files have been created.
- [ ] Class and file names are correct.
- [ ] The required settings have been defined in `onAdd`.
- [ ] Settings and related resources are cleaned up in `onRemove`.
- [ ] The `onMount` logic is compatible with the system's internal convention.
- [ ] Blade uses variables and helper functions correctly.
- [ ] Database Queries are optimized.
- [ ] The `live-setting` class and the `data-live` attribute are defined according to the system's convention.
- [ ] Styles are defined within the scope of the Theme Part.
- [ ] RTL and LTR modes have been checked.
- [ ] JavaScript runs at the right time.
- [ ] The `screenshot.webp` file is up to date.
- [ ] Client-side assets have been processed.
- [ ] Class Autoload has been updated if necessary.
- [ ] The Theme Part has been tested in the development environment.

## 14. Getting Help and Reporting Issues

If you encounter ambiguity or a problem during development, first review similar Theme Parts and the project's related documentation.

If the problem is not resolved, create an appropriate Issue and include the following information in it:

- The name of the Segment and Theme Part
- Steps to reproduce the problem
- Expected behavior
- Observed behavior
- Error message or related log
- If needed, an image or code sample

Providing accurate information helps the problem be reviewed and resolved faster.