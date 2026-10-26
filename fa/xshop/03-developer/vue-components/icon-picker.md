# Icon picker
سیستم دارای دو نوع انتخاب گر آیکون دارد awesome یا remix icon:

- FontAwesomeIconPicker.vue
- RemixIconPicker.vue

نحوه نمایش و استفاده هر دو یک شکل است:

![icon-picker.png](https://raw.githubusercontent.com/4xmen/xshop-docs/refs/heads/master/images/icon-picker.webp)

## How to use

```vue
 <remix-icon-picker xname="icon"
   xvalue="ri-remixicon-line"></remix-icon-picker>

<awesome-icon-picker xname="icon" xvalue="fa-user">
</awesome-icon-picker>
```

- xname: نام مورد استفاده در فرم
- xvalue: مقدار آیکون پیش‌فرض

> remix icon فونت آیکون اصلی سامانه است و در صورت نیاز font-awesome حتما باید css آن را فراخوانی کنید.