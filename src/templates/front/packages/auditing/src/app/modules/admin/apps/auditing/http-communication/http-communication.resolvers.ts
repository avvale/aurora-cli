import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { AuditingHttpCommunication } from '@apps/auditing/auditing.types';
import { httpCommunicationColumnsConfig, HttpCommunicationService } from '@apps/auditing/http-communication';
import { Action, ActionService, GridData, GridFiltersStorageService, GridStateService, QueryStatementHandler } from '@aurora';

export const httpCommunicationPaginationResolver: ResolveFn<GridData<AuditingHttpCommunication>> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
) =>
{
    const actionService = inject(ActionService);
    const gridFiltersStorageService = inject(GridFiltersStorageService);
    const gridStateService = inject(GridStateService);
    const httpCommunicationService = inject(HttpCommunicationService);

    actionService.action({
        id          : 'auditing::httpCommunication.list.view',
        isViewAction: true,
    });

    const gridId = 'auditing::httpCommunication.list.mainGridList';
    gridStateService.setPaginationActionId(gridId, 'auditing::httpCommunication.list.pagination');
    gridStateService.setExportActionId(gridId, 'auditing::httpCommunication.list.export');

    return httpCommunicationService.pagination({
        query: QueryStatementHandler
            .init({ columnsConfig: httpCommunicationColumnsConfig })
            .setColumFilters(gridFiltersStorageService.getColumnFilterState(gridId))
            .setSort(gridStateService.getSort(gridId))
            .setPage(gridStateService.getPage(gridId))
            .setSearch(gridStateService.getSearchState(gridId))
            .getQueryStatement(),
    });
};

export const httpCommunicationNewResolver: ResolveFn<Action> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
) =>
{
    const actionService = inject(ActionService);

    return actionService.action({
        id          : 'auditing::httpCommunication.detail.new',
        isViewAction: true,
    });
};

export const httpCommunicationEditResolver: ResolveFn<{
    object: AuditingHttpCommunication;
}> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
) =>
{
    const actionService = inject(ActionService);
    const httpCommunicationService = inject(HttpCommunicationService);

    actionService.action({
        id          : 'auditing::httpCommunication.detail.edit',
        isViewAction: true,
    });

    return httpCommunicationService
        .findById({
            id: route.paramMap.get('id'),
        });
};
