# Attachment Management

![attachment.webp](https://raw.githubusercontent.com/4xmen/xshop-docs/refs/heads/master/images/attachment.webp)

The Attachment section is used to upload and manage files that will be displayed on the website, made available for users to download, or linked to different parts of the site, such as posts and products.

On this page, you can enter file details, specify how the file should be displayed on the site, and, if needed, assign it to a specific section of the site.

## 1. Tips — Page Guide

At the top of the sidebar, you will find tips on how to use attachments:

- If you do not want the file to appear in the public list of site attachments and intend to use it only by linking it to other sections, disable **Is fillable**.
- Premium files are intended for customers to download after payment. They should not be made available to everyone like regular files.

## 2. Title, Slug, and Subtitle — Attachment Details

### Title

Enter a title for the file. This helps you identify the attachment in the admin panel and is also used in sections where the file name is displayed.

For example: `News manifest`

### Slug

This is the text identifier used to create the attachment's URL. It is usually generated from the file title.

For example: `news-manifest`

Changing this value may also change the attachment's URL, so avoid changing it after publication unless necessary.

### Subtitle

Enter a brief description of the file in this field. The subtitle can provide additional information about the title.

For example, if the attachment is a training file, you can enter its subject or version here.

## 3. Description — Attachment Description

Use this section to enter a more detailed description of the file. The text editor lets you format the content and use common text-editing features.

Use this section to describe the file's contents, explain its purpose, or provide instructions for downloading and using it.

## 4. File — Uploading and Downloading the File

Upload the attachment's main file in this section. After uploading, details such as the file name, extension, and size will be displayed.

### Download

The Download button lets you download the uploaded file from the admin panel. Use it to check that the file is correct and verify its contents.

### Short Code

Once the file has been saved, a unique code labeled Short Code will be displayed; for example:

`[ATTACHED:2]`

You can copy this code and use it in a post or in a supported text area.

When the content is displayed on the site, the code is replaced with output appropriate to the file type:

- **Image:** The image itself is displayed.
- **Audio file:** An audio player is displayed so users can play the file.
- **Video:** A video player is displayed.
- **Other files:** A download link is displayed.

For example, to place an audio file within an article, simply insert its Short Code at the desired location in the content.

This lets you add a file to site content without manually entering the code needed to display an image, player, or download link.

## 5. Is fillable — Display in the Public List

This option determines whether the attachment appears in the site's public attachment list.

- **Enabled:** The attachment can appear in the site's public attachment list.
- **Disabled:** The attachment is retained for use in other parts of the site without appearing in the public attachment list.

For example, if you uploaded a file solely for use within an article and do not want it to appear separately in the attachment list, disable this option.

Disabling this option does not, by itself, restrict direct access to the file. This setting controls whether the file appears in the public list.

## 6. Is premium — Premium Attachment

Use this option for files that require a purchase or special access to download.

For example, you can mark a training file, exclusive catalog, or downloadable document as a premium attachment intended for customers after payment.

- **Enabled:** The attachment is designated as a premium file.
- **Disabled:** The attachment is treated as a regular file.

Please note that enabling this option does not, by itself, manage purchases or download permissions. Actual access to the file must be controlled by the site's purchase and permission mechanisms.

## 7. Attaching — Linking the Attachment to Site Sections

Use this section to link a file to a specific site entity, such as a post, product, or gallery.

This is useful when you want the file to be recognized as an attachment to a specific section, rather than simply existing as a standalone file on the site.

### Group

This field displays the section or entity associated with the attachment. Depending on the type of link, you may need to select the destination first.

### Search

Use the search field to find the entity to which you want to link the file.

For example, if you want to attach a PDF to a post, search for and select the desired post.

Attachments can be linked to sections such as:

- Products
- Posts
- Groups
- Categories
- Clips
- Galleries
- Creators

After selecting the destination and saving your changes, the file will be associated with the selected entity.

**Note:** Linking a file to a post or product is different from placing its Short Code in the post's content. Linking establishes an association between the file and the entity; the Short Code inserts the file's output at a specific location in the content.

## 8. Saving Changes

After entering the details, uploading the file, and configuring the necessary options, click Save to apply your changes.

Before saving, check that the title and description are correct, the intended file has been uploaded, and the public display, premium, and site-linking options are configured as needed.

## Pre-Save Checklist

- [ ] The file title and subtitle have been entered.
- [ ] Any necessary file description has been added.
- [ ] The correct file has been uploaded.
- [ ] The Short Code is available if you need to use the file in site content.
- [ ] The public-list display setting has been configured.
- [ ] The file's premium status has been set, if needed.
- [ ] The destination has been selected if the file belongs to a post, product, or other section.
- [ ] The changes have been saved.