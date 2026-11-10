
# Helper Functions

Helper functions are used to simplify developers' tasks. These functions are available on both the admin panel and the visitor-facing side of the application, and are typically used in controllers or Blade templates.

## langIsRTL

This function determines whether a language tag is associated with a right-to-left (RTL) language.

It returns a boolean value. Example usage:

```php
if (langIsRTL("fa"))
```

The `$langCode` input parameter represents the language tag.

## getEmojiLanguagebyCode

This function receives a language code and returns the flag emoji defined for that language. If the language code does not exist in the array, it returns `❓`. The return type is always `string`.

The `$lang` input parameter represents the language code, such as `fa`.

Example usage:

```php
$emoji = getEmojiLanguagebyCode('vi');
```

## sortSuffix

This function generates the sorting parameter suffix used in table links.

If the specified column matches the currently sorted column (`sort`), the sorting direction is reversed:

- If the current sorting direction is `desc`, it returns `&sortType=asc`.
- If the current sorting direction is `asc` or has not been set, it returns `&sortType=desc`.
- If the specified column differs from the currently sorted column, an empty string is returned.

**Return type:** `string`

**Input parameters:**

- `$col`: The name of the column by which the results should be sorted.

Example usage:

```php
<a href="?sort=name{{ sortSuffix('name') }}">Name</a>
```

## arrayNormalizeVueCompatible

This function converts an array into a Vue-compatible structure, making it easier to use the data in Vue components and display selectable options.

Each array element is converted into an associative array containing two keys, `id` and `name`:

- `id`: The original key of the element in the input array.
- `name`: The value of the element, which is translated using the `__()` function if translation is enabled.

Finally, the output is converted into JSON format.

**Return type:** `string|false`

**Input parameters:**

- `$array`: The input array.
- `$translate`: If set to `true`, the array values are translated before being converted to JSON. The default value is `false`.

Example usage:

```php
$options = arrayNormalizeVueCompatible([
    'fa' => 'Persian',
    'en' => 'English',
], true);
```

Output:

json

```json
[
    {"id": "fa", "name": "Persian"},
    {"id": "en", "name": "English"}
]
```

## isJson

This function checks whether the input string contains valid JSON.

It uses `json_decode` to validate the input content and returns `true` if no JSON errors are encountered.

**Return type:** `bool`

**Input parameters:**

- `$string`: The string whose JSON validity needs to be verified.

Example usage:

```php
if (isJson('{"name":"John"}')) {
    // Valid JSON
}
```

## logAdminBatch

This function is used to log batch operations in the admin panel.

For each ID in the `$ids` array, it creates a log record in the `logs` relationship of the authenticated user.

The operation name is extracted from the last segment of the class or method name provided in `$method`. The following information is stored in the log:

- `action`: The name of the operation.
- `loggable_type`: The type of the model associated with the operation.
- `loggable_id`: The ID of the record on which the operation was performed.

**Return type:** `void`

**Input parameters:**

- `$method`: The class or method name. Its final segment is recorded as the operation name.
- `$cls`: The name of the model class associated with the log.
- `$ids`: An array of record IDs for which log entries should be created.

Example usage:

```php
logAdminBatch(
    'App\\Http\\Controllers\\PostController\\destroy',
    Post::class,
    [1, 2, 3]
);
```

## gfx

This function retrieves the graphical theme settings (Theme Engine) from the `Gfx` model.

All table values are returned as a key-value Collection, where each element's key is taken from the `key` column and its value is taken from the `value` column.

These values are typically used for theme appearance settings, such as the primary color, background color, border radius, and other graphical properties.

**Return type:** `Illuminate\Support\Collection`

**Input parameters:** None.

Example usage:

```blade
<div class="{{gfx()['container']}}">
```

## queryBuilder

This function converts the current HTTP request parameters into a query string and allows a specific parameter to be excluded.

Its primary purpose is to preserve filter parameters, search terms, and other page settings when generating sorting links.

If the `$except` parameter is specified:

- The specified parameter is removed from the request.
- The `sortType` parameter is also removed.

Finally, the remaining parameters are converted into a query string using `http_build_query`.

**Return type:** `string`

**Input parameters:**

- `$except`: The name of the parameter to be excluded from the query string. The default value is `null`.

Example usage:

```php
$query = queryBuilder('sort');
```

Example usage in Blade:

```php
@foreach($cols as $col)
    <th>
        <a href="?sort={{ $col }}{{ sortSuffix($col) }}&{{ queryBuilder('sort') }}">
            {{ __($col) }}
        </a>
    </th>
@endforeach
```

In this example, the current page parameters, such as filters and search terms, are preserved. However, the `sort` and `sortType` parameters are removed when generating the new link.

## sluger

This function converts a text string into a slug suitable for use in URLs.

The conversion process consists of the following steps:

- Replacing certain special characters with their English equivalents:
  - `&` with `and`
  - `+` with `plus`
  - `@` with `at`
  - `*` with `star`
- Replacing invalid characters with the character specified in `$replace_char`.
- Converting and transliterating characters using `iconv`.
- Removing replacement characters from the beginning and end of the string.
- Removing consecutive replacement characters.
- Converting all letters to lowercase.
- Limiting the output length to 120 characters.

If the resulting string is empty, `N-A` is returned.

**Return type:** `string`

**Input parameters:**

- `$name`: The text to be converted into a slug.
- `$replace_char`: The character used to replace invalid characters. The default value is `-`.

Example usage:

```php
$slug = sluger('Hello World & Laravel');
// hello-world-and-laravel

$slug = sluger('Hello World', '_');
// hello_world
```


## lastCrump

This function generates the last segment of the Breadcrumb navigation path in the admin panel and prints it directly to the HTML output.

It identifies the different segments of the path by examining the current Route name and generates the appropriate title, icon, and link accordingly.

The function behaves differently depending on the Route type:

- If the Route name does not contain exactly three segments, the last segment of the Route is displayed as the Breadcrumb title.
- If the Route is `home`, nothing is printed.
- If the last segment of the Route is one of `all`, `index`, or `list`, the pluralized title of the preceding segment is displayed.
- For other Routes, a link to the `index` page of the corresponding section is generated first, followed by the appropriate title and icon for the operation.

