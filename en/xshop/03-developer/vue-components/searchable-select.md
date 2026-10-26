# Searchable Select

A searchable select or combobox.

![searchable-select.png](https://raw.githubusercontent.com/4xmen/xshop-docs/refs/heads/master/images/searchable-select.webp)

## How to use

```vue
<searchable-select
    vuex-dispatch="updateCategory"
    @error('category_id') :err="true" @enderror
    :items='@json($cats)'
    title-field="name"
    value-field="id"
    xlang="{{config('app.locale')}}"
    xid="categoryId"
    xname="category_id"
    @error('category_id') :err="true" @enderror
    xvalue='{{old('category_id',$item->category_id??null)}}'
    :close-on-Select="true"></searchable-select>
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