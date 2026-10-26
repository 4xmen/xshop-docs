# GuestLog

Records site guest events to control request volume and prevent excessive use of sensitive features. This information is used to limit requests such as authentication, registration, search, and SMS delivery, helping prevent unnecessary load on the server.

This information is consumed by the system's internal logic and is not displayed in the admin panel.

## `guest_logs` table

| Field | Type | Nullable | Description |
|---|---|---|---|
| `id` | BIGINT UNSIGNED | No | Unique event ID |
| `ip` | VARCHAR(45) | No | IP address of the guest associated with the event; the field length accommodates IPv4 and IPv6 addresses |
| `action` | VARCHAR(255) | No | Type of recorded event |
| `loggable_type` | VARCHAR(255) | Yes | Type of entity associated with the event; part of the polymorphic relationship |
| `loggable_id` | BIGINT UNSIGNED | Yes | ID of the entity associated with the event; part of the polymorphic relationship |
| `created_at` | TIMESTAMP | Yes | Event creation date |
| `updated_at` | TIMESTAMP | Yes | Date the record was last updated |

## Properties and methods

### `$actions`

List of event types defined in the system:

- `login`: Login request
- `register`: Registration request
- `search`: Search request
- `sms`: SMS-related request

This list specifies the event types used by the system.

## Usage

The system uses records in this table to track guest activity and apply limits to sensitive requests. The `ip` field makes it possible to associate events with IP addresses, while the `action`, `loggable_type`, and `loggable_id` fields store information about the event type and its associated entity.

This model does not provide any dedicated methods; its data is consumed directly by the system's internal processes.