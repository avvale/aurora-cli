# WHERE Operators Reference

## Logical Operators

```typescript
// AND - All conditions must match
{
    where: {
        "[and]": [
            { status: "PRODUCTION" },
            { year: { "[gte]": 2020 } }
        ]
    }
}

// OR - Any condition must match
{
    where: {
        "[or]": [
            { status: "PRODUCTION" },
            { status: "PREPRODUCTION" }
        ]
    }
}

// NOT - Negate condition
{
    where: {
        "[not]": {
            deletedAt: { "[is]": null }
        }
    }
}
```

## Equality & Nulls

```typescript
// Simple equality (implicit [eq])
{ where: { id: "uuid-here" } }

// Explicit equality
{ where: { id: { "[eq]": "uuid-here" } } }

// Not equal
{ where: { status: { "[ne]": "DISCLAIMER" } } }

// IS NULL / IS NOT NULL
{ where: { deletedAt: { "[is]": null } } }
{ where: { deletedAt: { "[is]": "[not]null" } } }
```

## Comparison Operators

```typescript
// Greater than
{ where: { year: { "[gt]": 2020 } } }

// Greater than or equal
{ where: { year: { "[gte]": 2020 } } }

// Less than
{ where: { year: { "[lt]": 2025 } } }

// Less than or equal
{ where: { year: { "[lte]": 2024 } } }

// Combined range
{
    where: {
        year: {
            "[gte]": 2020,
            "[lte]": 2024
        }
    }
}
```

## Range Operators

```typescript
// BETWEEN (inclusive)
{ where: { year: { "[between]": [2020, 2024] } } }

// NOT BETWEEN
{ where: { year: { "[notBetween]": [2000, 2010] } } }
```

## Set Operators

```typescript
// IN - Value in list
{ where: { status: { "[in]": ["PRODUCTION", "PREPRODUCTION"] } } }

// NOT IN - Value not in list
{ where: { status: { "[notIn]": ["DISCLAIMER", "CONCEPTION"] } } }
```

## String Pattern Matching

```typescript
// LIKE - Case-sensitive pattern (% = wildcard)
{ where: { name: { "[like]": "%Model%" } } }

// NOT LIKE
{ where: { name: { "[notLike]": "Admin%" } } }

// ILIKE - Case-insensitive pattern
{ where: { name: { "[iLike]": "%roadster%" } } }

// NOT ILIKE
{ where: { name: { "[notILike]": "test%" } } }

// STARTS WITH - Convenience for LIKE "value%"
{ where: { name: { "[startsWith]": "Model" } } }

// ENDS WITH - Convenience for LIKE "%value"
{ where: { name: { "[endsWith]": "S" } } }

// SUBSTRING - Convenience for LIKE "%value%"
{ where: { name: { "[substring]": "Air" } } }

// REGEXP - Regular expression
{ where: { sku: { "[regexp]": "^[A-Z]{3}-[0-9]+$" } } }

// IREGEXP - Case-insensitive regex
{ where: { sku: { "[iRegexp]": "abc" } } }
```

## Column Comparison

```typescript
// Compare with another column
{ where: { updatedAt: { "[col]": "createdAt" } } }
```

## Array Operators (PostgreSQL)

```typescript
// OVERLAP - Arrays have common elements
{ where: { tags: { "[overlap]": ["react", "node"] } } }

// CONTAINS - Array contains all specified elements
{ where: { tags: { "[contains]": ["graphql"] } } }

// ANY - Value matches any array element
{ where: { roles: { "[any]": ["admin", "editor"] } } }
```
