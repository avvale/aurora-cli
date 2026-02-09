# Advanced Queries Reference

## Full-Text Search

### Basic Setup

```sql
-- Create tsvector column
ALTER TABLE articles ADD COLUMN search_vector tsvector;

-- Populate tsvector
UPDATE articles SET search_vector =
    setweight(to_tsvector('english', COALESCE(title, '')), 'A') ||
    setweight(to_tsvector('english', COALESCE(body, '')), 'B');

-- Create GIN index
CREATE INDEX idx_articles_search ON articles USING GIN (search_vector);

-- Keep updated with trigger
CREATE FUNCTION articles_search_trigger() RETURNS trigger AS $$
BEGIN
    NEW.search_vector :=
        setweight(to_tsvector('english', COALESCE(NEW.title, '')), 'A') ||
        setweight(to_tsvector('english', COALESCE(NEW.body, '')), 'B');
    RETURN NEW;
END
$$ LANGUAGE plpgsql;

CREATE TRIGGER tsvector_update BEFORE INSERT OR UPDATE
ON articles FOR EACH ROW EXECUTE FUNCTION articles_search_trigger();
```

### Search Queries

```sql
-- Basic search
SELECT * FROM articles
WHERE search_vector @@ to_tsquery('english', 'postgresql & database');

-- Phrase search
SELECT * FROM articles
WHERE search_vector @@ phraseto_tsquery('english', 'full text search');

-- Websearch syntax (PostgreSQL 11+)
SELECT * FROM articles
WHERE search_vector @@ websearch_to_tsquery('english', 'postgres -oracle "full text"');

-- Ranking results
SELECT title, ts_rank(search_vector, query) AS rank
FROM articles, to_tsquery('english', 'postgresql') AS query
WHERE search_vector @@ query
ORDER BY rank DESC;

-- Highlighting matches
SELECT ts_headline('english', body, to_tsquery('english', 'postgresql'),
    'StartSel=<mark>, StopSel=</mark>, MaxWords=35, MinWords=15')
FROM articles WHERE search_vector @@ to_tsquery('english', 'postgresql');
```

### tsquery Operators

```sql
'postgresql & database'    -- AND
'postgresql | mysql'       -- OR
'!oracle'                  -- NOT
'postgresql <-> database'  -- FOLLOWED BY (adjacent)
'postgresql <2> database'  -- FOLLOWED BY within 2 words
```

## Common Table Expressions (CTEs)

### Basic CTE

```sql
WITH active_users AS (
    SELECT id, name, email
    FROM users
    WHERE is_active = true
)
SELECT * FROM active_users WHERE email LIKE '%@company.com';
```

### Multiple CTEs

```sql
WITH
    active_users AS (
        SELECT id, name FROM users WHERE is_active = true
    ),
    user_orders AS (
        SELECT user_id, COUNT(*) as order_count
        FROM orders
        GROUP BY user_id
    )
SELECT u.name, COALESCE(o.order_count, 0) as orders
FROM active_users u
LEFT JOIN user_orders o ON u.id = o.user_id;
```

### Recursive CTE

```sql
-- Hierarchical data (org chart, categories, etc.)
WITH RECURSIVE category_tree AS (
    -- Anchor member (root categories)
    SELECT id, name, parent_id, 1 AS level, ARRAY[id] AS path
    FROM categories
    WHERE parent_id IS NULL

    UNION ALL

    -- Recursive member
    SELECT c.id, c.name, c.parent_id, ct.level + 1, ct.path || c.id
    FROM categories c
    INNER JOIN category_tree ct ON c.parent_id = ct.id
    WHERE NOT c.id = ANY(ct.path)  -- Prevent cycles
)
SELECT * FROM category_tree ORDER BY path;
```

### Materialized CTE (PostgreSQL 12+)

```sql
-- Force CTE to be materialized (computed once)
WITH active_users AS MATERIALIZED (
    SELECT * FROM users WHERE is_active = true
)
SELECT * FROM active_users;

-- Force CTE to be inlined (merged into main query)
WITH active_users AS NOT MATERIALIZED (
    SELECT * FROM users WHERE is_active = true
)
SELECT * FROM active_users;
```

## Window Functions

### Ranking Functions

```sql
-- ROW_NUMBER: unique sequential number
SELECT name, department, salary,
    ROW_NUMBER() OVER (PARTITION BY department ORDER BY salary DESC) as row_num
FROM employees;

-- RANK: same rank for ties, gaps after
SELECT name, department, salary,
    RANK() OVER (PARTITION BY department ORDER BY salary DESC) as rank
FROM employees;

-- DENSE_RANK: same rank for ties, no gaps
SELECT name, department, salary,
    DENSE_RANK() OVER (PARTITION BY department ORDER BY salary DESC) as dense_rank
FROM employees;

-- NTILE: divide into n buckets
SELECT name, salary,
    NTILE(4) OVER (ORDER BY salary) as quartile
FROM employees;
```

