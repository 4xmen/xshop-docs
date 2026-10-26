# Address

Model reference · `App\Models\Address`

### 1. Model

The customer address model, used to store address and geographic location information and associate an address with a customer, state, and city.

### 2. Table: `addresses`

| Field | Type | Nullable | Comment |
|---|---|---|---|
| `id` | bigint unsigned | No | Address identifier |
| `address` | text | No | Full address |
| `customer_id` | bigint unsigned | No | Customer identifier |
| `lat` | double | Yes | Latitude |
| `lng` | double | Yes | Longitude |
| `state_id` | bigint unsigned | Yes | State identifier |
| `city_id` | bigint unsigned | Yes | City identifier |
| `data` | longtext (JSON) | Yes | Additional address information |
| `zip` | varchar(255) | Yes | ZIP code |
| `created_at` | timestamp | Yes | Creation time |
| `updated_at` | timestamp | Yes | Last edit time |
| `deleted_at` | timestamp | Yes | Soft deletion time |

### 3. Extra description of table fields

**`addresses.address`**

Stores the customer's full address.

**`addresses.customer_id`**

Specifies which customer this address belongs to. This field references the `customers` table. Related model documentation: [Customer](./customer.md).

**`addresses.state_id`**

Specifies the state associated with the address and references the `states` table. This field is optional. Related model documentation: [State](state.md).

**`addresses.city_id`**

Specifies the city associated with the address and references the `cities` table. This field is optional. Related model documentation: [City](city.md).

**`addresses.lat` and `addresses.lng`**

Store the address's latitude and longitude, respectively. Both fields are optional.

**`addresses.data`**

This field is intended to store additional address information in JSON format, but it currently has no defined use in the system. It may be used for supplementary information in the future. The validity of the JSON in this field is checked by a `CHECK` constraint in the database.

**`addresses.zip`**

Stores the address's ZIP code; it can be used for postal codes in Iran or other countries.

**`addresses.deleted_at`**

Used for soft deletion.

### 4. Methods

**`state()`**

A `belongsTo` relationship with the `State` model; returns the state associated with the address. Documentation: [State](state.md).

**`city()`**

A `belongsTo` relationship with the `City` model; returns the city associated with the address. Documentation: [City](city.md).

**`customer()`**

A `belongsTo` relationship with the `Customer` model; returns the customer who owns the address. Documentation: [Customer](./customer.md).