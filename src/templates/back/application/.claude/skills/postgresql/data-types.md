# PostgreSQL Data Types Reference

## Numeric Types

```sql
-- Exact numeric
SMALLINT          -- 2 bytes, -32768 to +32767
INTEGER           -- 4 bytes, -2147483648 to +2147483647
BIGINT            -- 8 bytes, -9223372036854775808 to +9223372036854775807
DECIMAL(p,s)      -- Variable, exact precision (alias: NUMERIC)
SERIAL            -- Auto-increment INTEGER
BIGSERIAL         -- Auto-increment BIGINT

-- Approximate numeric
REAL              -- 4 bytes, 6 decimal digits precision
DOUBLE PRECISION  -- 8 bytes, 15 decimal digits precision

-- Best practices
NUMERIC(10,2)     -- For money/financial (exact)
BIGINT            -- For IDs in high-volume tables
INTEGER           -- Default for counts/quantities
```

## Text Types

```sql
CHAR(n)           -- Fixed length, padded
VARCHAR(n)        -- Variable length, max n chars
TEXT              -- Unlimited variable length (preferred)
CITEXT            -- Case-insensitive text (extension)

-- Best practice: Use TEXT for most cases
-- VARCHAR(n) only when you need constraint
```

## Date/Time Types

```sql
DATE              -- Date only (4 bytes)
TIME              -- Time only (8 bytes)
TIMESTAMP         -- Date + time without timezone (8 bytes)
TIMESTAMPTZ       -- Date + time WITH timezone (8 bytes) - PREFERRED
INTERVAL          -- Time span

-- Examples
TIMESTAMP WITH TIME ZONE DEFAULT NOW()
TIMESTAMP WITHOUT TIME ZONE
INTERVAL '1 day 2 hours 30 minutes'

-- Best practice: ALWAYS use TIMESTAMPTZ
```

## Boolean

```sql
BOOLEAN           -- true, false, NULL
-- Accepts: TRUE, 't', 'true', 'y', 'yes', 'on', '1'
-- Accepts: FALSE, 'f', 'false', 'n', 'no', 'off', '0'
```

## UUID

```sql
UUID              -- 128-bit UUID

-- Generate UUID (requires extension)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
uuid_generate_v4()           -- Random UUID
uuid_generate_v1()           -- Time-based UUID

-- Or use built-in (PostgreSQL 13+)
gen_random_uuid()

-- Best practice: Use UUID as primary key for distributed systems
```

## Binary

```sql
BYTEA             -- Variable length binary string
-- Use for: files, images, encrypted data
```

## Network Types

```sql
INET              -- IPv4 or IPv6 host address
CIDR              -- IPv4 or IPv6 network
MACADDR           -- MAC address
MACADDR8          -- MAC address (EUI-64 format)
```

## Geometric Types

```sql
POINT             -- (x, y)
LINE              -- Infinite line
LSEG              -- Line segment
BOX               -- Rectangular box
PATH              -- Geometric path
POLYGON           -- Polygon
CIRCLE            -- Circle
```

## JSONB (Recommended over JSON)

```sql
-- Create column
metadata JSONB NOT NULL DEFAULT '{}'::jsonb

-- Insert
INSERT INTO products (metadata) VALUES ('{"color": "red", "size": "L"}'::jsonb);

-- Query operators
-- -> returns JSON, ->> returns TEXT
SELECT metadata->'color' FROM products;           -- Returns "red" (JSON)
SELECT metadata->>'color' FROM products;          -- Returns red (TEXT)
SELECT metadata->'nested'->'key' FROM products;   -- Nested access

-- Containment operators
SELECT * FROM products WHERE metadata @> '{"color": "red"}';    -- Contains
SELECT * FROM products WHERE metadata <@ '{"color": "red"}';    -- Is contained by
SELECT * FROM products WHERE metadata ? 'color';                -- Key exists
SELECT * FROM products WHERE metadata ?| array['color','size']; -- Any key exists
SELECT * FROM products WHERE metadata ?& array['color','size']; -- All keys exist

-- Path operators (PostgreSQL 12+)
SELECT metadata @? '$.color' FROM products;       -- Path exists
SELECT metadata @@ '$.price > 100' FROM products; -- Path predicate

-- JSONB functions
jsonb_set(target, path, new_value)       -- Set value at path
jsonb_insert(target, path, new_value)    -- Insert value at path
jsonb_strip_nulls(jsonb)                 -- Remove null values
jsonb_pretty(jsonb)                      -- Pretty print
jsonb_typeof(jsonb)                      -- Get type as text
jsonb_array_elements(jsonb)              -- Expand array to rows
jsonb_each(jsonb)                        -- Expand object to rows
jsonb_object_keys(jsonb)                 -- Get keys as set

-- Aggregation
jsonb_agg(expression)                    -- Aggregate to JSON array
jsonb_object_agg(key, value)             -- Aggregate to JSON object
```

