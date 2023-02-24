import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Action, ActionService, GridData, GridFiltersStorageService, GridStateService, QueryStatementHandler } from '@aurora';
import { Observable } from 'rxjs';
import { OAuthApplication } from '../o-auth.types';
import { applicationColumnsConfig } from './application.columns-config';
import { ApplicationService } from './application.service';

@Injectable({
    providedIn: 'root',
})
export class ApplicationPaginationResolver implements Resolve<GridData<OAuthApplication>>
{
    constructor(
        private readonly actionService: ActionService,
        private readonly gridFiltersStorageService: GridFiltersStorageService,
        private readonly gridStateService: GridStateService,
        private readonly applicationService: ApplicationService,
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
    ): Observable<GridData<OAuthApplication>>
    {
        this.actionService.action({
            id          : 'oAuth::application.list.view',
            isViewAction: true,
        });
        const gridId = 'oAuth::application.list.mainGridList';
        this.gridStateService.setPaginationActionId(gridId, 'oAuth::application.list.pagination');
        this.gridStateService.setExportActionId(gridId, 'oAuth::application.list.export');
        return this.applicationService.pagination({
            query: QueryStatementHandler
                .init({ columnsConfig: applicationColumnsConfig })
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
export class ApplicationNewResolver implements Resolve<Action>
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
            id          : 'oAuth::application.detail.new',
            isViewAction: true,
        });
    }
}

@Injectable({
    providedIn: 'root',
})
export class ApplicationEditResolver implements Resolve<{
    object: OAuthApplication;
}>
{
    constructor(
        private readonly actionService: ActionService,
        private readonly applicationService: ApplicationService,
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
        object: OAuthApplication;
    }>
    {
        this.actionService.action({
            id          : 'oAuth::application.detail.edit',
            isViewAction: true,
        });
        return this.applicationService.findById({
            id: route.paramMap.get('id'),
        });
    }
}
