export type ContactOperator = Operator.and | Operator.or;

export interface IndexHint
{
    type: IndexHints;
    values: string[];
}

export enum IndexHints
{
    USE     = 'USE',
    FORCE   = 'FORCE',
    IGNORE  = 'IGNORE',
}

export enum Operator
{
    // concatenation
    and = '[and]',                          // (a = 5) AND (b = 6)
    or = '[or]',                            // (a = 5) OR (b = 6)

    // utils
    col = '[col]',                          // = "user"."organization_id" (PG example) or "user.organization_id" (MySQL example)
    join = '[join]',

    // Basics
    startsWith = '[startsWith]',            // LIKE 'hat%'
    endsWith = '[endsWith]',                // LIKE '%hat'
    substring = '[substring]',              // LIKE '%hat%'
    not = '[not]',                          // IS NOT TRUE
    is = '[is]',                            // IS NULL
    in = '[in]',                            // IN [1, 2]
    notIn = '[notIn]',                      // NOT IN [1, 2]

    // comparisons
    eq = '[eq]',                            // = 3
    ne = '[ne]',                            // != 20
    gte = '[gte]',                          // >= 6
    gt = '[gt]',                            // > 6
    lte = '[lte]',                          // <= 10
    lt = '[lt]',                            // < 10

    // Other operators
    between = '[between]',                  // BETWEEN 6 AND 10
    notBetween = '[notBetween]',            // NOT BETWEEN 11 AND 15
    like = '[like]',                        // LIKE '%hat'
    notLike = '[notLike]',                  // NOT LIKE '%hat'
    regexp = '[regexp]',                    // REGEXP/~ '^[h|a|t]' (MySQL/PG only)
    notRegexp = '[notRegexp]',              // NOT REGEXP/!~ '^[h|a|t]' (MySQL/PG only)
    all = '[all]',                          // > ALL (SELECT 1)

    // Other operators
    values = '[values]',
    placeholder = '[placeholder]',

    // Other operators (Only PG)
    iLike = '[iLike]',                      // ILIKE '%hat' (case insensitive) (PG only)
    notILike = '[notILike]',                // NOT ILIKE '%hat'  (PG only)
    iRegexp = '[iRegexp]',                  // ~* '^[h|a|t]' (PG only)
    notIRegexp = '[notIRegexp]',            // !~* '^[h|a|t]' (PG only)
    overlap = '[overlap]',                  // && [1, 2) (PG range overlap (have points in common) operator)
    contains = '[contains]',                // @> '2'::integer  (PG range contains element operator) or @> [1, 2] (PG range contains range operator)
    contained = '[contained]',              // <@ [1, 2]        (PG range is contained by operator)
    adjacent = '[adjacent]',                // -|- [1, 2]       (PG range is adjacent to operator)
    strictLeft = '[strictLeft]',            // << [1, 2]        (PG range strictly left of operator)
    strictRight = '[strictRight]',          // >> [1, 2)        (PG range strictly right of operator)
    noExtendRight = '[noExtendRight]',      // &< [1, 2)        (PG range does not extend to the right of operator)
    noExtendLeft = '[noExtendLeft]',        // &> [1, 2)        (PG range does not extend to the left of operator)
    any = '[any]',                          // ANY ARRAY[2, 3]::INTEGER (PG only)
}

export interface QueryStatement
{
    /**
     * Attribute has to be matched for rows to be selected for the given action.
     */
    where?: any;

    /**
     * A list of the attributes that you want to select. To rename an attribute, you can pass an array, with
     * two elements - the first is the name of the attribute in the DB (or some kind of expression such as
     * `Sequelize.literal`, `Sequelize.fn` and so on), and the second is the name you want the attribute to
     * have in the returned instance
     */
    attributes?: any;

    /**
     * A list of associations to eagerly load using a left join (a single association is also supported). Supported is either
     * `{ include: Model1 }`, `{ include: [ Model1, Model2, ...]}`, `{ include: [{ model: Model1, as: 'Alias' }]}` or
     * `{ include: [{ all: true }]}`.
     * If your association are set up with an `as` (eg. `X.hasMany(Y, { as: 'Z }`, you need to specify Z in
     * the as attribute when eager loading Y).
     */
    include?: any;

    /**
     * Specifies an ordering. If a string is provided, it will be escaped. Using an array, you can provide
     * several columns / functions to order by. Each element can be further wrapped in a two-element array. The
     * first element is the column / function to order by, the second is the direction. For example:
     * `order: [['name', 'DESC']]`. In this way the column will be escaped, but the direction will not.
     */
    order?: any;

    /**
     * GROUP BY in sql
     * Used in conjunction with `attributes`.
     *
     * @see Projectable
     */
     group?: any;

    /**
     * Limit the results
     */
    limit?: number;

    /**
     * Skip the results;
     */
    offset?: number;

    /**
     * Lock the selected rows. Possible options are transaction.LOCK.UPDATE and transaction.LOCK.SHARE.
     * Postgres also supports transaction.LOCK.KEY_SHARE, transaction.LOCK.NO_KEY_UPDATE and specific model
     * locks with joins. See [transaction.LOCK for an example](transaction#lock)
     */
    lock?: any;

    /**
     * Skip locked rows. Only supported in Postgres.
     */
    skipLocked?: boolean;

    /**
     * Return raw result. See sequelize.query for more information.
     */
    raw?: boolean;

    /**
     * Select group rows after groups and aggregates are computed.
     */
    having?: any;

    /**
     * Use sub queries (internal)
     */
    subQuery?: boolean;

    /**
     * MySQL only
     */
    indexHints?: IndexHint[];

    /**
     * Apply COUNT(DISTINCT(col))
     */
     distinct?: boolean;

     /**
      * The column to aggregate on.
      */
     col?: string;
}