The recognized operations include:

- `create`: Add
- `edit`: Edit
- `show`: View
- `sort`: Sort
- `trashed`: Deleted Items
- `design`: Design

Return type: `void`

Input parameters: None.

Usage:

This function is called directly within a Blade file. There is no need to capture its return value.

```php
<ol class="breadcrumb">
    @php
        lastCrump();
    @endphp
</ol>
```

## showCatNestedControl

This function is used to display categories or groups in a nested tree structure with checkboxes in the admin panel.

It recursively examines the parent-child relationships between categories and generates HTML output containing `ul`, `li`, and `input` tags.

Categories whose IDs are included in the `$checked` array are displayed as selected by default.

Return type: `string` (HTML)

Input parameters:

- `$cats`: A collection of categories or groups. Each item must contain the `id`, `parent_id`, and `name` fields.
- `$checked`: An array of category IDs whose corresponding checkboxes should be selected. The default value is `[]`.
- `$parent`: The parent ID used to generate child categories. The default value is `null`.

Example usage:

```php
{!! showCatNestedControl($categories, [1, 3, 5]) !!}
```

In this example, the categories with IDs 1, 3, and 5 are displayed as selected.

## showCatNested

This function is used to display categories or groups in a nested tree structure using links.

It recursively examines the parent-child relationships between categories and generates HTML output containing `ul`, `li`, and `a` tags.

Categories whose `hide` field is set to `true` are not displayed.

Each category's link is generated using that category's `webUrl()` method.

Return type: `string` (HTML)

Input parameters:

- `$cats`: A collection of categories or groups. Each item must contain the `id`, `parent_id`, `name`, and `hide` fields, as well as the `webUrl()` method.
- `$parent`: The parent ID used to generate child categories. The default value is `null`.

Example usage:

```php
{!! showCatNested($categories) !!}
```

This function is used to display categories together with their nested subcategories.

## getModelName

This function generates a human-readable name from a model's information in a Polymorphic structure.

It extracts the model class name from the last segment of `$modelable_type` and appends the model ID to it.

The output consists of the model name and its ID, separated by the `:` character.

Return type: `string`

Input parameters:

- `$modelable_type`: The fully qualified model class name (usually the value of the `modelable_type` column).
- `$modelable_id`: The model ID (usually the value of the `modelable_id` column).

Example usage:

```php
getModelName(Post::class, 25);

// Post:25
```

## getModelLink

This function generates a link to a model's detail page in the admin panel based on Polymorphic information.

First, it extracts the model class name from `$modelable_type` and converts it to lowercase.

It then constructs the target Route name using the following pattern:

`admin.{model}.show`

If the specified Route exists, its URL is generated using `$modelable_id`. Otherwise, an empty string is returned.

Return type: `string`

Input parameters:

- `$modelable_type`: The fully qualified model class name.
- `$modelable_id`: The ID of the target model record.

Example usage:

```php
$link = getModelLink(Post::class, 25);
```

If a Route named `admin.post.show` exists, the link to the detail page of the post with ID 25 is returned.

## getAction

This function extracts an operation name from a string containing a class and method name.

It splits the input string using `::` as the delimiter and returns the last segment with its first letter capitalized.

Return type: `string`

Input parameter:

- `$act`: The operation name or a string containing a class and method name.

Example usage:

```php
getAction('PostController::destroy');

// Destroy
```

## getAdminRoutes

This function retrieves the list of Routes registered for the admin panel.

It examines all Routes registered in Laravel and extracts those whose names contain the term `admin`.

The output is an array of Route information, with each item containing the following two values:

- `name`: The Route name.
- `url`: The URI associated with the Route.

Return type: `array`

Input parameters: None.

Example usage:

```php
$routes = getAdminRoutes();

foreach ($routes as $route) {
    echo $route['name'];
    echo $route['url'];
}
```

## getClientRoutes

This function retrieves the list of client-side Routes in Laravel.

It examines all Routes registered in the system and extracts those whose names do not contain the term `admin`.

The output is an array of Route information, with each item containing the following two values:

- `name`: The Route name.
- `url`: The URI associated with the Route.

Return type: `array`

Input parameters: None.

Example usage:

```php
$routes = getClientRoutes();

foreach ($routes as $route) {
    echo $route['name'];
    echo $route['url'];
}
```

## modelWithCustomAttrs

This function retrieves the data of an Eloquent model together with its computed attributes (Custom Attributes).

First, it retrieves the model data using `toArray()`. It then extracts the mutated attributes and adds their values to the output array.

The attribute named `translations` is excluded from this process.

This function is useful when you need to retrieve model data together with the values of its custom attributes.

Return type: `array`

Input parameter:

- `$model`: An instance of an Eloquent model whose data should be extracted.

Example usage:

```php
$data = modelWithCustomAttrs($post);
```

## getMaxUploadSize

This function calculates the maximum permitted file upload size based on the PHP configuration limits imposed by the server.

The following two values are checked:

- `upload_max_filesize`: The maximum permitted size for an individual uploaded file.
- `post_max_size`: The maximum permitted size of the entire payload submitted in a POST request.

Finally, the smaller of these two limits is returned in bytes.

Return type: `int`

Input parameters: None.

Example usage:

```php
public function rules(): array
{
    return [
        'title' => ['required', 'string', 'max:255','min:5'],
        // Example: 10485760 (10 MB)
        'clip' => ['nullable', 'mimes:mp4', 'max:'.getMaxUploadSize()],
    ];
}
```

## returnBytes

This function converts a file size provided as a string with a measurement unit into bytes.

The recognized units are:

- `K`: Kilobytes
- `M`: Megabytes
- `G`: Gigabytes

If no unit is specified, the numeric input value is returned without any unit conversion.

Return type: `float|int|string`

Input parameter:

- `$val`: The file size along with its measurement unit, such as `2M` or `512K`.

Example usage:

```php
returnBytes('2M');

// 2097152

returnBytes('512K');

// 524288
```

