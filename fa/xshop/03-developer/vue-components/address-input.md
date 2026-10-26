# Address input 

کاپوننت انتخاب آدرس به شما اجازه میدهد آدرس مورد نظر خود را به راحتی انتخاب کنید
مقادیر پیش شهر و استان از طریق state, city با طول و عرض جغرافیایی قابل تعریف است.

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
- لینکها آدرس API ویرایش است
- dark-mode رنگبندی کامپوننت رو مشخص می‌کند
- translate ترجمه است