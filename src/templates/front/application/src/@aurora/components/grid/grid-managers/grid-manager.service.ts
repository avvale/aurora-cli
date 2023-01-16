import { PageEvent } from '@angular/material/paginator';
import { Action } from '@aurora';
import { ColumnConfig, ExportFormat, GridColumnFilter, GridSearchState, GridSortState, GridState } from '../grid.types';

export abstract class GridManagerService
{
    abstract handleStateChange(
        gridId: string,
        gridState: GridState,
        columnsConfig: ColumnConfig[],
    ): void;

    abstract handlePageStateChange(
        gridId: string,
        { pageIndex, pageSize }: PageEvent,
    ): void;

    abstract handleSortStateChange(
        gridId: string,
        gridSortState: GridSortState,
    ): void

    abstract handleSearchStateChange(
        gridId: string,
        gridSearchState: GridSearchState,
        columnsConfig: ColumnConfig[],
    ): void

    abstract handleColumnFiltersChange(
        gridId: string,
        gridColumnFilters: GridColumnFilter[],
    ): void

    abstract handleColumnsConfigChange(
        gridId: string,
        columnsConfig: ColumnConfig[],
        originColumnsConfig: ColumnConfig[],
    ): void

    abstract handleGridAction(
        action: Action,
    ): void

    abstract handleExportData(
        gridId: string,
        gridState: GridState,
        columnsConfig: ColumnConfig[],
        format: ExportFormat,
    ): void
}
