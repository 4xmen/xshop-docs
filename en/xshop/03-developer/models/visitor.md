# Visitor

The `Visitor` model is used to record visitor information and collect data about their browser, operating system, referral source, and visited page. This information can be used to display site traffic statistics and analyze visitors' overall behavior.

## Data structure

| Field | Type | Nullable | Description |
|---|---|---|---|
| `id` | BIGINT UNSIGNED | No | Unique record ID |
| `ip` | VARCHAR(45) | No | Visitor's IP address |
| `visit` | INT UNSIGNED | No | Number of visits recorded for the IP within the time period used by the system; defaults to `1` |
| `browser` | ENUM('Firefox', 'FirFox', 'Chrome', 'Edge', 'Opera', 'Brave', 'Safari', 'Internet Explorer', 'DeepNet Explorer', 'Flock', 'Maxthon', 'Avant Browser', 'AOL', 'Vivaldi', 'UC Browser', 'Yandex Browser', 'Samsung Internet', 'other') | Yes | Visitor's browser name |
| `os` | ENUM('Linux', 'Windows 11', 'Windows 10', 'Mac OS X', 'Android', 'iOS', 'Windows 8.1', 'Windows 8', 'Windows 7', 'Windows Vista', 'Windows Server 2003/XP x64', 'Windows XP', 'Windows 2000', 'Windows ME', 'Windows 98', 'Windows 95', 'Windows CE', 'Windows (iPhone/iPad)', 'Mac OS', 'Ubuntu', 'Linux Mint', 'Debian', 'Fedora', 'Red Hat', 'SuSE', 'webOS', 'BlackBerry', 'Symbian', 'FreeBSD', 'OpenBSD', 'NetBSD', 'SunOS', 'OpenSolaris', 'Chrome OS', 'bot') | Yes | Visitor's operating system |
| `engine` | ENUM('google', 'bing', 'yahoo', 'yandex', 'baidu', 'duckduckgo', 'ask', 'aol', 'naver', 'ecosia') | Yes | Search engine identified as the referral source, if detected |
| `version` | VARCHAR(255) | Yes | Browser version |
| `display` | VARCHAR(255) | Yes | Screen resolution information |
| `keywords` | VARCHAR(255) | Yes | Search term identified from search engine parameters |
| `referer` | VARCHAR(255) | Yes | URL of the referring page or site |
| `is_mobile` | TINYINT(1) | No | Specifies whether the visit came from a mobile device |
| `page` | VARCHAR(255) | Yes | Route name of the current or most recently visited page |
| `created_at` | TIMESTAMP | Yes | Record creation time |
| `updated_at` | TIMESTAMP | Yes | Last record update time |

## Properties

### `$engines`

Specifies the list of detectable search engines and the parameters associated with their search terms.

### `$browserList`

Specifies the list of patterns used to identify browsers from User-Agent information.

### `$osList`

Specifies the list of patterns used to identify operating systems from User-Agent information.

## Notes

- The `browser` and `os` fields are of type `ENUM`; their stored values are limited to the options defined in the table structure.
- Browser, operating system, and search engine detection depends on the information sent with the request and the detection patterns; therefore, the result may not always be accurate.
- The `keywords` field can be used only when the search term can be extracted from the available information.
- The `page` field stores the Route name, not necessarily the full page URL.
- The table has no dedicated indexes for IP, date, or other statistical fields; if the data volume grows, query patterns should be considered when designing indexes.