## Arrays

```sql
-- Create column
tags TEXT[] NOT NULL DEFAULT '{}'
numbers INTEGER[]
matrix INTEGER[][]

-- Insert
INSERT INTO products (tags) VALUES (ARRAY['sale', 'new']);
INSERT INTO products (tags) VALUES ('{"sale", "new"}');

-- Query operators
SELECT * FROM products WHERE tags @> ARRAY['sale'];           -- Contains
SELECT * FROM products WHERE tags <@ ARRAY['sale', 'new'];    -- Is contained
SELECT * FROM products WHERE tags && ARRAY['sale', 'promo'];  -- Overlap (any match)
SELECT * FROM products WHERE 'sale' = ANY(tags);              -- Element exists
SELECT * FROM products WHERE 'sale' = ALL(tags);              -- All elements match

-- Array functions
array_length(array, dimension)           -- Get length
array_append(array, element)             -- Append element
array_prepend(element, array)            -- Prepend element
array_cat(array1, array2)                -- Concatenate arrays
array_remove(array, element)             -- Remove all occurrences
array_replace(array, from, to)           -- Replace elements
array_position(array, element)           -- Find position (1-indexed)
unnest(array)                            -- Expand to rows
array_agg(expression)                    -- Aggregate to array

-- Slicing
tags[1]                                  -- First element (1-indexed!)
tags[1:3]                                -- Slice from 1 to 3
```

## ENUM Types

```sql
-- Create enum
CREATE TYPE status_type AS ENUM ('pending', 'active', 'completed', 'cancelled');

-- Use in table
CREATE TABLE orders (
    id UUID PRIMARY KEY,
    status status_type NOT NULL DEFAULT 'pending'
);

-- Query
SELECT * FROM orders WHERE status = 'active';
SELECT * FROM orders WHERE status > 'pending';  -- Enums are ordered!

-- Alter enum (PostgreSQL 9.1+)
ALTER TYPE status_type ADD VALUE 'on_hold' AFTER 'active';
ALTER TYPE status_type RENAME VALUE 'cancelled' TO 'canceled';

-- List enum values
SELECT unnest(enum_range(NULL::status_type));
```

## Composite Types

```sql
-- Create composite type
CREATE TYPE address AS (
    street TEXT,
    city TEXT,
    country TEXT,
    postal_code VARCHAR(20)
);

-- Use in table
CREATE TABLE customers (
    id UUID PRIMARY KEY,
    name TEXT,
    shipping_address address,
    billing_address address
);

-- Insert
INSERT INTO customers (id, name, shipping_address)
VALUES (
    gen_random_uuid(),
    'John Doe',
    ROW('123 Main St', 'New York', 'USA', '10001')::address
);

-- Query composite fields
SELECT (shipping_address).city FROM customers;
SELECT * FROM customers WHERE (shipping_address).country = 'USA';
```

## Range Types

```sql
-- Built-in range types
INT4RANGE         -- Range of integer
INT8RANGE         -- Range of bigint
NUMRANGE          -- Range of numeric
TSRANGE           -- Range of timestamp without time zone
TSTZRANGE         -- Range of timestamp with time zone
DATERANGE         -- Range of date

-- Create range
'[1,10]'::int4range           -- Inclusive both ends
'[1,10)'::int4range           -- Inclusive start, exclusive end
'(1,10]'::int4range           -- Exclusive start, inclusive end

-- Range operators
@>   -- Contains element or range
<@   -- Is contained by
&&   -- Overlaps
-|-  -- Adjacent to

-- Example: booking availability
CREATE TABLE bookings (
    id UUID PRIMARY KEY,
    room_id UUID NOT NULL,
    during TSTZRANGE NOT NULL,
    EXCLUDE USING gist (room_id WITH =, during WITH &&)  -- No overlaps!
);
```
