# Searchable Multi Select

For selecting multiple options with search:

![searchable-multi-select2.png](https://raw.githubusercontent.com/4xmen/xshop-docs/refs/heads/master/images/searchable-multi-select2.webp)
![searchable-multi-select.png](https://raw.githubusercontent.com/4xmen/xshop-docs/refs/heads/master/images/searchable-multi-select.webp)

## How to use

```vue
<searchable-multi-select
:items='{{\App\Models\Category::all(['id','name'])}}'
title-field="name"
value-field="id"
xlang="{{config('app.locale')}}"
xname="filter[category_id]"
:xvalue='{{request()->input('filter.category_id','[]')}}'
:close-on-Select="true"></searchable-multi-select>
```

- `items`: List of required options.
- `title-field`: Specifies the title field.
- `value-field`: Specifies the value field.
- `xlang`: The panel language.
- `xname`: The name used in the form.
- `xvalue`: The default value.
- `close-on-Select`: Closes the component after selection.
- `err`: Specifies whether there is an error.
- `vuex-dispatch`: The name of the function to call if changes need to be dispatched to Vuex.