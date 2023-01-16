import { Injectable } from '@angular/core';
import { GridPageState, GridSearchState, ColumnConfig, GridSortState } from '../grid.types';

@Injectable({
    providedIn: 'root',
})
export class GridStateService
{
    private columnsConfigStorage: {
        [key: string]: ColumnConfig[];
    } = {};

    private pageStorage: {
        [key: string]: GridPageState;
    } = {};

    private sortStorage: {
        [key: string]: GridSortState;
    } = {};

    private searchStorage: {
        [key: string]: GridSearchState;
    } = {};

    private paginationActionIdStorage: {
        [key: string]: string;
    } = {};

    private exportActionIdStorage: {
        [key: string]: string;
    } = {};

    // set pagination state length, pageIndex or pageSize
    setPageState(id: string, page: GridPageState): void
    {
        this.pageStorage[id] = page;
    }

    // set grid global search state
    setSearchState(id: string, page: GridSearchState, columnsConfig: ColumnConfig[]): void
    {
        this.searchStorage[id] = page;
        this.columnsConfigStorage[id] = columnsConfig;
    }

    setSortState(id: string, sort: GridSortState): void
    {
        this.sortStorage[id] = sort;
    }

    setPaginationActionId(id: string, actionId: string): void
    {
        this.paginationActionIdStorage[id] = actionId;
    }

    setExportActionId(id: string, actionId: string): void
    {
        this.exportActionIdStorage[id] = actionId;
    }

    getPageState(id: string): GridPageState
    {
        return this.pageStorage[id];
    }

    getSearchState(id: string): GridSearchState
    {
        return this.searchStorage[id];
    }

    getSortState(id: string): GridSortState
    {
        return this.sortStorage[id];
    }

    getPaginationActionId(id: string): string
    {
        return this.paginationActionIdStorage[id];
    }

    getExportActionId(id: string): string
    {
        return this.exportActionIdStorage[id];
    }

    getPage(id: string): GridPageState
    {
        const page = this.getPageState(id);

        if (!page)
        {
            return {
                pageIndex: 0,
                pageSize : 10,
            };
        }

        return {
            pageIndex: page.pageIndex,
            pageSize : page.pageSize,
        };
    }

    getSort(id: string, defaultGridSortState?: GridSortState): GridSortState
    {
        const sort = this.getSortState(id);

        if (!sort && defaultGridSortState)
        {
            this.setSortState(id, defaultGridSortState);
            return defaultGridSortState;
        }

        return sort ?
            sort :
            {
                active   : 'createdAt',
                direction: 'desc',
            };
    }
}
