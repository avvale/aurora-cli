import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Action, ActionService, GridData, GridFiltersStorageService, GridStateService, QueryStatementHandler } from '@aurora';
import { Observable } from 'rxjs';
import { CommonLang } from '../common.types';
import { langColumnsConfig } from './lang.columns-config';
import { LangService } from './lang.service';

@Injectable({
    providedIn: 'root',
})
export class LangPaginationResolver implements Resolve<GridData<CommonLang>>
{
    constructor(
        private readonly actionService: ActionService,
        private readonly gridFiltersStorageService: GridFiltersStorageService,
        private readonly gridStateService: GridStateService,
        private readonly langService: LangService,
    ) {}

    /**
     * Resolver
     *
     * @param route
     * @param state
     */
    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot,
    ): Observable<GridData<CommonLang>>
    {
        this.actionService.action({
            id          : 'common::lang.list.view',
            isViewAction: true,
        });

        const gridId = 'common::lang.list.mainGridList';
        this.gridStateService.setPaginationActionId(gridId, 'common::lang.list.pagination');
        this.gridStateService.setExportActionId(gridId, 'common::lang.list.export');

        return this.langService.pagination({
            query: QueryStatementHandler
                .init({ columnsConfig: langColumnsConfig })
                .setColumFilters(this.gridFiltersStorageService.getColumnFilterState(gridId))
                .setSort(this.gridStateService.getSort(gridId))
                .setPage(this.gridStateService.getPage(gridId))
                .setSearch(this.gridStateService.getSearchState(gridId))
                .getQueryStatement(),
        });
    }
}

@Injectable({
    providedIn: 'root',
})
export class LangNewResolver implements Resolve<Action>
{
    constructor(
		private readonly actionService: ActionService,
    )
    {}

    /**
     * Resolver
     *
     * @param route
     * @param state
     */
    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot,
    ): Action
    {
        return this.actionService.action({
            id          : 'common::lang.detail.new',
            isViewAction: true,
        });
    }
}

@Injectable({
    providedIn: 'root',
})
export class LangEditResolver implements Resolve<{
	object: CommonLang;
}>
{
    constructor(
		private readonly actionService: ActionService,
		private readonly langService: LangService,
    )
    {}

    /**
     * Resolver
     *
     * @param route
     * @param state
     */
    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot,
    ): Observable<{
		object: CommonLang;
    }>
    {
        this.actionService.action({
            id          : 'common::lang.detail.edit',
            isViewAction: true,
        });

        return this.langService.findById({
            id: route.paramMap.get('id'),
        });
    }
}
