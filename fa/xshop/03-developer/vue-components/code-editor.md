# Code editor

سیستمم دارای کد ادیتور است که از طریق پیکربندی app.php قابلیت فعال و غیر فعال شدن را دارد.

زبان های پیش فرض در این قسمت کامپوننت :

- html
- json
- js
- css

![code-editor.png](https://raw.githubusercontent.com/4xmen/xshop-docs/refs/heads/master/images/code-editor.webp)

## How to use

```vue
 <code-editor
    value='{{base64_encode(old('markups', $item->markups)??'')}}'
    xname="markups"
    :btns='@json($item->markupKeywords())'
    default-syntax="html"
></code-editor>
```

- xname نام اطلاعات فرم برای ارسال است
- btn دکمه های جایگزین کردن متن است
- value مقدار پیش فرض
- default-syntax نحو پیش‌فرض ادیتور است