## formatFileSize

This function converts a file size expressed in bytes into a human-readable string.

The appropriate unit is selected based on the file size:

- Less than 1,024 bytes: `bytes`
- Less than 1 MB: `KB`
- Less than 1 GB: `MB`
- Larger values: `GB`

Decimal values are displayed with one digit after the decimal point.

Return type: `string`

Input parameter:

- `$size`: The file size in bytes.

Example usage:

```php
formatFileSize(1048576);

// 1.0 MB

formatFileSize(512);

// 512 bytes
```

## generateUniqueID

This function generates a random string identifier with a specified length.

The characters used include lowercase letters, uppercase English letters, and digits.

Return type: `string`

Input parameter:

- `$length`: The length of the generated identifier. The default value is `8`.

Example usage:

```php
$id = generateUniqueID();

// Example: aB82kLm9

$id = generateUniqueID(16);
```

## commentStatuses

This function returns an array containing the available statuses for comments.

Each status consists of two values:

- `name`: The translated status title.
- `id`: The status identifier.

The defined statuses are:

| ID | Status |
| --- | --- |
| `1` | Approved |
| `-1` | Rejected |
| `0` | Pending |

Return type: `array`

Input parameters: None.

Example usage:

```php
$statuses = commentStatuses();
```

## validateSettingRequest

This function validates and normalizes a Basic Settings value before it is saved to the database.

First, it checks whether the specified setting belongs to the Basic Settings category. If it does not, the input value is returned unchanged.

Otherwise, specific validation rules are applied based on the setting key:

- `optimize`: Only `jpg` and `webp` values are accepted. Otherwise, `webp` is returned.
- `gallery_thumb`
- `post_thumb`
- `product_thumb`
- `product_image`

For the last four settings, the input value must follow the `width x height` format, and both dimensions must be at least 50 pixels. If the format is invalid or either dimension is too small, the default value `500x500` is returned.

Return type: `mixed|string`

Input parameters:

- `$setting`: The settings model, which contains information such as `key` and `is_basic`.
- `$newValue`: The new setting value to be validated.

Example usage:

```php
$value = validateSettingRequest($setting, '300x300');
```

## getSetting

This function retrieves a setting value from the database based on its key and uses Cache to reduce database queries.

First, it checks whether the application is running outside the CLI environment and whether the `settings` table exists. Otherwise, it returns `false`.

If possible, the setting value is retrieved using Cache.

The function has the following characteristics:

- The Cache key includes the setting name and the application's current language.

The Cache key includes the setting name and the application's current language.

- If the setting does not exist in the database, an empty string is returned.
- If the `xlang` multilingual feature is enabled and the setting type is not textual, the `raw` value is returned.
- In all other cases, the `value` is returned.
- The default Cache expiration time is 3,600 seconds (one hour).

Return type: `string|false|mixed|null`

Input parameters:

- `$key`: The key of the target setting.
- `$ttl`: The Cache expiration time in seconds. The default value is `3600`.

Example usage:

```php
$siteName = getSetting('site_name');

$primaryColor = getSetting('primary_color', 600);
```

## imageSizeConvertValidate

This function retrieves and prepares image dimensions based on the settings stored in the system.

First, it retrieves the specified setting using `getSetting()`.

- If the setting exists, its value is split into width and height using `x` as the delimiter.
- If the setting does not exist, the input value is checked. If no corresponding setting is found in the Config file, the default dimensions of `500x500` are used.

Finally, it returns an array containing the image width and height.

Return type: `string[]`

Input parameter:

- `$size`: The setting key or the name of the desired image size.

Example usage:

```php
$imageSize = imageSizeConvertValidate('post_thumb');

$width = $imageSize[0];
$height = $imageSize[1];
```

## nestedWithData

This function generates a nested tree structure from models that have parent-child relationships.

The output is generated as HTML using `ol` and `li` tags.

Function characteristics:

- Each item is displayed with its ID in the `data-id` attribute.
- The item title is selected according to the following priority:
  1. `name`
  2. `title`
  3. `id`
- If the model has an attribute named `parent_id`, its child items are also displayed recursively.
- The `ol-sortable` class is used to ensure compatibility with the sorting structure.

Return type: `string` (HTML)

Input parameters:

- `$items`: A collection of items with a parent-child structure.
- `$parent_id`: The parent ID used to generate child items. The default value is `null`.

Example usage:

```php
$html = nestedWithData($categories);

echo $html;
```

## hasPart

This function checks whether at least one Part has been registered for a specific Area.

First, it finds the Area by its name. It then searches for the first Part associated with that Area.

- If the Area does not exist, `false` is returned.
- If the Area exists but has no associated Part, `false` is returned.
- If a Part exists, the first instance of the `Part` model is returned.

Return type: `App\Models\Part|false`

Input parameter:

- `$areaName`: The name of the target Area.

Example usage:

```php
@php($preloader = hasPart('preloader'))

<div id="website-preloader">
    @if($preloader != null)
        @include($preloader->getBlade())
    @endif
</div>
```

## getParts

This function retrieves the list of Parts associated with a specific Area.

It also supports retrieving Parts associated with a Custom Theme.

Function behavior:

- If `$custom` has a value, all Parts associated with the specified Custom Theme are first retrieved and sorted by the `sort` field.
- If Parts exist for the Custom Theme, that collection is returned.
- Otherwise, the Parts associated with the specified Area are sorted by `sort` and returned.

Return type: `Illuminate\Database\Eloquent\Collection`

Input parameters:

- `$areaName`: The name of the target Area.
- `$custom`: The identifier or value of the Custom Theme used to retrieve its dedicated Parts. The default value is `null`.

Example usage:

```php
@foreach(getParts($area,'creator'.$creator->id) as $part)
    @php($p = $part->getBladeWithData($creator))
    @include($p['blade'],['data' => $p['data']])
@endforeach
```

## getSettingsGroup

This function retrieves a collection of settings based on a key prefix.

It retrieves all settings whose keys begin with the value of `$group` and whose `value` field is neither empty nor `null`.

In the output, the group prefix is removed from the keys, and an associative array containing the setting names and their corresponding values is generated.

