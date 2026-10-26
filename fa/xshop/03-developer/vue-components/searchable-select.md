# Searchable Select

انتخابگر select یا combobox با قابلیت جستجو است

![searchable-select.png](../../images/searchable-select.webp)

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


- items: فهرست گزینه‌های مورد نیاز
- title-field: تعیین فیلد عنوان
- value-field: تعیین فیلد مقدار
- xlang: زبان پنل
- xname: نام مورد استفاده در فرم
- xvalue: مقدار پیش فرض
- close-on-Select: بستن پس از انتخاب
- err: آیا خطا دارد یا نه
- vuex-dispatch اگر نیاز به تغییرات در vuex دارد تابع مورد نظر چیست؟