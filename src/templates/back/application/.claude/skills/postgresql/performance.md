# Performance & Schema Design Reference

## EXPLAIN ANALYZE

```sql
-- Basic explain
EXPLAIN SELECT * FROM users WHERE email = 'test@example.com';

-- With actual execution
EXPLAIN ANALYZE SELECT * FROM users WHERE email = 'test@example.com';

-- Full analysis
EXPLAIN (ANALYZE, BUFFERS, FORMAT TEXT)
SELECT * FROM users WHERE email = 'test@example.com';

-- JSON format for tools
EXPLAIN (ANALYZE, BUFFERS, FORMAT JSON)
SELECT * FROM users WHERE email = 'test@example.com';
```

## Understanding EXPLAIN Output

```
Seq Scan         -- Full table scan (usually bad for large tables)
Index Scan       -- Using index (good)
Index Only Scan  -- Covering index (best)
Bitmap Index     -- Multiple index conditions
Nested Loop      -- O(n*m), good for small result sets
Hash Join        -- Good for larger joins
Merge Join       -- Good for pre-sorted data

-- Key metrics
cost=0.00..123.45    -- Start cost..total cost (arbitrary units)
rows=1000            -- Estimated row count
width=100            -- Estimated row width in bytes
actual time=0.1..50  -- Actual start..total time in ms
loops=1              -- Number of executions
```

## Index Optimization

```sql
-- Check index usage
SELECT
    schemaname, tablename, indexname, idx_scan, idx_tup_read, idx_tup_fetch
FROM pg_stat_user_indexes
ORDER BY idx_scan DESC;

-- Find unused indexes
SELECT
    schemaname || '.' || relname AS table,
    indexrelname AS index,
    pg_size_pretty(pg_relation_size(i.indexrelid)) AS size,
    idx_scan as scans
FROM pg_stat_user_indexes ui
JOIN pg_index i ON ui.indexrelid = i.indexrelid
WHERE NOT i.indisunique
AND idx_scan < 50
ORDER BY pg_relation_size(i.indexrelid) DESC;

-- Check if index would help
SELECT * FROM pg_stat_user_tables
WHERE seq_scan > idx_scan
ORDER BY seq_tup_read DESC;
```

## Query Optimization Tips

```sql
-- 1. Use specific columns instead of SELECT *
SELECT id, name, email FROM users;  -- Good
SELECT * FROM users;                 -- Bad

-- 2. Use EXISTS instead of IN for subqueries
SELECT * FROM users u
WHERE EXISTS (SELECT 1 FROM orders o WHERE o.user_id = u.id);

-- 3. Batch operations
INSERT INTO products (name, price) VALUES
    ('A', 10), ('B', 20), ('C', 30);  -- Single multi-row insert

-- 4. Use COPY for bulk loads
COPY products FROM '/path/to/file.csv' WITH (FORMAT csv, HEADER true);

-- 5. Avoid functions on indexed columns in WHERE
WHERE created_at >= '2024-01-01'              -- Good (uses index)
WHERE DATE(created_at) = '2024-01-01'         -- Bad (function prevents index)

-- 6. Use partial indexes for filtered queries
CREATE INDEX idx_active_users ON users(email) WHERE is_active = true;
```

## Connection and Resource Settings

```sql
-- Check current settings
SHOW work_mem;
SHOW shared_buffers;
SHOW effective_cache_size;

-- Set for session (for heavy queries)
SET work_mem = '256MB';
SET maintenance_work_mem = '1GB';

-- Reset
RESET work_mem;
```

## Schema Design Best Practices

### Primary Keys

```sql
-- UUID (recommended for distributed systems)
id UUID PRIMARY KEY DEFAULT gen_random_uuid()

-- BIGSERIAL (for high-volume single-database)
id BIGSERIAL PRIMARY KEY

-- Composite key
PRIMARY KEY (tenant_id, order_id)
```

### Foreign Keys

```sql
-- Basic foreign key
FOREIGN KEY (user_id) REFERENCES users(id)

-- With actions
FOREIGN KEY (user_id) REFERENCES users(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE

-- Options: CASCADE, SET NULL, SET DEFAULT, RESTRICT, NO ACTION
```

### Constraints

```sql
-- Check constraint
CONSTRAINT positive_price CHECK (price > 0)
CONSTRAINT valid_email CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$')

-- Exclusion constraint (no overlapping ranges)
CONSTRAINT no_overlap EXCLUDE USING gist (
    room_id WITH =,
    during WITH &&
)

-- Unique constraint
CONSTRAINT unique_email UNIQUE (email)
CONSTRAINT unique_per_tenant UNIQUE (tenant_id, code)
```

### Partitioning (PostgreSQL 10+)

```sql
-- Range partitioning (by date)
CREATE TABLE orders (
    id UUID NOT NULL,
    created_at TIMESTAMPTZ NOT NULL,
    total NUMERIC(10,2)
) PARTITION BY RANGE (created_at);

CREATE TABLE orders_2024_01 PARTITION OF orders
    FOR VALUES FROM ('2024-01-01') TO ('2024-02-01');

-- List partitioning (by category)
CREATE TABLE products (
    id UUID NOT NULL,
    category TEXT NOT NULL
) PARTITION BY LIST (category);

CREATE TABLE products_electronics PARTITION OF products
    FOR VALUES IN ('electronics', 'computers');

-- Hash partitioning (for even distribution)
CREATE TABLE logs (
    id UUID NOT NULL,
    data JSONB
) PARTITION BY HASH (id);

CREATE TABLE logs_0 PARTITION OF logs FOR VALUES WITH (MODULUS 4, REMAINDER 0);
CREATE TABLE logs_1 PARTITION OF logs FOR VALUES WITH (MODULUS 4, REMAINDER 1);
```

## PostgreSQL Extensions

### Essential Extensions

```sql
-- UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
SELECT uuid_generate_v4();

-- Crypto functions
CREATE EXTENSION IF NOT EXISTS pgcrypto;
SELECT crypt('password', gen_salt('bf'));
SELECT encode(digest('data', 'sha256'), 'hex');

-- Fuzzy string matching
CREATE EXTENSION IF NOT EXISTS pg_trgm;
SELECT similarity('postgresql', 'postgres');
SELECT 'postgresql' % 'postgres';  -- Similarity operator
CREATE INDEX idx_name_trgm ON products USING GIN (name gin_trgm_ops);

-- Case-insensitive text
CREATE EXTENSION IF NOT EXISTS citext;

-- Table statistics
CREATE EXTENSION IF NOT EXISTS pg_stat_statements;
SELECT * FROM pg_stat_statements ORDER BY total_exec_time DESC LIMIT 10;

-- Tablefunc (crosstab/pivot)
CREATE EXTENSION IF NOT EXISTS tablefunc;
```

### Useful Functions from Extensions

```sql
-- pg_trgm: fuzzy search
SELECT * FROM products
WHERE name % 'widgett'  -- Finds 'widget' despite typo
ORDER BY similarity(name, 'widgett') DESC;

-- pgcrypto: password hashing
INSERT INTO users (email, password_hash)
VALUES ('user@example.com', crypt('password123', gen_salt('bf', 12)));

-- Verify password
SELECT * FROM users
WHERE email = 'user@example.com'
AND password_hash = crypt('password123', password_hash);

-- pgcrypto: encryption
SELECT pgp_sym_encrypt('secret data', 'encryption_key');
SELECT pgp_sym_decrypt(encrypted_column, 'encryption_key') FROM secrets;
```
