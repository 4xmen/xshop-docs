# GFX

This section configures the overall appearance of the theme on the site. It provides a pattern that nearly all Theme Parts should follow.


::: warning
It is strongly recommended that you apply Theme changes to a local, non-production version.
:::
![gfx.png](https://raw.githubusercontent.com/4xmen/xshop-docs/refs/heads/master/images/gfx.webp)

Descriptions of the different sections:

>All changes you make are visible in real time


- The top section provides mobile and desktop previews of the pages available for preview
- Background color: Specifies the background color
- Primary color: The website's primary color
- Secondary color: The color that complements the primary color
- Text color: The primary text color
- Border radius: Controls the roundness of the corners of nearly all site elements. It has three sections:
    - 1: Rounds all four sides at the same time
    - 2: Rounds two diagonal corners
    - 3: Sets each of the four corners individually
- Shadow: Configures the standard shadow for elements
- Container: Specifies the container style: fluid or standard
- The last section configures the font. The default is vazirmatin; you can add your preferred font

>After editing, be sure to save your changes.

::: info
Important note: If applying changes fails, you must build the theme. The following commands are required in this case:
:::

```bash
php artisan client
pnpm run build # or npm
```