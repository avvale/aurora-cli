import { Injectable } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Action, ActionService, ColumnConfig, ExportFormat, GridColumnFilter, GridColumnsConfigStorageService, GridFiltersStorageService, GridSearchState, GridSortState, GridState, GridStateService, QueryStatementHandler } from '@aurora';
import { GridManagerService } from '../grid-manager.service';

@Injectable({
    providedIn: 'root',
})
export class AuroraGridManagerService extends GridManagerService
{
    constructor(
        private readonly actionService: ActionService,
        private readonly gridColumnsConfigStorageService: GridColumnsConfigStorageService,
        private readonly gridFiltersStorageService: GridFiltersStorageService,
        private readonly gridStateService: GridStateService,
    )
    {
        super();
    }

    handleStateChange(
        gridId: string,
        gridState: GridState,
        columnsConfig: ColumnConfig[],
    ): void
    {
        this.actionService.action({
            id          : this.gridStateService.getPaginationActionId(gridId),
            isViewAction: false,
            meta        : {
                query: QueryStatementHandler
                    .init({ columnsConfig })
                    .setColumFilters(gridState.columnFilters)
                    .setSort(gridState.sort)
                    .setPage(gridState.page)
                    .setSearch(gridState.search)
                    .getQueryStatement(),
            },
        });
    }

    handlePageStateChange(
        gridId: string,
        { pageIndex, pageSize }: PageEvent,
    ): void
    {
        this.gridStateService.setPageState(
            gridId,
            { pageIndex, pageSize },
        );
    }

    handleSortStateChange(
        gridId: string,
        gridSortState: GridSortState,
    ): void
    {
        this.gridStateService.setSortState(gridId, gridSortState);
    }

    handleSearchStateChange(
        gridId: string,
        gridSearchState: GridSearchState,
        columnsConfig: ColumnConfig[],
    ): void
    {
        this.gridStateService.setSearchState(
            gridId,
            gridSearchState,
            columnsConfig,
        );
    }

    handleColumnFiltersChange(
        gridId: string,
        gridColumnFilters: GridColumnFilter[],
    ): void
    {
        this.gridFiltersStorageService.setColumnFilterState(
            gridId,
            gridColumnFilters,
        );
    }

    handleColumnsConfigChange(
        gridId: string,
        columnsConfig: ColumnConfig[],
        originColumnsConfig: ColumnConfig[],
    ): void
    {
        this.gridColumnsConfigStorageService.setColumnsConfig(
            gridId,
            columnsConfig,
            originColumnsConfig,
        );
    }

    handleGridAction(
        action: Action,
    ): void
    {
        this.actionService.action(action);
    }

    handleExportData(
        gridId: string,
        gridState: GridState,
        columnsConfig: ColumnConfig[],
        format: ExportFormat,
    ): void
    {
        this.actionService.action({
            id          : this.gridStateService.getExportActionId(gridId),
            isViewAction: false,
            meta        : {
                query: QueryStatementHandler
                    .init({ columnsConfig })
                    .setColumFilters(gridState.columnFilters)
                    .setSort(gridState.sort)
                    .setSearch(gridState.search)
                    .getQueryStatement(),
                format,
            },
        });
    }
}