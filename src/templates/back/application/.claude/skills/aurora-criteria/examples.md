# Complete Examples & Common Patterns

## Example 1: Simple Filter

```typescript
// Find active Tesla models from 2020 onwards
const queryStatement: QueryStatement = {
    where: {
        isActive: true,
        year: { "[gte]": 2020 }
    }
};

await this.repository.get({ queryStatement });
```

## Example 2: Complex Search with Pagination

```typescript
const queryStatement: QueryStatement = {
    where: {
        "[and]": [
            { status: { "[in]": ["PRODUCTION", "PREPRODUCTION"] } },
            { name: { "[iLike]": "%model%" } },
            { deletedAt: { "[is]": null } }
        ]
    },
    order: [
        { year: 'desc' },
        { name: 'asc' }
    ],
    offset: 0,
    limit: 10
};

await this.repository.get({ queryStatement });
```

## Example 3: With Relations and Field Selection

```typescript
const queryStatement: QueryStatement = {
    where: { status: "PRODUCTION" },
    attributes: ['id', 'name', 'year', 'status'],
    include: [{ association: 'units' }],
    order: [{ year: 'desc' }]
};

await this.repository.get({ queryStatement });
```

## Example 4: Constraint Pattern (Security)

```typescript
// User query + System constraint
const queryStatement: QueryStatement = {
    where: { name: { "[startsWith]": "Model" } }
};

const constraint: QueryStatement = {
    where: {
        isActive: true,
        deletedAt: { "[is]": null }
    }
};

await this.repository.get({
    queryStatement,
    constraint  // System applies this regardless of user input
});
```

## Example 5: GraphQL/REST Usage

```graphql
# GraphQL Query
query GetModels($query: QueryStatement) {
  teslaGetModels(query: $query) {
    id
    name
    year
    status
  }
}

# Variables
{
  "query": {
    "where": {
      "year": { "[gte]": 2020 }
    },
    "order": [
      { "year": "desc" }
    ],
    "limit": 10
  }
}
```

```typescript
// REST POST /tesla/model/get
{
    "query": {
        "where": {
            "year": { "[gte]": 2020 }
        },
        "order": [
            { "year": "desc" }
        ],
        "limit": 10
    }
}
```

## Common Patterns

### Paginated List

```typescript
const queryStatement: QueryStatement = {
    where: { deletedAt: { "[is]": null } },
    order: [{ createdAt: 'desc' }],
    offset: (page - 1) * pageSize,
    limit: pageSize
};
```

### Search by Multiple Fields

```typescript
const queryStatement: QueryStatement = {
    where: {
        "[or]": [
            { name: { "[iLike]": `%${searchTerm}%` } },
            { sku: { "[iLike]": `%${searchTerm}%` } },
            { description: { "[iLike]": `%${searchTerm}%` } }
        ]
    }
};
```

### Date Range Filter

```typescript
const queryStatement: QueryStatement = {
    where: {
        createdAt: {
            "[gte]": startDate,
            "[lte]": endDate
        }
    }
};
```

### Active Records Only

```typescript
const queryStatement: QueryStatement = {
    where: {
        "[and]": [
            { isActive: true },
            { deletedAt: { "[is]": null } }
        ]
    }
};
```
