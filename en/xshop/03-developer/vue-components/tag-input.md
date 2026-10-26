# Tag input

A component for selecting tags.
![tag-input.png](https://raw.githubusercontent.com/4xmen/xshop-docs/refs/heads/master/images/tag-input.webp)
## How to use:

```vue
 <tag-input xname="langs" splitter=",,"
   xtitle="{{__("Programming lang, Press enter")}}"
   xvalue="rust,,php"
   auto-complete="{{route('v1.creator.search','')}}/"
></tag-input>
```

- `xtitle`: A suitable title or placeholder.
- `xvalue`: The default value.
- `splitter`: The separator between tags.
- `auto-complete`: The auto-complete API URL for searching previous entries.