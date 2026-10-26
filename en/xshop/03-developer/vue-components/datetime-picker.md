# DateTime Picker

This component is used to select a date or a date and time. It supports both Gregorian and Jalali dates and times.

![datepicker.png](../../images/datepicker.webp)
![datepicker-persian.png](../../images/datepicker-persian.webp)
![datetime-time.png](../../images/datetime-time.webp)

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

- `xid`: The component ID.
- `xname`: The name used in the form.
- `xshow`: Displays the final value.
  - `date` displays the result in Gregorian format.
  - `pdate` displays the result in Jalali format.
- `def-tab`: The default tab.
- `xvalue`: The default value as a Unix timestamp.
- `timepicker`: Enables or disables time selection.