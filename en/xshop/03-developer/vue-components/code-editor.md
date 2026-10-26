# Code editor

The system has a code editor that can be enabled or disabled through the `app.php` configuration.

The default languages supported by this component are:

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

- `xname` is the name of the form data to submit.
- `btn` is the button for replacing text.
- `value` is the default value.
- `default-syntax` is the editor's default syntax.