Return type: `array`

Input parameter:

- `$group`: The prefix of the target setting keys.

Example usage:

```php
<ul class="social">
    @foreach(getSettingsGroup('social_')??[] as $k => $social)
        <li class="d-inline-block mx-2">
            <a href="{{$social}}">
                <i class="ri-{{$k}}-line"></i>
            </a>
        </li>
    @endforeach
</ul>
```


## getGrayscaleTextColor

This function determines the appropriate text color (black or white) based on the brightness of a given background color.

It analyzes the background color and calculates its brightness to determine which text color provides better contrast and readability.

Return type: `string`

Input parameter:

- `$color`: The background color in hexadecimal format.

Example usage:

```php
$textColor = getGrayscaleTextColor('#ffffff');

// #000000
```

## getGrayscaleTextColor

This function selects an appropriate text color based on the brightness of the background color.

First, it converts the background color from HEX format into RGB values and then calculates its approximate brightness.

- If the brightness is greater than `0.5`, black (`#000000`) is returned.
- Otherwise, white (`#ffffff`) is returned.

Return type: `string`

Input parameter:

- `$bgColor`: The background color in six-digit HEX format, such as `#ffffff`.

Example usage:

```php
$textColor = getGrayscaleTextColor('#ffffff');

// #000000

$textColor = getGrayscaleTextColor('#222222');

// #ffffff
```

## getGroupBySetting

This function retrieves a Group together with its associated posts, based on the ID stored in the settings.

The Group ID is retrieved using the `getSetting()` function. If the setting value is `null`, the default ID `1` is used.

The `posts` relationship is also retrieved using Eager Loading.

Return type: `App\Models\Group|null`

Input parameter:

- `$key`: The key of the setting in which the Group ID is stored.

Example usage:

```php
$group = getGroupBySetting('home_group');

if ($group) {
    $posts = $group->posts;
}
```

## getMenuBySetting

This function retrieves a Menu together with its items, based on the ID stored in the settings.

First, it checks whether at least one Menu exists in the database. If no Menu exists, an empty array is returned.

Otherwise, the specified Menu is retrieved together with its `items` relationship.

If the setting value is `null`, the ID `1` is used as the default value.

Return type: `App\Models\Menu|array|null`

Input parameter:

- `$key`: The key of the setting in which the Menu ID is stored.

Example usage:

```php
$menu = getMenuBySetting('header_menu');

if ($menu) {
    $items = $menu->items;
}
```

## getMenuBySettingItems

This function retrieves the items of a Menu based on the ID stored in the settings.

First, it checks whether at least one Menu exists in the database.

It then retrieves the specified Menu. If the selected Menu does not exist, the first available Menu is selected as a fallback.

Finally, the `items` relationship of that Menu is returned.

Return type: `Illuminate\Database\Eloquent\Collection|array`

Input parameter:

- `$key`: The key of the setting in which the Menu ID is stored.

Example usage:

```php
$items = getMenuBySettingItems('header_menu');

foreach ($items as $item) {
    // Use menu item
}
```

## getGroupPostsBySetting

This function retrieves the published posts of a Group based on the ID stored in the settings.

First, it locates the specified Group. If the Group does not exist, an empty array is returned.

If the Group exists, its associated posts are retrieved according to the following conditions:

- Only posts whose `status` is equal to `1` are retrieved.
- Results are sorted according to the specified column and sorting direction.
- The number of results is limited using `$limit`.

Return type: `Illuminate\Database\Eloquent\Collection|array`

Input parameters:

- `$key`: The key of the setting in which the Group ID is stored.
- `$limit`: The maximum number of posts. The default value is `10`.
- `$order`: The sorting column. The default value is `id`.
- `$dir`: The sorting direction (`ASC` or `DESC`). The default value is `DESC`.

Example usage:

```php
$posts = getGroupPostsBySetting(
    'home_group',
    10,
    'created_at',
    'DESC'
);
```

## getCategoryProductBySetting

This function retrieves active products from a Category based on the ID stored in the settings.

First, it retrieves the specified Category together with its `products` relationship. It then returns the associated products according to the following conditions:

- Only active products with `status = 1` are retrieved.
- Results are sorted according to the specified column and sorting direction.
- The number of results is limited.

Return type: `Illuminate\Database\Eloquent\Collection`

Input parameters:

- `$key`: The key of the setting in which the Category ID is stored.
- `$limit`: The maximum number of products. The default value is `10`.
- `$order`: The sorting column. The default value is `id`.
- `$dir`: The sorting direction. The default value is `DESC`.

Example usage:

```php
$products = getCategoryProductBySetting(
    'home_category',
    8,
    'price',
    'ASC'
);
```

## getProductsQueryBySetting

This function retrieves products based on the saved settings and the selected category and sorting criteria.

The setting value is retrieved using `getSetting()` and split into three parts using `,` as the delimiter:

1. Category ID
2. Sorting column
3. Sorting direction

Function behavior:

- If the Category ID is `0`, active products are retrieved from all products.
- Otherwise, active products belonging to the specified Category are retrieved.
- If the Category does not exist, an empty array is returned.
- Results are sorted according to the settings, and their number is limited using `$limit`.

Return type: `Illuminate\Database\Eloquent\Collection|array`

Input parameters:

- `$key`: The key of the setting in which the product selection information is stored.
- `$limit`: The maximum number of products. The default value is `10`.

Example usage:

```php
$products = getProductsQueryBySetting('home_products', 12);
```

Example setting value:

```text
1,created_at,DESC
```

## getPostsQueryBySetting

This function retrieves posts based on the saved settings and the selected Group and sorting criteria.

The setting value is retrieved using `getSetting()` and split into three parts using `,` as the delimiter:

1. Group ID
2. Sorting column
3. Sorting direction

Function behavior:

- If the Group ID is `0`, active posts are retrieved from all posts.
- Otherwise, active posts belonging to the specified Group are retrieved.
- If the Group does not exist, an empty array is returned.
- Results are sorted according to the settings, and their number is limited using `$limit`.

