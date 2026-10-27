# Fast attachment

این کامپوننت برای پیوست کردن سریع به کار می‌رود به طوری که در صفحه مدل مورد نظر استفاده می‌کند و به صورت ajax آپلود می‌کند:

![fast-attachment.png](https://raw.githubusercontent.com/4xmen/xshop-docs/refs/heads/master/images/fast-attachment.webp)

## چگونگی استفاده

```vue
<fast-attaching
    :attachments='@json($item->attachs)'
    xlang="{{config('app.locale')}}"
    upload-url="{{route('admin.attachment.attaching')}}"
    detach-url="{{route('admin.attachment.detach','')}}/"
    toggle-url="{{route('admin.attachment.toggle-premium','')}}/"
    :can-premium="true"
    model="{{get_class($item)}}"
    id="{{$item->id}}"
></fast-attaching>
```
- attachments : فهرست پیوست‌های پیشین
- xlang: زبان پنل
- url ها برای api تغییرات است
- can-premium: آیا امکان افزودن دکمه پیوست های پرمیوم فعال است
- model: مدل مورد استفاده
- id: آی‌دی مدل فعلی
