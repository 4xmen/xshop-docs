# Location picker

کار این کامپوننت انتخاب طول و عرض جغرافیایی با استفاده از نقشه است:

![location-picker.png](../../images/location-picker.webp)

## How to use

```vue
<lat-lng xname="loc" :ilat="10.0" :ilng="10.0" :izoom="5"
     :dark-mode="true"></lat-lng>
```
- xname: نام مورد استفاده در فرم
- ilat: Latitude
- lng: Longitude
- izoom: میزان بزرگنمایی پیش‌فرض
- dark-mode: تعیین روشنایی نقشه