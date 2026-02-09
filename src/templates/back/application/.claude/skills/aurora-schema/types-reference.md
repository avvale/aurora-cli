# Type Selection & Varchar Length Standards

## Type Selection Guide

| Use Case            | Type            | Configuration                  | Notes                                         |
| ------------------- | --------------- | ------------------------------ | --------------------------------------------- |
| UUID identifiers    | `id`            | NO `length` property           | **CRITICAL: Never add `length` to `id` type** |
| Short text          | `varchar`       | `maxLength: N`                 | Names, titles, codes                          |
| Long text           | `text`          | -                              | Descriptions, content                         |
| Fixed-length text   | `char`          | `length: N`                    | Country codes, currency                       |
| Passwords           | `password`      | -                              | Auto-hashed by Aurora                         |
| Integer counters    | `int`           | -                              | Standard integers                             |
| Large numbers       | `bigint`        | -                              | > 2 billion                                   |
| Small numbers       | `smallint`      | -                              | 0-255 range                                   |
| Money/decimals      | `decimal`       | `decimals: [precision, scale]` | Never use float for money                     |
| Approximate         | `float`         | -                              | Scientific only                               |
| Date + time         | `timestamp`     | -                              | Most common                                   |
| Date only           | `date`          | -                              | Birthdays, deadlines                          |
| True/false          | `boolean`       | -                              | Use is*/has*/can\* prefix                     |
| Fixed options       | `enum`          | `enumOptions: [...]`           | Document each option                          |
| Structured data     | `json`, `jsonb` | -                              | Use jsonb for PostgreSQL                      |
| Navigation property | `relationship`  | `relationship: {...}`          | One-to-many, many-to-many inverse side        |

## Varchar Length Standards (Byte-Optimized)

**IMPORTANT: When defining varchar fields, ALWAYS use one of these standard lengths.**

These lengths are optimized for PostgreSQL byte storage efficiency:

| Length | Use Case Examples                       | Notes                                  |
| ------ | --------------------------------------- | -------------------------------------- |
| 1      | Single character flags, gender (M/F)    | Minimum length                         |
| 4      | Country codes (US, ES), file extensions | ISO codes                              |
| 8      | Short codes, abbreviations              | Currency codes with margin             |
| 16     | Short identifiers, codes                | 2^4 bytes                              |
| 36     | UUIDs in string format                  | Standard UUID length (8-4-4-4-12)      |
| 64     | Short names, usernames, slugs           | 2^6 bytes                              |
| 128    | Names, titles, email addresses          | 2^7 bytes                              |
| 255    | Standard text fields                    | 2^8 - 1 (single byte length indicator) |
| 382    | Medium text, short descriptions         | 1.5 × 255 (optimized for UTF-8)        |
| 510    | Longer descriptions, addresses          | 2 × 255                                |
| 1022   | Long text that needs indexing           | ~4 × 255 (max recommended for indexes) |
| 2046   | URLs, very long text with length limit  | Max practical URL length (~2048 limit) |

**Why these specific lengths?**

1. **Byte alignment**: PostgreSQL stores varchar with a length prefix. These values optimize storage blocks.
2. **Index compatibility**: Lengths ≤ 2046 can be indexed efficiently in PostgreSQL.
3. **UTF-8 consideration**: Lengths account for multi-byte characters (up to 4 bytes per char).
4. **URL compatibility**: 2046 is just under the 2048 practical limit for URLs.

**Selection guide:**

```yaml
# ❌ Bad - arbitrary lengths
- name: username
  type: varchar
  maxLength: 50

# ✅ Good - byte-optimized lengths
- name: username
  type: varchar
  maxLength: 64
  description: >
    User's display name. Max 64 characters.
```

**Quick reference for common fields:**

| Field Type         | Recommended Length |
| ------------------ | ------------------ |
| UUID as string     | 36                 |
| Username           | 64                 |
| Email              | 128                |
| Name/Title         | 128                |
| Phone              | 64                 |
| Short description  | 255                |
| Address line       | 255                |
| Medium description | 510                |
| Long description   | 1022               |
| URL/Link           | 2046               |
| Slug               | 2046               |
