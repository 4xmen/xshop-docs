# BlockAIBots Middleware

This Middleware is used to prevent crawlers and bots associated with artificial intelligence from accessing the website's visitor-facing sections. Its purpose is to restrict access for bots that collect web page content, index information, or use content in AI-powered services.

The ability to block these bots is configurable and can be controlled through the `BLOCK_AI_BOTS` setting in the `.env` file. This feature is disabled by default. When it is not enabled, requests proceed through the normal processing path without this Middleware performing its specific checks. Therefore, access restrictions for AI bots can be enabled or disabled without changing the Middleware's logic.

When this feature is enabled, the Middleware checks the request's `User-Agent` value and compares it against a list of known patterns used to identify AI-related bots and crawlers. This list includes identifiers for services such as OpenAI, Anthropic, Perplexity, Google, and other crawlers and content-collection tools. The comparison is case-insensitive, and matching any one of the patterns is sufficient to identify the request as one to be blocked.

If the request matches one of the defined patterns, access is denied and an HTTP response with the `403 Forbidden` status code is returned. The blocking event is also recorded in the application logs. The recorded information includes the requester's IP address, the `User-Agent` value, the full request URL, and the pattern that identified the bot. This information can be used to review blocked requests and investigate crawler activity.

This Middleware makes decisions solely on the identification information declared in the `User-Agent` header. Therefore, its identification is not definitive: bots using unknown identifiers or changing the value of this header may not be detected. In addition, matching a pattern alone does not verify the requester's actual identity, and some non-bot requests may also match the defined patterns.

Overall, `BlockAIBots` is a control layer for managing access to the website by known AI crawlers. It supports optional activation, blocks requests matching the defined patterns, and logs blocking events. This Middleware is not a substitute for authentication mechanisms, access permissions, or other security measures, and its scope is limited to checking requests' `User-Agent` values.


## how to active

To activate `BlockAIBots`, add the following variable to the project's `.env` file or change its value:

```
BLOCK_AI_BOTS=true
```

This variable is read in the `config/app.php` configuration file, and its value is assigned to the `privacy.block_ai_bots` key. The default value for this setting is `false`; therefore, if the variable is not defined in the `.env` file, the blocking feature will be disabled.

To disable the feature, set the variable to:

```
BLOCK_AI_BOTS=false
```

Note: If the project uses Laravel's configuration cache, the configuration cache must be updated after changing the `.env` value; for example, by running the `php artisan config:clear` command. In environments where cached configuration is loaded, changing the `.env` file alone may not take effect immediately.

After activation, requests whose `User-Agent` values match one of the defined patterns for AI bots and crawlers are blocked with a `403 Forbidden` response, and their events are recorded in the application logs.