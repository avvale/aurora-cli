import { inject } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    ResolveFn,
    RouterStateSnapshot,
} from '@angular/router';
import { ToolsWebhook } from '@apps/tools';
import { webhookColumnsConfig, WebhookService } from '@apps/tools/webhook';
import {
    Action,
    ActionService,
    GridData,
    GridFiltersStorageService,
    GridStateService,
    queryStatementHandler,
} from '@aurora';

export const webhookPaginationResolver: ResolveFn<GridData<ToolsWebhook>> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
) => {
    const actionService = inject(ActionService);
    const gridFiltersStorageService = inject(GridFiltersStorageService);
    const gridStateService = inject(GridStateService);
    const webhookService = inject(WebhookService);

    actionService.action({
        id: 'tools::webhook.list.view',
        isViewAction: true,
    });

    const gridId = 'tools::webhook.list.mainGridList';
    gridStateService.setPaginationActionId(
        gridId,
        'tools::webhook.list.pagination',
    );
    gridStateService.setExportActionId(gridId, 'tools::webhook.list.export');

    return webhookService.pagination({
        query: queryStatementHandler({ columnsConfig: webhookColumnsConfig() })
            .setColumFilters(
                gridFiltersStorageService.getColumnFilterState(gridId),
            )
            .setSort(gridStateService.getSort(gridId))
            .setPage(gridStateService.getPage(gridId))
            .setSearch(gridStateService.getSearchState(gridId))
            .getQueryStatement(),
    });
};

export const webhookNewResolver: ResolveFn<Action> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
) => {
    const actionService = inject(ActionService);

    return actionService.action({
        id: 'tools::webhook.detail.new',
        isViewAction: true,
    });
};

export const webhookEditResolver: ResolveFn<{
    object: ToolsWebhook;
}> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const actionService = inject(ActionService);
    const webhookService = inject(WebhookService);

    actionService.action({
        id: 'tools::webhook.detail.edit',
        isViewAction: true,
    });

    return webhookService.findById({
        id: route.paramMap.get('id'),
    });
};
