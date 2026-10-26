# Group Management Guide 

## Page Introduction

Groups are used to categorize and organize site posts. Each group can have a name, subtitle, description, image, and settings related to its display and SEO. You can also create a parent-child hierarchy.

The group editing page lets you manage the group's information, configure its appearance in supported areas of the theme, and, if needed, define Schema Markup for related posts or for the group page itself.

Figure 1 - The group editing page (Edit group) and its numbered sections.

## 1. General Group Information

This section is used to manage the group's basic information.

| Field | Purpose |
| ------------ | ----------------------------------------------------------------------------------------------------------------------------------------- |
| Group name | Specifies the group name. |
| Group slug | The text identifier used in the group's URL. According to the panel's guidance, if this field is empty, its value is generated automatically. |
| Subtitle | Specifies the group's subtitle. |
| Group Parent | Selects the parent group to create a hierarchical structure. If there is no parent, select `No parent`. |
| Hide in menu | Specifies whether the group should be hidden in menus that display subgroups. This option alone does not mean that the group page is disabled. |
| Description | Stores the group's description. This field uses a text editor for writing and formatting content. |

The group name, subtitle, and description support multilingual content.

Note: To place a group under another group, select the appropriate value in the `Group Parent` field. If it is a top-level group, you can leave it without a parent.

## 2. Feature Image

This section is used to select the group's main image. The feature image may appear in lists or in site areas where the theme uses an image to display a group.

Use the file upload option in this section to select an image.

## 3. Background Image 

In this section, you can select the group's background image. Some themes and design layouts can use this image.

Whether the background image is displayed depends on whether the theme supports this feature. Selecting an image therefore does not necessarily mean it will appear on every page or in every area of the site.

## 4. Attachments

This section is used to manage attachments related to the group.

Use the add attachment button to start adding an attachment. The number next to the button indicates how many attachments are displayed in this section.

The types of attachments available and how they are displayed depend on the panel's attachment features.

## 5. Canonical URL

The `Canonical` field is used to enter the canonical URL of the group page in the SEO settings.

This URL helps search engines identify the canonical version of the page, especially when similar pages or different URLs contain the same content.

Note: The URL you enter should match the page you intend to designate as the canonical version.

## 6. Configuring a Custom Group Theme

The gray button next to the page title, marked with a color palette icon, provides access to the custom theme settings for the group.

This feature is used to customize the group's appearance and may allow it to look different from the site's general theme.

These settings apply only to this group. The available options and how each setting is applied depend on the theme settings page's features.

## Schema Markup

The group editing page has two Schema Markup editors, each with a separate purpose:

### Schema Markup for Posts in This Group

The first editor, titled `Markup schema for posts of this group`, is used to define the default Schema Markup for posts related to the group, if the application logic uses this setting.

### Schema Markup for the Group Page

The second editor, titled `Markup schema`, is used to define the Schema Markup for the group page itself.

Both sections allow you to enter Schema code and use replaceable variables. You can also add multiple schemas to one editor.

For information about inserting variables, using the buttons above the editor, selecting a Syntax, and how the Reset button works, see the documentation on using the Schema Markup editor.

## Saving Changes

After completing the information and configuring the required sections, click the Save button at the bottom of the page.

Before saving, it is a good idea to check the group name and URL, parent group, images, Canonical URL, and Schema Markup settings to make sure they match your intended configuration.