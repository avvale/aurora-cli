import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Action, ActionService, GridData, GridFiltersStorageService, GridStateService, QueryStatementHandler } from '@aurora';
import { Observable } from 'rxjs';
import { AuditingHttpCommunication } from '../auditing.types';
import { httpCommunicationColumnsConfig } from './http-communication.columns-config';
import { HttpCommunicationService } from './http-communication.service';

@Injectable({
    providedIn: 'root',
})
export class HttpCommunicationPaginationResolver implements Resolve<GridData<AuditingHttpCommunication>>
{
    constructor(
        private readonly actionService: ActionService,
        private readonly gridFiltersStorageService: GridFiltersStorageService,
        private readonly gridStateService: GridStateService,
        private readonly httpCommunicationService: HttpCommunicationService,
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
    ): Observable<GridData<AuditingHttpCommunication>>
    {
        this.actionService.action({
            id          : 'auditing::httpCommunication.list.view',
            isViewAction: true,
        });

        const gridId = 'auditing::httpCommunication.list.mainGridList';
        this.gridStateService.setPaginationActionId(gridId, 'auditing::httpCommunication.list.pagination');
        this.gridStateService.setExportActionId(gridId, 'auditing::httpCommunication.list.export');

        return this.httpCommunicationService.pagination({
            query: QueryStatementHandler
                .init({ columnsConfig: httpCommunicationColumnsConfig })
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
export class HttpCommunicationNewResolver implements Resolve<Action>
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
            id          : 'auditing::httpCommunication.detail.new',
            isViewAction: true,
        });
    }
}

@Injectable({
    providedIn: 'root',
})
export class HttpCommunicationEditResolver implements Resolve<{
    object: AuditingHttpCommunication;
}>
{
    constructor(
        private readonly actionService: ActionService,
        private readonly httpCommunicationService: HttpCommunicationService,
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
        object: AuditingHttpCommunication;
    }>
    {
        this.actionService.action({
            id          : 'auditing::httpCommunication.detail.edit',
            isViewAction: true,
        });

        return this.httpCommunicationService.findById({
            id: route.paramMap.get('id'),
        });
    }
}