Return type: `Illuminate\Database\Eloquent\Collection|array`

Input parameters:

- `$key`: The key of the setting in which the post selection information is stored.
- `$limit`: The maximum number of posts. The default value is `10`.

Example usage:

```php
$posts = getPostsQueryBySetting('home_posts', 10);
```

Example setting value:


```text
1,created_at,DESC
```

## getCategorySubCatsBySetting

This function retrieves the subcategories of a Category based on the ID stored in the settings.

First, it retrieves the specified Category together with its `children` relationship. If the Category does not exist, an empty array is returned.

If the Category exists, its subcategories are retrieved according to the following conditions:

- Results are sorted by the specified column.
- The number of results is limited using `$limit`.
- The `children` relationship of the Category model is used.

Return type: `Illuminate\Database\Eloquent\Collection|array`

Input parameters:

- `$key`: The key of the setting in which the parent Category ID is stored.
- `$limit`: The maximum number of subcategories. The default value is `10`.
- `$order`: The sorting column. The default value is `id`.
- `$dir`: The sorting direction (`ASC` or `DESC`). The default value is `DESC`.

Example usage:

```php
$categories = getCategorySubCatsBySetting(
    'home_category',
    10,
    'name',
    'ASC'
);
```

## success

This function generates a successful JSON response for an API.

The response structure includes the success status, message, data, and SEO and social media information.

The supplied metadata is merged with default values to ensure that the response structure remains complete even when some fields are not provided.

The output structure includes the following fields:

- `OK`: The request success status, which is always `true`.
- `message`: The response message.
- `data`: The main response data.
- `meta`: Page metadata, including the title, description, and image.
- `og`: Open Graph information for improved link presentation on social media platforms.
- `twitter`: Twitter Card information.
- `canonical_url`: The canonical page URL for search engines.

Return type: `Illuminate\Http\JsonResponse`

Input parameters:

- `$data`: The main response data. The default value is `null`.
- `$message`: The response message. The default value is `null`.
- `$meta`: SEO information, including `title`, `description`, `image`, and `secure_image`.
- `$og`: Open Graph information, including `url`, `type`, `site_name`, `description`, and `locate`.
- `$twitter`: Twitter Card information, including `card`, `site`, `title`, `description`, and `image`.
- `$canonical_url`: The canonical URL of the page. The default value is `null`.
- `$jsonLd`: A reserved parameter for JSON-LD information, which is not used in the current implementation.

Example usage:

```php
return success(
    $posts,
    'Posts retrieved successfully',
    [
        'title' => 'Latest Posts',
        'description' => 'List of latest posts',
    ],
    [
        'type' => 'website',
    ]
);
```

## errors

This function generates an unsuccessful JSON response for an API.

The response structure includes the failure status, errors, message, and optional data.

It also allows the HTTP status code of the response to be specified.

Return type: `Illuminate\Http\JsonResponse`

Input parameters:

- `$errors`: Error information or a list of errors.
- `$status`: The HTTP status code. The default value is `422`.
- `$message`: The error message. The default value is `null`.
- `$data`: Additional response data. The default value is `null`.

Example usage:

```php
return errors(
    ['email' => ['Invalid email address']],
    422,
    'Validation failed'
);
```

## readable

This function converts strings containing common separators into more readable text.

It replaces the characters `-`, `_`, and `.` with spaces, removes leading and trailing spaces, and capitalizes the first letter of the string.

Return type: `string`

Input parameter:

- `$text`: The string to be converted into a more readable format.

Example usage:

```php
readable('product-category_name');

// Product category name
```

## guestLog

This function records the activities of guest users in the system.

It creates a new record in the `GuestLog` model and stores the following information:

- `action`: The type of operation performed.
- `ip`: The IP address of the requester.
- `loggable_type`: The type of model associated with the operation.
- `loggable_id`: The ID of the record associated with the operation.

The association with a model and its ID is optional.

Return type: `void`

Input parameters:

- `$action`: The name or type of operation.
- `$type`: The type of model associated with the operation. The default value is `null`.
- `$id`: The ID of the record associated with the operation. The default value is `null`.

Example usage:

```php
if (isGuestMaxAttemptTry('sms', 1, 2)) {
    return [
        'OK' => false,
        'message' => __('You try attempts, Try it a few minutes'),
        'error' => __('You try attempts, Try it a few minutes'),
    ];
}

guestLog('sms');
```

## isGuestMaxAttemptTry

This function limits the number of attempts made by guest users based on their IP address and the type of operation.

First, it checks the number of logs recorded for the current IP address and the specified operation within the defined time interval.

- If the number of attempts has reached or exceeded the permitted limit, `true` is returned.
- Otherwise, a new log entry is recorded and `false` is returned.

Return type: `bool`

Input parameters:

- `$action`: The type of operation whose attempts are being checked.
- `$max`: The maximum permitted number of attempts. The default value is `5`.
- `$minutes`: The time interval used for the check, in minutes. The default value is `60`.

Example usage:

```php
if (isGuestMaxAttemptTry('sms', 1, 2)) {
    return [
        'OK' => false,
        'message' => __('You try attempts, Try it a few minutes'),
        'error' => __('You try attempts, Try it a few minutes'),
    ];
}

guestLog('sms');
```

In this example, if the current IP address has recorded at least five attempts for the `login` operation during the past hour, the request is restricted.

## homeUrl

This function generates the URL of the website's homepage while taking the current language of the multilingual store into account.

First, it retrieves the Route associated with the homepage (`client.welcome`) and then uses `fixUrlLang()` to add the language prefix to the URL when necessary.

Return type: `string`

Input parameters: None.

Example usage:

```php
$url = homeUrl();
```

## postsUrl

This function generates the URL of the posts listing page while taking the current language of the multilingual store into account.

It retrieves the URL of the `client.posts` Route and uses `fixUrlLang()` to synchronize it with the current language.

Return type: `string`

Input parameters: None.

Example usage:

```php
$url = postsUrl();
```

## productsUrl

This function generates the URL of the products listing page while taking the current language of the multilingual store into account.

It retrieves the URL of the `client.products` Route and uses `fixUrlLang()` to synchronize it with the current language.

