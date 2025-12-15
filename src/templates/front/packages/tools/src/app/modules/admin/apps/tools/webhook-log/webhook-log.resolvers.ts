import { inject } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    ResolveFn,
    RouterStateSnapshot,
} from '@angular/router';
import { ToolsWebhookLog } from '@apps/tools';
import {
    webhookLogColumnsConfig,
    WebhookLogService,
} from '@apps/tools/webhook-log';
import {
    Action,
    ActionService,
    GridData,
    GridFiltersStorageService,
    GridStateService,
    queryStatementHandler,
} from '@aurora';

export const webhookLogPaginationResolver: ResolveFn<
    GridData<ToolsWebhookLog>
> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const actionService = inject(ActionService);
    const gridFiltersStorageService = inject(GridFiltersStorageService);
    const gridStateService = inject(GridStateService);
    const webhookLogService = inject(WebhookLogService);

    actionService.action({
        id: 'tools::webhookLog.list.view',
        isViewAction: true,
    });

    const gridId = 'tools::webhookLog.list.mainGridList';
    gridStateService.setPaginationActionId(
        gridId,
        'tools::webhookLog.list.pagination',
    );
    gridStateService.setExportActionId(gridId, 'tools::webhookLog.list.export');

    return webhookLogService.pagination({
        query: queryStatementHandler({
            columnsConfig: webhookLogColumnsConfig(),
        })
            .setColumFilters(
                gridFiltersStorageService.getColumnFilterState(gridId),
            )
            .setSort(gridStateService.getSort(gridId))
            .setPage(gridStateService.getPage(gridId))
            .setSearch(gridStateService.getSearchState(gridId))
            .getQueryStatement(),
    });
};

export const webhookLogNewResolver: ResolveFn<Action> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
) => {
    const actionService = inject(ActionService);

    return actionService.action({
        id: 'tools::webhookLog.detail.new',
        isViewAction: true,
    });
};

export const webhookLogEditResolver: ResolveFn<{
    object: ToolsWebhookLog;
}> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const actionService = inject(ActionService);
    const webhookLogService = inject(WebhookLogService);

    actionService.action({
        id: 'tools::webhookLog.detail.edit',
        isViewAction: true,
    });

    return webhookLogService.findById({
        id: route.paramMap.get('id'),
    });
};
