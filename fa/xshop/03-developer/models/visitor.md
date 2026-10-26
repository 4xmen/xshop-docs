# Visitor

مدل `Visitor` برای ثبت اطلاعات بازدیدکنندگان و جمع‌آوری داده‌های مربوط به مرورگر، سیستم‌عامل، منبع ورود و صفحه بازدیدشده استفاده می‌شود. این اطلاعات می‌توانند برای نمایش آمار بازدید سایت و تحلیل رفتار کلی بازدیدکنندگان به کار بروند.

## ساختار داده

| فیلد | نوع | Nullable | توضیحات |
|---|---|---|---|
| `id` | BIGINT UNSIGNED | خیر | شناسه یکتای رکورد |
| `ip` | VARCHAR(45) | خیر | آدرس IP بازدیدکننده |
| `visit` | INT UNSIGNED | خیر | تعداد بازدیدهای ثبت‌شده برای IP در محدوده زمانی مورد استفاده سیستم؛ مقدار پیش‌فرض `1` |
| `browser` | ENUM('Firefox', 'FirFox', 'Chrome', 'Edge', 'Opera', 'Brave', 'Safari', 'Internet Explorer', 'DeepNet Explorer', 'Flock', 'Maxthon', 'Avant Browser', 'AOL', 'Vivaldi', 'UC Browser', 'Yandex Browser', 'Samsung Internet', 'other') | بله | نام مرورگر بازدیدکننده |
| `os` | ENUM('Linux', 'Windows 11', 'Windows 10', 'Mac OS X', 'Android', 'iOS', 'Windows 8.1', 'Windows 8', 'Windows 7', 'Windows Vista', 'Windows Server 2003/XP x64', 'Windows XP', 'Windows 2000', 'Windows ME', 'Windows 98', 'Windows 95', 'Windows CE', 'Windows (iPhone/iPad)', 'Mac OS', 'Ubuntu', 'Linux Mint', 'Debian', 'Fedora', 'Red Hat', 'SuSE', 'webOS', 'BlackBerry', 'Symbian', 'FreeBSD', 'OpenBSD', 'NetBSD', 'SunOS', 'OpenSolaris', 'Chrome OS', 'bot') | بله | سیستم‌عامل بازدیدکننده |
| `engine` | ENUM('google', 'bing', 'yahoo', 'yandex', 'baidu', 'duckduckgo', 'ask', 'aol', 'naver', 'ecosia') | بله | موتور جست‌وجوی منبع ورود، در صورت شناسایی |
| `version` | VARCHAR(255) | بله | نسخه مرورگر |
| `display` | VARCHAR(255) | بله | اطلاعات وضوح صفحه‌نمایش |
| `keywords` | VARCHAR(255) | بله | عبارت جست‌وجوی شناسایی‌شده از پارامترهای موتور جست‌وجو |
| `referer` | VARCHAR(255) | بله | آدرس صفحه یا سایت ارجاع‌دهنده |
| `is_mobile` | TINYINT(1) | خیر | مشخص می‌کند بازدید از دستگاه موبایل بوده است یا خیر |
| `page` | VARCHAR(255) | بله | نام Route صفحه فعلی یا آخرین صفحه بازدیدشده |
| `created_at` | TIMESTAMP | بله | زمان ایجاد رکورد |
| `updated_at` | TIMESTAMP | بله | زمان آخرین به‌روزرسانی رکورد |
## ویژگی‌ها

### `$engines`

فهرست موتورهای جست‌وجوی قابل شناسایی و پارامترهای مربوط به عبارت جست‌وجوی آن‌ها را مشخص می‌کند.

### `$browserList`

فهرست الگوهای مورد استفاده برای شناسایی مرورگر از اطلاعات User-Agent را مشخص می‌کند.

### `$osList`

فهرست الگوهای مورد استفاده برای شناسایی سیستم‌عامل از اطلاعات User-Agent را مشخص می‌کند.

## نکات

- فیلدهای `browser` و `os` از نوع `ENUM` هستند؛ مقادیر قابل ذخیره در آن‌ها به گزینه‌های تعریف‌شده در ساختار جدول محدود می‌شوند.
- شناسایی مرورگر، سیستم‌عامل و موتور جست‌وجو به اطلاعات ارسالی درخواست و الگوهای تشخیص وابسته است؛ بنابراین نتیجه لزوماً در تمام شرایط دقیق نیست.
- فیلد `keywords` تنها زمانی قابل استفاده است که عبارت جست‌وجو از اطلاعات در دسترس قابل استخراج باشد.
- فیلد `page` نام Route را نگهداری می‌کند، نه لزوماً URL کامل صفحه.
- جدول فاقد ایندکس اختصاصی برای IP، تاریخ یا سایر فیلدهای آماری است؛ در صورت افزایش حجم داده، الگوی کوئری‌ها باید در طراحی ایندکس‌ها لحاظ شود.
