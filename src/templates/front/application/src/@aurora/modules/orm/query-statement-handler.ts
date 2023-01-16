import { ColumnConfig, ColumnDataType, getContactOperator, GridColumnFilter, GridPageState, GridSearchState, GridSortState, GridState, isValidOrderStatement } from '@aurora';
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

        for (const key of Object.keys(groupedFilters))
        {
            // if group only has one item, don't concat query with operator and/or
            if (groupedFilters[key].length === 1)
            {
                const filter: GridColumnFilter = groupedFilters[key][0];
                this.queryStatement
                    .where[key] = {
                        [filter.operator]: filter.value,
                    };
            }
            else if (groupedFilters[key].length > 1)
            {
                this.queryStatement.where[key] = {
                    [getContactOperator(groupedFilters[key][0].type)]: groupedFilters[key].map(filter => ({ [filter.operator]: filter.value })),
                };
            }
        }

        return this;
    }

    setSort(
        {
            active = 'createdAt',
            direction = 'desc',
        }: GridSortState = {},
        ...additionalSort
    ): QueryStatementHandler
    {
        // set default order if is nor defined or invalid order statement
        if (!isValidOrderStatement(this.queryStatement.order))
        {
            if (active.includes('.'))
            {
                this.queryStatement.order = [[...active.split('.')]];
            }
            else
            {
                this.queryStatement.order = [[active]];
            }

            if (direction)
            {
                this.queryStatement.order[0].push(direction);
            }
        }

        // adds an additional order, intended to sort the relationships
        if (Array.isArray(additionalSort)) this.queryStatement.order.push(...additionalSort);

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
                (columnConfig.hidden === undefined || columnConfig.hidden === false) &&
                (columnConfig.type === ColumnDataType.STRING ||
                columnConfig.type === ColumnDataType.NUMBER)
            )
            {
                searchStatement.push({ [columnConfig.field]: { [Operator.substring]: value }});
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