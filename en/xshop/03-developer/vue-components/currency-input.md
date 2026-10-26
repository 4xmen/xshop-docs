# Currency input

This component is used to enter numbers with digit grouping.

![currency-input.png](https://raw.githubusercontent.com/4xmen/xshop-docs/refs/heads/master/images/currency-input.webp)

## How to use

```vue
<div class="col-lg-4 mt-3">
    <div class="form-group">
        <label for="price">
            {{__('Base price')}}
        </label>
        <currency-input xname="price" xid="price" 
        :err="true" xtitle="{{__('Base price')}}"
         :xvalue="5800000"></currency-input>
    </div>
</div>
```

- `xid`: The input ID.
- `xname`: The name used in the form.
- `err`: Specifies whether errors are enabled for this component.
- `xvalue`: Specifies the initial default number.