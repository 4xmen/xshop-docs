# Icon picker

The system has two types of icon pickers: Awesome and Remix Icon:

- FontAwesomeIconPicker.vue
- RemixIconPicker.vue

Both are displayed and used in the same way:

![icon-picker.png](https://raw.githubusercontent.com/4xmen/xshop-docs/refs/heads/master/images/icon-picker.webp)

## How to use

```vue
 <remix-icon-picker xname="icon"
   xvalue="ri-remixicon-line"></remix-icon-picker>

<awesome-icon-picker xname="icon" xvalue="fa-user">
</awesome-icon-picker>
```

- `xname`: The name used in the form.
- `xvalue`: The default icon value.

> Remix Icon is the system's primary icon font. If you need to use Font Awesome, you must load its CSS.