### Aggregate Window Functions

```sql
SELECT name, department, salary,
    SUM(salary) OVER (PARTITION BY department) as dept_total,
    AVG(salary) OVER (PARTITION BY department) as dept_avg,
    COUNT(*) OVER (PARTITION BY department) as dept_count,
    salary::numeric / SUM(salary) OVER (PARTITION BY department) * 100 as pct_of_dept
FROM employees;
```

### Navigation Functions

```sql
-- LAG: previous row value
SELECT date, revenue,
    LAG(revenue, 1, 0) OVER (ORDER BY date) as prev_revenue,
    revenue - LAG(revenue, 1, 0) OVER (ORDER BY date) as revenue_change
FROM daily_sales;

-- LEAD: next row value
SELECT date, revenue,
    LEAD(revenue, 1) OVER (ORDER BY date) as next_revenue
FROM daily_sales;

-- FIRST_VALUE / LAST_VALUE
SELECT name, department, salary,
    FIRST_VALUE(name) OVER (PARTITION BY department ORDER BY salary DESC) as top_earner,
    LAST_VALUE(name) OVER (
        PARTITION BY department ORDER BY salary DESC
        ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING
    ) as lowest_earner
FROM employees;
```

### Frame Clauses

```sql
-- Running total
SELECT date, amount,
    SUM(amount) OVER (ORDER BY date ROWS UNBOUNDED PRECEDING) as running_total
FROM transactions;

-- Moving average (last 7 days)
SELECT date, amount,
    AVG(amount) OVER (
        ORDER BY date
        ROWS BETWEEN 6 PRECEDING AND CURRENT ROW
    ) as moving_avg_7d
FROM daily_sales;

-- Frame specifications
ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW     -- Default
ROWS BETWEEN 3 PRECEDING AND 3 FOLLOWING             -- 7-row window
ROWS BETWEEN CURRENT ROW AND UNBOUNDED FOLLOWING     -- Current to end
RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW    -- By value, not position
GROUPS BETWEEN 1 PRECEDING AND 1 FOLLOWING           -- By peer groups
```

## UPSERT (INSERT ... ON CONFLICT)

```sql
-- Update on conflict
INSERT INTO products (id, name, price)
VALUES ('uuid', 'Widget', 19.99)
ON CONFLICT (id) DO UPDATE SET
    name = EXCLUDED.name,
    price = EXCLUDED.price,
    updated_at = NOW();

-- Do nothing on conflict
INSERT INTO products (id, name, price)
VALUES ('uuid', 'Widget', 19.99)
ON CONFLICT (id) DO NOTHING;

-- Conditional update
INSERT INTO products (id, name, price)
VALUES ('uuid', 'Widget', 19.99)
ON CONFLICT (id) DO UPDATE SET
    price = EXCLUDED.price
WHERE products.price < EXCLUDED.price;  -- Only update if new price is higher
```

## RETURNING Clause

```sql
-- Return inserted row
INSERT INTO users (name, email)
VALUES ('John', 'john@example.com')
RETURNING id, created_at;

-- Return updated rows
UPDATE products SET price = price * 1.1
WHERE category = 'electronics'
RETURNING id, name, price;

-- Return deleted rows
DELETE FROM sessions WHERE expires_at < NOW()
RETURNING user_id, session_id;
```

## LATERAL Joins

```sql
-- Correlated subquery as join
SELECT u.name, recent_orders.*
FROM users u
CROSS JOIN LATERAL (
    SELECT id, total, created_at
    FROM orders
    WHERE orders.user_id = u.id
    ORDER BY created_at DESC
    LIMIT 3
) AS recent_orders;
```

## GROUPING SETS, ROLLUP, CUBE

```sql
-- Multiple groupings in one query
SELECT department, job_title, SUM(salary)
FROM employees
GROUP BY GROUPING SETS (
    (department, job_title),
    (department),
    (job_title),
    ()
);

-- ROLLUP: hierarchical grouping
SELECT year, quarter, month, SUM(revenue)
FROM sales
GROUP BY ROLLUP (year, quarter, month);

-- CUBE: all possible combinations
SELECT department, job_title, SUM(salary)
FROM employees
GROUP BY CUBE (department, job_title);
```

## FILTER Clause

```sql
-- Conditional aggregation (cleaner than CASE WHEN)
SELECT
    COUNT(*) as total_orders,
    COUNT(*) FILTER (WHERE status = 'completed') as completed_orders,
    COUNT(*) FILTER (WHERE status = 'pending') as pending_orders,
    SUM(total) FILTER (WHERE status = 'completed') as completed_revenue
FROM orders;
```
