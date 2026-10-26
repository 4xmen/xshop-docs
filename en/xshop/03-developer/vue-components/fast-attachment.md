# Fast attachment

This component is used to attach files quickly. It is used on the page for the relevant model and uploads files via AJAX:

![fast-attachment.png](../../images/fast-attachment.webp)

## How to use

```vue
<fast-attaching
    :attachments='@json($item->attachs)'
    xlang="{{config('app.locale')}}"
    upload-url="{{route('admin.attachment.attaching')}}"
    detach-url="{{route('admin.attachment.detach','')}}/"
    toggle-url="{{route('admin.attachment.toggle-premium','')}}/"
    :can-premium="true"
    model="{{get_class($item)}}"
    id="{{$item->id}}"
></fast-attaching>
```
- `attachments`: List of previously attached files.
- `xlang`: The panel language.
- The URLs are for the change APIs.
- `can-premium`: Specifies whether the option to add premium attachment buttons is enabled.
- `model`: The model to use.
- `id`: The ID of the current model.