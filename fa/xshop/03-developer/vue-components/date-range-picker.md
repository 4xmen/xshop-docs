# Date Range Picker

این کامپوننت برای انتخاب بازه تاریخی است. که همزمان هم تاریخ میلادی و شمسی را پشتیبانی می‌کند.

![range-picker.png](../../images/range-picker.webp)

## How to use

```vue
<vue-date-range-picker-input
    xid="range" xname="range" 
    xshow="date"  xtitle="range title" 
     def-tab="0"
    :xvalue="[1625873581,1626996781]"
></vue-date-range-picker-input>
```

- xid: آی‌دی کامپوننت
- xname: نام مورد استفاده در فرم
- xshow: نمایش مقدار نهایی
  - `date` برای نمایش میلادی نتیجه
  - `pdate` نمایش هجری شمسی نتیجه
- def-tab: زبانه پیش‌فرض 
- xvalue: مقدار پیش‌فرض به صورت unixtimestamp