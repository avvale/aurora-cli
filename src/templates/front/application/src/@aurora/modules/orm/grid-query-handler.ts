import {
    ColumnConfig,
    GridFiltersStorageService,
    GridStateService,
    queryStatementHandler,
} from '@aurora';
import { QueryStatement } from './sql-statement';

/**
 * Handles the configuration of the query statement for the grid.
 *
 * This function manages column filters, sorting, pagination, and search state
 * from the grid services. It also ensures a deterministic sort order by
 * appending a default sort column if it's not present.
 *
 * @param {object} params - The configuration parameters.
 * @param {GridFiltersStorageService} [params.gridFiltersStorageService] - Service to manage grid filters.
 * @param {GridStateService} [params.gridStateService] - Service to manage grid state (sort, page, search).
 * @param {string} [params.gridId] - The ID of the grid.
 * @param {ColumnConfig[]} [params.columnsConfig] - Configuration for the grid columns.
 * @param {QueryStatement} [params.query] - The base query statement.
 * @param {any[]} [params.defaultSort] - The default sort order to apply (default: ['rowId', 'desc']).
 * @returns {QueryStatement} The configured query statement.
 */
export const gridQueryHandler = ({
    gridFiltersStorageService,
    gridStateService,
    gridId = null,
    columnsConfig = [],
    query = null,
    defaultSort = ['rowId', 'desc'],
}: {
    gridFiltersStorageService?: GridFiltersStorageService;
    gridStateService?: GridStateService;
    gridId?: string;
    columnsConfig?: ColumnConfig[];
    query?: QueryStatement;
    defaultSort?: Array<string | [string, string] | [string, string, string]>;
} = {}): QueryStatement => {
    const queryStatement = query
        ? query
        : queryStatementHandler({
            columnsConfig: columnsConfig,
        })
            .setColumFilters(
                gridFiltersStorageService.getColumnFilterState(gridId)
            )
            .setSort(gridStateService.getSort(gridId))
            .setPage(gridStateService.getPage(gridId))
            .setSearch(gridStateService.getSearchState(gridId))
            .getQueryStatement();

    if (
        queryStatement.order &&
        Array.isArray(queryStatement.order) &&
        queryStatement.order.length > 0
    ) {
        const primarySortDirection =
            queryStatement.order[0][1] || defaultSort[1];
        if (!queryStatement.order.some((sort) => sort[0] === defaultSort[0])) {
            queryStatement.order.push([defaultSort[0], primarySortDirection]);
        }
    } else {
        queryStatement.order = [defaultSort];
    }

    return queryStatement;
};
