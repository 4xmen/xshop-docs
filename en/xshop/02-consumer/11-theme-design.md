# Theme Design

In this section, you can easily customize all parts of the website and enjoy the changes.

::: warning
It is strongly recommended that you apply Theme changes to a local, non-production version.
:::
Despite the recommendation above, these editing features are also available in the production version. You can use them.

## Selecting an Area

![theme-list.webp](../../../images/theme-list.webp)

This section contains all the available sections so you can customize different Areas as needed.
The list of Areas is displayed here.

### Special Sections:

- Default header: Specifies the site's default header, not a complete Area
- Default footer: Specifies the site's default footer, not a complete Area
- Preloader: Displays a preloader on all pages
- Floats: Provides floating sections on all pages.
- Build assets: Automatically runs the theme build commands. It is recommended that you do not use this in the production version.
- The Rounded button at the end, with a code icon, displays the Segment list and Theme sections in one Area.
- The other sections correspond to different parts of the site.

## Editing an Area
![theme-edit.webp](../../../images/theme-edit.webp)

Details for editing an Area:

- Use default: Specifies whether to use the default header and footer
- Below are all the sections, or Theme Parts, with the following options:
  - Delete
  - Edit, meaning replace it with another Segment
  - Reorder
- There is also an add button at the end

### Editing or Adding a Part

When you click Add or Edit, a list of permitted Theme Parts is displayed.

1. You can select a part by viewing its preview.
2. You can use search or filters.
3. After selecting a part, click the Save button at the bottom.

### What Happens After Saving

After saving, the Theme section's settings will be updated according to your requirements. You can then update the settings for the Theme sections.

After completing all edits, click the Build Assets button to apply the final changes, or run the following commands:

```bash
php artisan client
pnpm run build # or npm
```