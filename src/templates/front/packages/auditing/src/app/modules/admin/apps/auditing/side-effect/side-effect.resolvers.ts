import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Action, ActionService, GridData, GridFiltersStorageService, GridStateService, QueryStatementHandler } from '@aurora';
import { Observable } from 'rxjs';
import { AuditingSideEffect } from '../auditing.types';
import { sideEffectColumnsConfig } from './side-effect.columns-config';
import { SideEffectService } from './side-effect.service';

@Injectable({
    providedIn: 'root',
})
export class SideEffectPaginationResolver implements Resolve<GridData<AuditingSideEffect>>
{
    constructor(
        private readonly actionService: ActionService,
        private readonly gridFiltersStorageService: GridFiltersStorageService,
        private readonly gridStateService: GridStateService,
        private readonly sideEffectService: SideEffectService,
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
    ): Observable<GridData<AuditingSideEffect>>
    {
        this.actionService.action({
            id          : 'auditing::sideEffect.list.view',
            isViewAction: true,
        });
        const gridId = 'auditing::sideEffect.list.mainGridList';
        this.gridStateService.setPaginationActionId(gridId, 'auditing::sideEffect.list.pagination');
        this.gridStateService.setExportActionId(gridId, 'auditing::sideEffect.list.export');
        return this.sideEffectService.pagination({
            query: QueryStatementHandler
                .init({ columnsConfig: sideEffectColumnsConfig })
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
export class SideEffectNewResolver implements Resolve<Action>
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
            id          : 'auditing::sideEffect.detail.new',
            isViewAction: true,
        });
    }
}

@Injectable({
    providedIn: 'root',
})
export class SideEffectEditResolver implements Resolve<{
    object: AuditingSideEffect;
}>
{
    constructor(
        private readonly actionService: ActionService,
        private readonly sideEffectService: SideEffectService,
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
        object: AuditingSideEffect;
    }>
    {
        this.actionService.action({
            id          : 'auditing::sideEffect.detail.edit',
            isViewAction: true,
        });
        return this.sideEffectService.findById({
            id: route.paramMap.get('id'),
        });
    }
}
