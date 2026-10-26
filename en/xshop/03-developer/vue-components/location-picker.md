# Location picker

This component is used to select latitude and longitude on a map:

![location-picker.png](https://raw.githubusercontent.com/4xmen/xshop-docs/refs/heads/master/images/location-picker.webp)

## How to use

```vue
<lat-lng xname="loc" :ilat="10.0" :ilng="10.0" :izoom="5"
     :dark-mode="true"></lat-lng>
```
- `xname`: The name used in the form.
- `ilat`: Latitude.
- `lng`: Longitude.
- `izoom`: The default zoom level.
- `dark-mode`: Specifies the map's brightness.