Return type: `string`

Input parameters: None.

Example usage:

```php
$url = productsUrl();
```

## clipsUrl

This function generates the URL of the clips listing page while taking the current language of the multilingual store into account.

It retrieves the URL of the `client.clips` Route and uses `fixUrlLang()` to synchronize it with the current language.

Return type: `string`

Input parameters: None.

Example usage:

```php
$url = clipsUrl();
```

## gallariesUrl

This function generates the URL of the galleries listing page while taking the current language of the multilingual store into account.

It retrieves the URL of the `client.galleries` Route and uses `fixUrlLang()` to synchronize it with the current language.

Return type: `string`

Input parameters: None.

Example usage:

```php
$url = gallariesUrl();
```

## attachmentsUrl

This function generates the URL of the attachments listing page while taking the current language of the multilingual store into account.

It retrieves the URL of the `client.attachments` Route and uses `fixUrlLang()` to synchronize it with the current language.

Return type: `string`

Input parameters: None.

Example usage:

```php
$url = attachmentsUrl();
```

## tagUrl

This function generates the URL of a Tag page based on its Slug and also takes the current language of the store into account.

First, it generates the `client.tag` Route using the specified Slug parameter and then adjusts the URL using `fixUrlLang()`.

Return type: `string`

Input parameter:

- `$slug`: The Slug value of the target Tag.

Example usage:

```php
$url = tagUrl('laravel');
```

## fixUrlLang

This function synchronizes a URL with the current language of multilingual stores.

If the `xlang.active` multilingual feature is enabled and the current language differs from the website's default language, the language prefix is added to the URL.

Otherwise, the URL is returned unchanged.

Return type: `string`

Input parameter:

- `$url`: The URL that needs to be synchronized with the current language.

Example usage:

```php
$url = fixUrlLang(route('client.welcome'));
```

The `fixUrlLang` function deserves particular attention because it is used in several parts of the system. Improving it can help prevent duplicate language prefixes from appearing in URLs.

## usableProp

This function prepares the usable properties of products or other models for display in different parts of the system.

It retrieves the property information and converts the options stored in the `options` field from JSON into an array.

The following information is prepared for each property:

- `data`: The property options as an array of values and labels.
- `icon`: The property icon.
- `unit`: The unit of measurement.
- `searchable`: Indicates whether the property can be used in searches.
- `priceable`: Indicates whether the property affects price calculations.
- `type`: The property type.
- `label`: The display label of the property.

The key of each element in the output array is the property name (`name`).

Return type: `array`

Input parameter:

- `$props`: A collection of properties, each of which must contain information such as `name`, `options`, `icon`, `unit`, and other specifications.

Example usage:

```php
$props = usableProp($product->props);
```

Alternatively, it can be used directly in a Blade component:

```blade
<quantities-add-to-card
    :qz='@json($product->quantities)'
    :props='@json(usableProp($product->category->props))'
    currency="{{config('app.currency.symbol')}}"
    card-link="{{ route('client.product-card-toggle',$product->slug) }}"
    :translate='@json(['add-to-card' => __('Add to card')])'
    @if($product->hasDiscount())
        :discount='@json($product->activeDiscounts()->first())'
    @endif
></quantities-add-to-card>
```

Example output structure:

```php
[
    'color' => [
        'data' => [
            'red' => 'Red',
            'blue' => 'Blue',
        ],
        'icon' => 'ri-palette-line',
        'unit' => null,
        'searchable' => 1,
        'priceable' => 0,
        'type' => 'select',
        'label' => 'Color',
    ],
]
```

## cardItems

This function retrieves the products stored in a guest user's Shopping Cart.

The product IDs are retrieved from the Cookie named `card`.

The products are then retrieved from the database according to the following conditions:

- The product IDs must be present in the Cookie.
- Only active products with `status = 1` are retrieved.

Finally, the products are converted into a JSON Resource using the `ProductCardCollection` Resource.

If the Shopping Cart is empty, an empty array is returned.

Return type: `array|Illuminate\Http\Resources\Json\AnonymousResourceCollection`

Input parameters: None.

Example usage:

```php
$items = cardItems();
```

## cardCount

This function calculates the number of items stored in a guest user's Shopping Cart.

The cart information is retrieved from the Cookie named `card`, and the number of IDs stored in it is calculated.

If the Shopping Cart Cookie does not exist, `0` is returned.

Return type: `int`

Input parameters: None.

Example usage:

```php
$count = cardCount();
```

## transports

This function retrieves all shipping methods registered in the system.

It retrieves all records from the `Transport` model and converts them into a JSON Resource using the `TransportCollection` Resource.

Return type: `Illuminate\Http\Resources\Json\AnonymousResourceCollection`

Input parameters: None.

Example usage:

```php
$transports = transports();
```

## defTrannsport

This function retrieves the ID of the system's default shipping method.

First, it checks whether a shipping method with `is_default = 1` exists.

- If no default shipping method exists, `null` is returned.
- Otherwise, the ID of the first default shipping method is returned.

Return type: `int|null`

Input parameters: None.

Example usage:

```php
$transportId = defTrannsport();
```

## vueTranslate

This function converts an array of translation data into a JSON string so that it can be used in Vue components.

The input array is converted directly into JSON using `json_encode()`.

Return type: `string|false`

Input parameter:

- `$array`: The array containing the data to be converted into JSON.

Example usage:

```php
$translations = vueTranslate([
    'save' => __('Save'),
    'cancel' => __('Cancel'),
]);
```

## markUpBreadcrumbList

This function generates Structured Data of the `BreadcrumbList` type according to the Schema.org standard.

It receives page navigation information and converts it into JSON-LD so that search engines can better understand the hierarchy of website pages.

The following information is generated for each item:

- `@type`: The item type, which is `ListItem`.
- `position`: The item's position in the navigation path.
- `name`: The item's title, retrieved from the array key.
- `item`: The page URL, if available.

Finally, the JSON-LD output is placed inside a `script` tag with the `application/ld+json` type.

Return type: `string`

Input parameter:

