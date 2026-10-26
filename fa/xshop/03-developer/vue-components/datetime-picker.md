# DateTime Picker

این کامپوننت برای انتخاب تاریخ یا تاریخ و زمان است. که هم زمان هم تاریخ میلادی و شمسی را پشتیبانی می‌کند.

![datepicker.png](https://raw.githubusercontent.com/4xmen/xshop-docs/refs/heads/master/images/datepicker.webp)
![datepicker-persian.png](https://raw.githubusercontent.com/4xmen/xshop-docs/refs/heads/master/images/datepicker-persian.webp)
![datetime-time.png](https://raw.githubusercontent.com/4xmen/xshop-docs/refs/heads/master/images/datetime-time.webp)

## How to use

```vue
<vue-datetime-picker-input
    xid="range" xname="range" 
    xshow="date"  xtitle="range title" 
     def-tab="0"
    :xvalue="1626996781"
    :timepicker="true"
></vue-datetime-picker-input>
```

- xid: آی‌دی کامپوننت
- xname: نام مورد استفاده در فرم
- xshow: نمایش مقدار نهایی
  - `date` برای نمایش میلادی نتیجه
  - `pdate` نمایش هجری شمسی نتیجه
- def-tab: زبانه پیش‌فرض 
- xvalue: مقدار پیش‌فرض به صورت unixtimestamp
- timepicker: انتخاب زمان فعال یا غیر فعال