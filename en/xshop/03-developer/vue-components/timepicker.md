# Time picker

The time picker component is used to select a time only.

![timepicker.png](../../images/timepicker.webp)

## How to use

```vue
    <vue-time-picker :am-pm="false"
     xid="timepicker"
     xname="timepicker"
     :xvalue="78360"
     xtitle="Start time"></vue-time-picker>
```

- `xid`: The component ID.
- `xname`: The name used in the form for submission and storage.
- `xvalue`: Displays the time as a timestamp.
- `xtitle`: The title or placeholder.