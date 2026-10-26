# Site Settings Management Guide

## Introduction

The settings management page is used to view, edit, and add settings for different parts of the site. From this page, you can manage existing settings by group, create new settings, save changes, and clear the site's settings and Blade caches.

## Getting to Know the Page
![setting-page.webp](https://raw.githubusercontent.com/4xmen/xshop-docs/refs/heads/master/images/setting-page.webp)
### 1. Selecting a Settings Section

The **Sections** area displays the different settings sections. To view and edit a section's settings, simply select the section you want.

The default sections are:

- **General:** General site settings
- **Media:** Settings related to media
- **SEO:** SEO settings
- **SMS:** Settings related to text messages
- **Theme:** Theme and component settings

When you select a section, its settings appear in the editing area.

### 2. Viewing and Editing Settings

After you select a section, its settings appear in the main area of the page. Each setting has an appropriate input for viewing or editing its value, based on its defined type.

To edit a setting:

1. Select the section you want from **Sections**.
2. Find the setting in the main area of the page.
3. Change its value.
4. When you have finished making changes, use the settings save button to apply them.

For example, in the **SEO** section, you can view and edit settings such as keywords, descriptions, the Google Webmaster code, and other related options.

### 3. Adding New Settings

The **Add new setting** area is used to define a new setting in the admin panel.

To add a new setting, enter the following information:

| Field | Description |
|---|---|
| `Section` | The section where the new setting should be placed. |
| `Type` | The setting type and the input used to receive its value. |
| `Title` | The title displayed for the setting in the admin panel. |
| `Key` | The setting's unique key, used to identify and access it in the system. |
| `Size` | The size allocated to the setting in the page layout, from 1 to 12. |

After completing the fields, click **Add to setting** to add the setting to the settings list.

**Note:** The `Key` value must be unique. You cannot assign the same key to two settings, even if they belong to different sections.

Treat adding a setting to the list as separate from saving the changes permanently. To apply the changes, use the settings save button.

### 4. Saving Settings for All Sections

The settings save button, shown with a save icon at the bottom of the page, is used to apply setting changes.

This button saves changes to settings across different sections all at once, so there is no need to save each section separately.

Recommended workflow:

1. Edit the settings in the sections you need.
2. Add new settings if necessary.
3. When you have finished making changes, click the save button.

To avoid losing changes, make sure they have been saved before leaving the page or finishing your work.

### 5. Clearing the Site's Settings and Blade Caches

The **Clear caches** button in the Tips area is used to clear the settings cache and the site's Blade cache.

To use this feature:

1. If you have made changes, save them first.
2. Click **Clear caches**.

This operation clears the caches related to settings and the site's Blade.

## Recommended Workflow for Managing Settings

Follow these steps to manage the site's settings:

1. Select the section you want from **Sections**.
2. Edit existing settings or create a new setting in **Add new setting**.
3. When you have finished making changes, save the settings using the save button.
4. If necessary, clear the site's settings and Blade caches using **Clear caches**.