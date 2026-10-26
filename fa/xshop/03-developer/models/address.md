# Address

Model reference · `App\Models\Address`

### 1. Model

مدل آدرس مشتری، برای نگهداری اطلاعات نشانی، موقعیت جغرافیایی و ارتباط آدرس با مشتری، استان و شهر.

### 2. Table: `addresses`

| Field | Type | Nullable | Comment |
|---|---|---|---|
| `id` | bigint unsigned | No | شناسه آدرس |
| `address` | text | No | آدرس کامل |
| `customer_id` | bigint unsigned | No | شناسه مشتری |
| `lat` | double | Yes | عرض جغرافیایی |
| `lng` | double | Yes | طول جغرافیایی |
| `state_id` | bigint unsigned | Yes | شناسه استان |
| `city_id` | bigint unsigned | Yes | شناسه شهر |
| `data` | longtext (JSON) | Yes | اطلاعات اضافی آدرس |
| `zip` | varchar(255) | Yes | کد پستی |
| `created_at` | timestamp | Yes | زمان ایجاد |
| `updated_at` | timestamp | Yes | زمان آخرین ویرایش |
| `deleted_at` | timestamp | Yes | زمان حذف نرم |

### 3. Extra description of table fields

**`addresses.address`**

آدرس کامل مشتری را نگهداری می‌کند.

**`addresses.customer_id`**

مشخص می‌کند این آدرس متعلق به کدام مشتری است. این فیلد به جدول `customers` ارجاع می‌دهد. مستندات مدل مرتبط: [Customer](./customer.md).

**`addresses.state_id`**

استان مرتبط با آدرس را مشخص می‌کند و به جدول `states` ارجاع می‌دهد. این فیلد اختیاری است. مستندات مدل مرتبط: [State](state.md).

**`addresses.city_id`**

شهر مرتبط با آدرس را مشخص می‌کند و به جدول `cities` ارجاع می‌دهد. این فیلد اختیاری است. مستندات مدل مرتبط: [City](city.md).

**`addresses.lat` و `addresses.lng`**

به‌ترتیب عرض و طول جغرافیایی آدرس را نگهداری می‌کنند. هر دو فیلد اختیاری هستند.

**`addresses.data`**

برای نگهداری اطلاعات اضافی آدرس در قالب JSON در نظر گرفته شده است، اما در حال حاضر کاربرد مشخصی در سیستم ندارد. ممکن است در آینده برای اطلاعات تکمیلی استفاده شود. اعتبار JSON این فیلد با محدودیت `CHECK` در دیتابیس بررسی می‌شود.

**`addresses.zip`**

کد پستی آدرس را نگهداری می‌کند؛ برای کد پستی ایران یا کد پستی در سایر کشورها قابل استفاده است.

**`addresses.deleted_at`**

برای حذف نرم (Soft Delete) استفاده می‌شود.

### 4. Methods

**`state()`**

رابطه‌ی `belongsTo` با مدل `State`؛ استان مرتبط با آدرس را برمی‌گرداند. مستندات: [State](state.md).

**`city()`**

رابطه‌ی `belongsTo` با مدل `City`؛ شهر مرتبط با آدرس را برمی‌گرداند. مستندات: [City](city.md).

**`customer()`**

رابطه‌ی `belongsTo` با مدل `Customer`؛ مشتری مالک آدرس را برمی‌گرداند. مستندات: [Customer](./customer.md).