- `$items`: An array containing the titles and URLs of Breadcrumb navigation items. Each array key represents a title, and its value represents the corresponding page URL.

Example usage:

```php
$breadcrumb = markUpBreadcrumbList([
    'Home' => 'https://example.com',
    'Blog' => 'https://example.com/posts',
    'Laravel' => null,
]);
```

This function is typically used to include Structured Data in the page's Head section or HTML content.

## sendingSMS

This function sends SMS messages through the SMS service configured in the system.

It currently supports two sending methods:

- Kavenegar: If the Driver is set to `Kavenegar`, the Token and SMS arguments are included in the URL, and a GET request is sent.
- Other services: The SMS text is populated with the values provided in `$args`, and a POST request containing the authentication information is sent to the SMS service.

If the SMS service URL has not been configured or the sending operation fails, `false` is returned.

If the request is sent successfully, `true` is returned.

Return type: `bool`

Input parameters:

- `$text`: The SMS message text. For Drivers other than Kavenegar, placeholders following the `%key` pattern are replaced with the corresponding values from `$args`.
- `$number`: The recipient's phone number.
- `$args`: An array of parameters used to replace placeholders in the message or to send data to the SMS service.

Example usage:

```php
sendingSMS(
    'Hello %name',
    '09123456789',
    ['name' => 'Ali']
);
```

## generateTOC

This function generates a Table of Contents (TOC) from HTML content.

It extracts the `h2` and `h3` headings from the HTML and generates a unique ID for each heading.

The Table of Contents is structured as follows:

- `h2` headings are treated as main sections.
- `h3` headings are placed under the most recent `h2` heading as subsections.

The generated ID is also added to the corresponding Heading tag so that links in the Table of Contents can navigate to the correct location on the page.

Return type: `array`

The returned array contains two values:

- Index `0`: The HTML markup of the Table of Contents.
- Index `1`: The modified HTML content, with the generated IDs added to its headings.

Input parameter:

- `$html`: The HTML content of the article or page.

Example usage:

```php
[$toc, $content] = generateTOC($post->content);
```

## generateHeadingID

This function generates a unique ID for HTML headings.

It converts the heading text to lowercase and replaces non-Latin and non-numeric characters with hyphens.

If the text becomes empty after sanitization, `heading` is used as the default value.

Finally, `$counter` is appended to the generated ID to prevent duplicate IDs within a collection of headings.

Return type: `string`

Input parameters:

- `$text`: The heading text.
- `$counter`: The heading's sequential number, used to generate a unique ID.

Example usage:

```php
$id = generateHeadingID('Introduction to Laravel', 0);
```

Output:

text

```text
introduction-to-laravel-0
```

## buildTOC

This function generates the HTML markup of a Table of Contents from a structured array of headings.

Each heading is converted into an `li` element containing a link to the corresponding Heading ID.

If a heading has child items, the function recursively generates its subsections as well.

Return type: `string`

Input parameter:

\- `$items`: An array of headings containing `title`, `id`, and optionally `children`.

Example usage:

```php
$toc = buildTOC($items);
```

This function is generally used internally by `generateTOC`.

## detectRateCustomer

This function retrieves the rating submitted by a customer for a specific entity.

First, it checks whether the customer is authenticated.

It then searches the `Rate` table for a matching rating based on the following information:

- The ID of the customer who submitted the rating.
- The model type of the customer submitting the rating.
- The model type of the entity being rated.
- The ID of the entity being rated.
- The ID of the evaluation criterion.

If the customer is not authenticated, or no rating exists for the specified combination, `0` is returned.

Otherwise, the previously submitted rating value is returned.

Return type: `int|mixed`

Input parameters:

- `$type`: The model type of the entity being rated, usually the Model class name.
- `$id`: The ID of the target record.
- `$evaluation`: The ID of the evaluation criterion.

Example usage:

```php
$rate = detectRateCustomer(
    \App\Models\Product::class,
    $product->id,
    $evaluation->id
);
```

## findArea

This function retrieves information about an Area based on its name.

It supports two different scenarios:

- If the `$model` parameter is provided and has a `theme` value, the Theme content is decoded from JSON into an Object and returned.
- Otherwise, the specified Area is retrieved from the database using `$name`. Its `parts` relationship is also loaded.

Return type: `object|Area|null`

Input parameters:

- `$name`: The name of the target Area.
- `$model`: An optional model. If it has a dedicated Theme, its Theme information takes priority.

Example usage:

```blade
@if(findArea($area)->use_default)
    @foreach(getParts('defaultHeader') as $part)
        @php($p = $part->getBladeWithData())
        @include($p['blade'],['data' => $p['data']])
    @endforeach
@endif
```

Usage with a model-specific Theme:

```php
@if(findArea($area,$page)->use_default)
    @foreach(getParts('defaultHeader') as $part)
        @php($p = $part->getBladeWithData())
        @include($p['blade'],['data' => $p['data']])
    @endforeach
@endif
```

## cacheNumber

This function retrieves the value of the `cache_number` setting from the system settings.

This value is generally used to manage the Cache version and prevent outdated cached files or resources from being used.

Return type: `mixed|false|null`

Input parameters: None.

Example usage:

```php
$version = cacheNumber();
```

## getMainCategory

This function retrieves the main categories of the website.

Only categories whose `parent_id` value is `null` are retrieved.

The `children` and `products` relationships are also loaded for each category, allowing information about subcategories and products to be accessed without additional queries.

Return type: Collection of Category models.

Input parameters:

- `$limit`: The maximum number of categories. The default value is `4`.
- `$orderBy`: The column used for sorting. The default value is `sort`.
- `$asc`: The sorting direction, typically `ASC` or `DESC`.

Example usage:

```php
$categories = getMainCategory(4, 'sort', 'ASC');
```

## getSubGroupSetting

This function retrieves the subgroups of a Group specified in the website settings.

First, it retrieves the ID of the parent Group from the settings and then returns its associated subgroups according to the specified sorting order.

Return type: Collection of Group models.

Input parameters:

