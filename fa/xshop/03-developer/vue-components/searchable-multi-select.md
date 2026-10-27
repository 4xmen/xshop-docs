# Searchable Multi Select

برای انتخاب چند گانه همراه با سرچ:

![searchable-multi-select2.png](https://raw.githubusercontent.com/4xmen/xshop-docs/refs/heads/master/images/searchable-multi-select2.webp)
![searchable-multi-select.png](https://raw.githubusercontent.com/4xmen/xshop-docs/refs/heads/master/images/searchable-multi-select.webp)

## چگونگی استفاده

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

- items: فهرست گزینه‌های مورد نیاز
- title-field: تعیین فیلد عنوان
- value-field: تعیین فیلد مقدار
- xlang: زبان پنل
- xname: نام مورد استفاده در فرم
- xvalue: مقدار پیش فرض
- close-on-Select: بستن پس از انتخاب
- err: آیا خطا دارد یا نه
- vuex-dispatch اگر نیاز به تغییرات در vuex دارد تابع مورد نظر چیست؟