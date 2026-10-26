# Tag input
یک کامپوننت برای انتخاب تگ هست
![tag-input.png](https://raw.githubusercontent.com/4xmen/xshop-docs/refs/heads/master/images/tag-input.webp)
## How to use:

```vue
 <tag-input xname="langs" splitter=",,"
   xtitle="{{__("Programming lang, Press enter")}}"
   xvalue="rust,,php"
   auto-complete="{{route('v1.creator.search','')}}/"
></tag-input>
```

- xtitle: عنوان یا place holder مناسب
- xvalue: مقدار پیش فرض
- splitter: جدا کننده بین تگ ها
- auto-complete: آدرس api auto complete برای جستجو موارد قبلی