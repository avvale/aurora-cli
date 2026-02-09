# Indexing Strategies Reference

## B-Tree Index (Default)

```sql
-- Standard index
CREATE INDEX idx_users_email ON users(email);

-- Unique index
CREATE UNIQUE INDEX idx_users_email_unique ON users(email);

-- Partial index (conditional)
CREATE INDEX idx_orders_active ON orders(created_at)
WHERE status = 'active';

-- Multi-column index
CREATE INDEX idx_orders_user_status ON orders(user_id, status);
-- Useful for: WHERE user_id = ? AND status = ?
-- Also for: WHERE user_id = ? (leftmost prefix)
-- NOT useful for: WHERE status = ? (need separate index)

-- Expression index
CREATE INDEX idx_users_email_lower ON users(LOWER(email));
-- Query must match: WHERE LOWER(email) = 'test@example.com'

-- Index with INCLUDE (PostgreSQL 11+)
CREATE INDEX idx_orders_user ON orders(user_id) INCLUDE (status, total);
-- Enables index-only scans including status and total
```

## GIN Index (Generalized Inverted Index)

```sql
-- For JSONB
CREATE INDEX idx_products_metadata ON products USING GIN (metadata);
CREATE INDEX idx_products_metadata_path ON products USING GIN (metadata jsonb_path_ops);
-- jsonb_path_ops: faster @> queries, smaller index, but only supports @>

-- For Arrays
CREATE INDEX idx_products_tags ON products USING GIN (tags);

-- For Full-Text Search
CREATE INDEX idx_articles_fts ON articles USING GIN (to_tsvector('english', title || ' ' || body));

-- For Trigram (similarity search)
CREATE EXTENSION pg_trgm;
CREATE INDEX idx_products_name_trgm ON products USING GIN (name gin_trgm_ops);
```

## GiST Index (Generalized Search Tree)

```sql
-- For geometric types
CREATE INDEX idx_locations_point ON locations USING GiST (coordinates);

-- For range types (exclusion constraints)
CREATE INDEX idx_bookings_during ON bookings USING GiST (during);

-- For full-text search (smaller than GIN, but slower)
CREATE INDEX idx_articles_fts ON articles USING GiST (to_tsvector('english', body));
```

## BRIN Index (Block Range Index)

```sql
-- For naturally ordered data (time-series, append-only)
CREATE INDEX idx_logs_created ON logs USING BRIN (created_at);
-- Very small index size, good for large tables with correlated data
```

## Hash Index

```sql
-- For equality-only comparisons (PostgreSQL 10+)
CREATE INDEX idx_users_id ON users USING HASH (id);
-- Smaller than B-tree for equality, but no range queries
```
