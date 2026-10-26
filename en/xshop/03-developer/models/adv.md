# Adv

Model reference · `App\Models\Adv`

### 1. Model

The site advertising management model; used to store ad information, image, destination link, click limit, and publication status.



### 2. Table: `advs`

| Field | Type | Nullable | Comment |
|---|---|---|---|
| `id` | bigint unsigned | No | Ad ID |
| `title` | varchar(255) | No | Ad title |
| `expire` | date | No | Ad expiration date |
| `image` | varchar(255) | No | Ad image name or path |
| `max_click` | int unsigned | No | Maximum permitted number of clicks; default value `0` |
| `click` | int unsigned | No | Number of recorded clicks; default value `0` |
| `status` | tinyint(1) | No | Ad status; default value `0` |
| `link` | varchar(255) | No | Ad destination link |
| `user_id` | bigint unsigned | No | ID of the user who registered or owns the ad |
| `deleted_at` | timestamp | Yes | Soft deletion time |
| `created_at` | timestamp | Yes | Creation time |
| `updated_at` | timestamp | Yes | Last modification time |

### 3. Extra description of table fields

**`advs.title`**

Stores the ad title.

**`advs.expire`**

Specifies the ad expiration date. In the system's logic, an ad may or may not have a specific expiration date; however, the database column is `NOT NULL`, so note that the current Schema does not allow the date to be absent.

This field is cast to the `date` type using the model's `casts`.

**`advs.image`**

Stores the ad image name or path. Model images are stored in separate, categorized paths.

The `imgUrl()` method returns the usable image URL. If the image does not exist, the site's default logo at `assets/upload/logo.svg` is displayed.

**`advs.max_click`**

Specifies the maximum permitted number of clicks for the ad. If this constraint is set and the number of clicks reaches the specified limit, the ad is disabled.

The default value of this field is `0`. The precise meaning of zero, including whether it disables the constraint or allows no clicks for the ad, depends on the implementation logic.

**`advs.click`**

Stores the number of clicks recorded for the ad. This value increases when users click the ad and is used to check the `max_click` constraint.

**`advs.status`**

Specifies the ad status. This field is used in the system to distinguish between statuses such as active, inactive, draft, and under review.

A value of `0` or `false` indicates an inactive status. The interpretation of other values depends on the status logic defined in the system.

**`advs.link`**

Stores the ad destination link. A user's click is first redirected through the main site so the click can be recorded and counted in the system; the user is then redirected to the ad's external destination.

**`advs.user_id`**

Identifies the user who registered or owns the ad. This field references the `users` table.

Related model documentation: [User](user.md).

Deleting the user associated with the ad is not permitted due to the database's `ON DELETE RESTRICT` constraint.

**`advs.deleted_at`**

Used for soft deletion (Soft Delete).

### 4. Methods

**`imgUrl()`**

Returns the ad image URL. The image is retrieved from the storage path for ads. If the image does not exist, the site's default logo at `assets/upload/logo.svg` is returned.