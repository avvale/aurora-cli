import { inject } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    ResolveFn,
    RouterStateSnapshot,
} from '@angular/router';
import { ToolsKeyValue } from '@apps/tools';
import { keyValueColumnsConfig, KeyValueService } from '@apps/tools/key-value';
import {
    Action,
    ActionService,
    GridData,
    GridFiltersStorageService,
    GridStateService,
    queryStatementHandler,
} from '@aurora';

export const keyValuePaginationResolver: ResolveFn<GridData<ToolsKeyValue>> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
) => {
    const actionService = inject(ActionService);
    const gridFiltersStorageService = inject(GridFiltersStorageService);
    const gridStateService = inject(GridStateService);
    const keyValueService = inject(KeyValueService);

    actionService.action({
        id: 'tools::keyValue.list.view',
        isViewAction: true,
    });

    const gridId = 'tools::keyValue.list.mainGridList';
    gridStateService.setPaginationActionId(
        gridId,
        'tools::keyValue.list.pagination',
    );
    gridStateService.setExportActionId(gridId, 'tools::keyValue.list.export');

    return keyValueService.pagination({
        query: queryStatementHandler({ columnsConfig: keyValueColumnsConfig })
            .setColumFilters(
                gridFiltersStorageService.getColumnFilterState(gridId),
            )
            .setSort(gridStateService.getSort(gridId))
            .setPage(gridStateService.getPage(gridId))
            .setSearch(gridStateService.getSearchState(gridId))
            .getQueryStatement(),
    });
};

export const keyValueNewResolver: ResolveFn<Action> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
) => {
    const actionService = inject(ActionService);

    return actionService.action({
        id: 'tools::keyValue.detail.new',
        isViewAction: true,
    });
};

export const keyValueEditResolver: ResolveFn<{
    object: ToolsKeyValue;
}> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const actionService = inject(ActionService);
    const keyValueService = inject(KeyValueService);

    actionService.action({
        id: 'tools::keyValue.detail.edit',
        isViewAction: true,
    });

    return keyValueService.findById({
        id: route.paramMap.get('id'),
    });
};
