# Rate

The `Rate` model is used to store ratings that users assign to different evaluation criteria. Each record specifies who gave a rating, which entity received it, the evaluation criterion it was given under, and the rating value.

## Data structure
| Field | Type | Nullable | Description |
|---|---|---|---|
| `id` | BIGINT UNSIGNED | No | Unique rating ID |
| `rateable_type` | VARCHAR(255) | No | Type of the entity that received the rating |
| `rateable_id` | BIGINT UNSIGNED | No | ID of the entity that received the rating |
| `rater_type` | VARCHAR(255) | No | Type of the entity that submitted the rating |
| `rater_id` | BIGINT UNSIGNED | No | ID of the entity that submitted the rating |
| `rate` | TINYINT | No | Rating value; usually between 1 and 5 |
| `evaluation_id` | BIGINT UNSIGNED | No | ID of the evaluation criterion associated with the rating |
| `created_at` | TIMESTAMP | Yes | Time the rating was submitted |
| `updated_at` | TIMESTAMP | Yes | Time of the last update |

## Relationships

- `evaluation()`: A `belongsTo` relationship with the `Evaluation` model; the evaluation criterion associated with this rating.

## Methods

### `evaluation()`

Returns the `Evaluation` model associated with this rating.

## Notes

- `rateable_type` and `rateable_id` specify **what received the rating**. This structure allows different types of entities to be rated.
- `rater_type` and `rater_id` specify **who submitted the rating**. This structure also supports different types of raters.
- The `rate` value is usually in the range of 1 to 5; however, the table structure does not show a definitive constraint enforcing this range, so validation depends on the application code.
- Each rating is associated with a specific `Evaluation`. Because of the `RESTRICT` foreign key constraint, that evaluation cannot be deleted while related ratings exist.