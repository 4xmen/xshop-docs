# Date Range Picker

This component is used to select a date range. It supports both Gregorian and Jalali dates.

![range-picker.png](https://raw.githubusercontent.com/4xmen/xshop-docs/refs/heads/master/images/range-picker.webp)

## How to use

```vue
<vue-date-range-picker-input
    xid="range" xname="range" 
    xshow="date"  xtitle="range title" 
     def-tab="0"
    :xvalue="[1625873581,1626996781]"
></vue-date-range-picker-input>
```

- `xid`: The component ID.
- `xname`: The name used in the form.
- `xshow`: Displays the final value.
  - `date` displays the result in Gregorian format.
  - `pdate` displays the result in Jalali format.
- `def-tab`: The default tab.
- `xvalue`: The default value as a Unix timestamp.