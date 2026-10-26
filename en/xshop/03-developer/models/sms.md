# Sms

The `Sms` model is used to log system SMS messages. This table makes it possible to review and track messages, including those related to authentication, messages sent to users, and messages associated with system events such as order placement or confirmation.

This model currently has no dedicated methods, and its data is stored solely for record-keeping and potential review. SMS logs are not currently displayed in the admin panel, but the information is available when needed to investigate sensitive events.

## Data structure
| Field | Type | Nullable | Description |
|---|---|---|---|
| `id` | BIGINT UNSIGNED | No | Unique record ID |
| `mobile` | VARCHAR(15) | No | Mobile number for which the SMS was logged |
| `text` | TEXT | No | SMS text |
| `code` | VARCHAR(50) | Yes | Code associated with the SMS; for authentication messages, a separate code is stored in this field |
| `ip` | VARCHAR(45) | No | IP address associated with the request or SMS-sending process |
| `user` | ENUM('user', 'system') | No | SMS category based on its origin: `user` or `system` |
| `created_at` | TIMESTAMP | Yes | Log creation time |
| `updated_at` | TIMESTAMP | Yes | Time of last update |

## Meaning of the `user` field

The `user` field indicates which category the SMS belongs to:

- `user`: Messages associated with a user request.
- `system`: Messages associated with system processes; for example, notifications about order placement or confirmation. This category may also include messages related to an administrator or other parts of the system.

This field categorizes the SMS; it does not, by itself, identify the person who sent or received it.

## Tracking and troubleshooting

The information recorded in this table can be useful when investigating issues or sensitive events. For example, the mobile number, SMS text, log time, and IP address can help review message history.

In addition to being recorded in the `sms` table, the IP address is stored as supplementary information through the `GuestLog` mechanism to allow more detailed tracking when needed.

## Notes

- This table serves as an SMS log; displaying it in the admin panel has not been implemented.
- The `code` field is intended to store codes associated with SMS messages, including authentication codes.
- The presence of a record in this table does not, by itself, prove that the SMS was delivered to the destination phone. The table stores the recorded SMS history.