- `$key`: The settings key containing the ID of the parent Group.
- `$limit`: The maximum number of subgroups. The default value is `10`.
- `$order`: The sorting column. The default value is `id`.
- `$dir`: The sorting direction. The default value is `DESC`.

Example usage:

```php
$groups = getSubGroupSetting('home.group');
```

## getCategoriesSet

This function retrieves a collection of categories specified in the website settings.

The category IDs are retrieved from the settings, and only categories with `hide = 0` are returned.

The `products` relationship is also loaded together with the categories.

Return type: Collection of Category models.

Input parameters:

- `$key`: The settings key containing a JSON array of category IDs.
- `$limit`: The maximum number of results. The default value is `4`.
- `$orderBy`: The sorting column. The default value is `sort`.
- `$asc`: The sorting direction. The default value is `ASC`.

Example usage:

```php
$categories = getCategoriesSet('home.categories', 8);
```

## getPagesSet

This function retrieves a collection of pages selected in the website settings.

The page IDs are retrieved from the settings, and only pages with `status = 1` are included in the output.

The parent page (`parent`) relationship is also loaded.

Return type: Collection of Page models.

Input parameters:

- `$key`: The settings key containing a JSON array of page IDs.
- `$limit`: The maximum number of pages. The default value is `4`.
- `$orderBy`: The sorting column. The default value is `id`.
- `$asc`: The sorting direction. The default value is `ASC`.

Example usage:

```php
$pages = getPagesSet('home.pages');
```

## getGroupsSet

This function retrieves a collection of groups selected in the website settings.

The group IDs are retrieved from the settings, and only groups with `hide = 0` are returned.

The `posts` relationship is also loaded together with the groups.

Return type: Collection of Group models.

Input parameters:

- `$key`: The settings key containing a JSON array of group IDs.
- `$limit`: The maximum number of results. The default value is `4`.
- `$orderBy`: The sorting column. The default value is `sort`.
- `$asc`: The sorting direction. The default value is `ASC`.

Example usage:

```php
$groups = getGroupsSet('home.groups');
```

## extractShortCode

This function extracts the IDs contained in a specific Shortcode from a text string.

The Shortcode follows this pattern:

```text
[KEY:123]
```

The function extracts all numeric IDs associated with the specified key and returns them as an array.

If no Shortcode matching the specified pattern is found in the text, an empty array is returned.

Return type: `array`

Input parameters:

- `$key`: The Shortcode key name.
- `$txt`: The text containing the Shortcodes.

Example usage:

```php
$ids = extractShortCode('ATTACHED', $content);
```

For example, the following input:

```text
[ATTACHED:12] [ATTACHED:25]
```

Produces the following output:

```php
['12', '25']
```

## fixShortCode

This function replaces Shortcodes associated with attachments with the HTML component used to display those files.

Currently, it processes the following Shortcode format:

```text
[ATTACHED:123]
```

First, it extracts the attachment IDs from the text and then retrieves the corresponding file information from the `Attachment` model.

Information such as the file URL, temporary URL, extension, title, and file size is passed to the `live-attach` component in the required format.

Finally, the Shortcode is replaced with the component's HTML markup.

Return type: `string`

Input parameter:

- `$txt`: The HTML text or content containing attachment Shortcodes.

Example usage:

```php
$content = fixShortCode($post->content);
```

## getCreatorSet

This function retrieves a collection of Creators selected in the website settings.

The Creator IDs are read from the settings and, after validation, the corresponding records are retrieved from the database.

The `products` relationship is also loaded.

The maximum number of results and sorting order can also be specified.

Return type: `Illuminate\Database\Eloquent\Collection`

Input parameters:

- `$key`: The settings key containing a JSON array of Creator IDs.
- `$limit`: The maximum number of results. The default value is `4`.
- `$orderBy`: The sorting column. The default value is `sort`.
- `$asc`: The sorting direction. The default value is `ASC`.

If the settings are invalid or the ID list is empty, an empty Collection is returned.

Example usage:

```php
$creators = getCreatorSet('home.creators', 8);
```

## getValidMarkup

This function performs an initial validation of Markup code and replaces the variables contained within it.

First, it checks whether the length of the input code exceeds 45 characters. If its length is less than or equal to this value, an empty string is returned.

It then converts the keys in `$keywords` into the `%key%` pattern and replaces the corresponding placeholders in `$markup` with their values.

Return type: `string`

Input parameters:

- `$markup`: The Markup text or code containing replaceable variables.
- `$keywords`: An associative array containing replacement data. Its keys represent variable names, and each value contains a `value` field.

Example usage:

```php
$markup = getValidMarkup(
    '<title>%title%</title>',
    [
        'title' => ['value' => 'Laravel Website'],
    ]
);
```

## humanValue

This function converts an attribute value into HTML content suitable for display.

Depending on the attribute's `type`, the input value is rendered in the appropriate format.

Supported types include:

- `color`: Displays the color as an HTML element with the specified background color.
- `checkbox`: Displays a confirmation or rejection icon based on the value.
- `select`: Converts the selected value into its corresponding display label.
- `singlemulti`: Displays the label of the selected option or options.
- Other types: Displays the value as text or HTML labels.

If a measurement unit (`unit`) is defined, it is appended to the output.

Text values are escaped using `e()` to prevent them from being executed as code when inserted into HTML.

Return type: `string`

Input parameters:

- `$prop`: The attribute model or object, which must contain information such as `type`, `datas`, and `unit`.
- `$value`: The attribute value that needs to be rendered appropriately.

Example usage:

```php
echo humanValue($prop, $productValue);
```

## isValidJsonLd

This function validates the structure of the input JSON-LD.

First, it checks whether the input contains the following tag:

```html
<script type="application/ld+json">
```

It then extracts all JSON-LD blocks from the text and validates the JSON content within each block.

- If no valid blocks are found, or if even one of the blocks contains invalid JSON, `false` is returned.
- If all extracted blocks contain valid JSON, `true` is returned.

Return type: `bool`

Input parameter:

- `$value`: The HTML text containing one or more JSON-LD blocks.

Example usage:

```php
if (isValidJsonLd($markup)) {
    // Markup is valid
}
```