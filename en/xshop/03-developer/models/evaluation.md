# Evaluation

Defines evaluation criteria for various entities in the system. Each evaluation specifies an aspect of an entity that can be rated; for example, criteria such as ergonomics, sound quality, and material quality can be defined for a pair of headphones.

User-submitted scores for each criterion are stored in the `Rate` model. Each criterion can be defined globally or assigned to a specific entity.

## `evaluations` table

| Field | Type | Nullable | Description |
|---|---|---|---|
| `id` | BIGINT UNSIGNED | No | Unique evaluation criterion ID |
| `title` | TEXT | No | Evaluation criterion title, such as sound quality or material quality |
| `evaluationable_type` | VARCHAR(255) | Yes | Type of entity to which the criterion is assigned; part of the polymorphic relationship |
| `evaluationable_id` | BIGINT UNSIGNED | Yes | ID of the entity associated with the criterion; part of the polymorphic relationship |
| `deleted_at` | TIMESTAMP | Yes | Soft-deletion date |
| `created_at` | TIMESTAMP | Yes | Creation date |
| `updated_at` | TIMESTAMP | Yes | Date of last update |

## Properties and methods

### `$translatable`

The `title` field supports storing and retrieving translations.

## Relationship with the rating system

The `Rate` model is associated with this model through the `evaluation_id` field. Each `Rate` record stores a score for one criterion for a specific entity, submitted by one rater.

Criteria can be defined globally or assigned to a specific entity. When displaying a product's ratings, the criteria associated with it are retrieved through the product model's `evaluations()` method.