import { ColumnConfig, ColumnDataType, getContactOperator, getPostgresOperatorModifier, getPostgresValueModifier, GridColumnFilter, GridPageState, GridSearchState, GridSortState, isValidOrderStatement, log } from '@aurora';
import { Operator, QueryStatement } from './sql-statement';
import groupBy from 'lodash-es/groupBy';

export class QueryStatementHandler
{
    constructor(
        public queryStatement: QueryStatement,
        public columnsConfig: ColumnConfig[],
    )
    {}

    static init(
        {
            queryStatement = {},
            columnsConfig = [],
        }: {
            queryStatement?: QueryStatement;
            columnsConfig?: ColumnConfig[];
        } = {},
    ): QueryStatementHandler
    {
        return new QueryStatementHandler(
            queryStatement,
            columnsConfig,
        );
    }

    setColumFilters(columnFilters?: GridColumnFilter[]): QueryStatementHandler
    {
        // guard clause
        if (!Array.isArray(columnFilters)) return this;

        // set where property if not exists
        if (!this.queryStatement.where) this.queryStatement.where = {};

        const groupedFilters = groupBy(columnFilters, 'field');

        for (const [key, groupedFilter] of Object.entries(groupedFilters))
        {
            // if group only has one item, don't concat query with operator and/or,
            // this would only happen if we are making multiple filters in the same column
            if (groupedFilter.length === 1)
            {
                const filter: GridColumnFilter = groupedFilter[0];
                this.queryStatement
                    .where[filter.field] = {
                        [getPostgresOperatorModifier(filter)]: getPostgresValueModifier(filter),
                    };
            }
            else if (groupedFilter.length > 1)
            {
                const firstFilter: GridColumnFilter = groupedFilter[0];
                this.queryStatement
                    .where[firstFilter.field] = {
                        [getContactOperator(groupedFilter[0].type)]: groupedFilter.map(filter => ({ [getPostgresOperatorModifier(filter)]: getPostgresValueModifier(filter) })),
                    };
            }
        }

        return this;
    }

    setSort(
        {
            active = null,
            direction = null,
        }: GridSortState = {},
        ...additionalSort
    ): QueryStatementHandler
    {
        // set default order if is nor defined or invalid order statement
        if (!isValidOrderStatement(this.queryStatement.order))
        {
            if (active)
            {
                if (active.includes('.'))
                {
                    this.queryStatement.order = [[...active.split('.')]];
                }
                else
                {
                    this.queryStatement.order = [[active]];
                }
            }

            if (direction)
            {
                this.queryStatement.order[0].push(direction);
            }
        }

        // adds an additional order, intended to sort the relationships
        if (Array.isArray(additionalSort) && additionalSort.length > 0) this.queryStatement.order.push(...additionalSort);

        return this;
    }

    // Normally it will be used in the resolver to set the pagination
    // for the query with default pagination, or from the
    // GrisStateService (src/@aurora/components/grid/grid-state/grid-state.service.ts),
    // once inside the component it will not be necessary as the pagination comes from GridState.
    setPage(
        {
            pageIndex = 0,
            pageSize = 10,
        }: GridPageState = {},
    ): QueryStatementHandler
    {
        if (!this.queryStatement) this.queryStatement = {};

        if (!this.queryStatement.offset) this.queryStatement.offset = pageIndex * pageSize;
        if (!this.queryStatement.limit)  this.queryStatement.limit  = pageSize;

        return this;
    }

    setSearch(
        {
            value  = null,
            isOpen = false,
        }: GridSearchState = {},
    ): QueryStatementHandler
    {
        // guard clause
        if (!(isOpen && value)) return this;

        // set where property if not exists
        if (!this.queryStatement.where) this.queryStatement.where = {};

        const searchStatement = [];
        for (const columnConfig of this.columnsConfig)
        {
            if (
                (columnConfig.searchable === undefined || (columnConfig.searchable && columnConfig.searchable === true)) &&
                (columnConfig.hidden === undefined || columnConfig.hidden === false)
            )
            {
                switch (columnConfig.type)
                {
                    case ColumnDataType.STRING:
                        searchStatement.push({
                            [(columnConfig.searchableField ? columnConfig.searchableField : columnConfig.field) + (columnConfig.isUnaccent ? '::unaccent' : '')]:
                            {
                                [Operator.iLike]: `%${value}%`,
                            },
                        });
                        break;

                    case ColumnDataType.ARRAY:
                    case ColumnDataType.NUMBER:
                    case ColumnDataType.ENUM:
                        searchStatement.push({
                            [(columnConfig.searchableField ? columnConfig.searchableField : columnConfig.field) + '::cast::varchar']:
                            {
                                [Operator.iLike]: `%${value}%`,
                            },
                        });
                        break;

                    case ColumnDataType.ACTIONS:
                        // do nothing
                        break;

                    default:
                        log(`[DEBUG] Search is not implemented for ${columnConfig.type} yet`);
                        break;
                }
            }
        }

        if (Object.keys(this.queryStatement.where).length > 0)
        {
            this.queryStatement.where = {
                [Operator.and]: [
                    {
                        ...this.queryStatement.where,
                    },
                    {
                        [Operator.or]: searchStatement,
                    },
                ],
            };
        }
        else
        {
            this.queryStatement.where = {
                [Operator.or]: searchStatement,
            };
        }

        return this;
    }

    getQueryStatement(): QueryStatement
    {
        return this.queryStatement;
    }
}