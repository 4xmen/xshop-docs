# Address input

The address selection component lets you easily select the address you want.
The default province and city values can be defined through `state` and `city`, along with latitude and longitude.

![address-input.png](https://raw.githubusercontent.com/4xmen/xshop-docs/refs/heads/master/images/address-input.webp)

## How to use

```vue
 <address-input
    list-link="{{route('admin.address.customer',$item->id)}}"
    add-link="{{route('admin.address.store',$item->id)}}"
    update-link="{{route('admin.address.update','')}}"
    rem-link="{{route('admin.address.destroy','')}}"
    state-link="{{route('v1.state.index')}}"
    cities-link="{{route('v1.state.show','')}}"
    :dark-mode="true"
    :translate='{{vueTranslate([
    'addr-editor' => __('Address editor'),
    'state' => __('State'),
    'city' => __('City'),
    'address' => __('Address'),
    'post-code' => __('Post code'),
    ])}}'
></address-input>
```
- The links are the addresses of the editing APIs.
- `dark-mode` specifies the component's color scheme.
- `translate` provides the translations.