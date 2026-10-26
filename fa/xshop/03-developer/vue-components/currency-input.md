# Currency input

این کامپوننت برای ورود اعداد با امکان گروه‌بندی اعداد به کار می‌رود.

![currency-input.png](https://raw.githubusercontent.com/4xmen/xshop-docs/refs/heads/master/images/currency-input.webp)

## How to use

```vue
<div class="col-lg-4 mt-3">
    <div class="form-group">
        <label for="price">
            {{__('Base price')}}
        </label>
        <currency-input xname="price" xid="price" 
        :err="true" xtitle="{{__('Base price')}}"
         :xvalue="5800000"></currency-input>
    </div>
</div>
```

- xid : آی‌دی ورودی
- xname: نام مورد استفاده در فرم
- err: آیا error برای این کامپوننت فعال است؟
- xvalue: عدد پیش‌فرض اولیه را مشخص می‌کند.