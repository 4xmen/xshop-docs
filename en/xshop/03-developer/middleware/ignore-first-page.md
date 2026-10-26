# IgnoreFirstPage Middleware

This Middleware removes the `page=1` parameter from request URLs. On paginated pages, the first page usually displays the same content that is available without specifying a pagination parameter. Therefore, `?page=1` is unnecessary in the URL and can be removed to prevent different URLs from being created for the same content.

When a request has a `page` parameter with a value of `1`, the Middleware preserves all other request parameters, removes the `page` parameter, and redirects the user to the same URL with the remaining request parameters. For example, `/articles?page=1` is changed to `/articles`, and `/articles?category=news&page=1` redirects to `/articles?category=news`.

In addition to simplifying URLs, this behavior can help maintain URL consistency and prevent duplicate versions of a page from being created during search engine indexing. However, this Middleware alone does not guarantee that duplicate content will be prevented; the outcome also depends on how URLs are managed in other parts of the website.

This Middleware redirects only when the `page` parameter is present and its value is exactly `1`. Other pagination values, including subsequent page numbers, remain unchanged. Other request parameters are also preserved when `page` is removed, so that filters and other URL settings are not lost.

Overall, `IgnoreFirstPage` is a Middleware for consolidating the URLs of paginated pages. By removing the unnecessary first-page parameter, it creates simpler, more consistent URLs.