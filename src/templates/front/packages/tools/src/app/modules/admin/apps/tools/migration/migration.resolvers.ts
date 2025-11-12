import { inject } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    ResolveFn,
    RouterStateSnapshot,
} from '@angular/router';
import { ToolsMigration } from '@apps/tools';
import {
    migrationColumnsConfig,
    MigrationService,
} from '@apps/tools/migration';
import {
    Action,
    ActionService,
    GridData,
    GridFiltersStorageService,
    GridStateService,
    queryStatementHandler,
} from '@aurora';

export const migrationPaginationResolver: ResolveFn<
    GridData<ToolsMigration>
> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const actionService = inject(ActionService);
    const gridFiltersStorageService = inject(GridFiltersStorageService);
    const gridStateService = inject(GridStateService);
    const migrationService = inject(MigrationService);

    actionService.action({
        id: 'tools::migration.list.view',
        isViewAction: true,
    });

    const gridId = 'tools::migration.list.mainGridList';
    gridStateService.setPaginationActionId(
        gridId,
        'tools::migration.list.pagination',
    );
    gridStateService.setExportActionId(gridId, 'tools::migration.list.export');

    return migrationService.pagination({
        query: queryStatementHandler({ columnsConfig: migrationColumnsConfig })
            .setColumFilters(
                gridFiltersStorageService.getColumnFilterState(gridId),
            )
            .setSort(gridStateService.getSort(gridId))
            .setPage(gridStateService.getPage(gridId))
            .setSearch(gridStateService.getSearchState(gridId))
            .getQueryStatement(),
    });
};

export const migrationNewResolver: ResolveFn<Action> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
) => {
    const actionService = inject(ActionService);

    return actionService.action({
        id: 'tools::migration.detail.new',
        isViewAction: true,
    });
};

export const migrationEditResolver: ResolveFn<{
    object: ToolsMigration;
}> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const actionService = inject(ActionService);
    const migrationService = inject(MigrationService);

    actionService.action({
        id: 'tools::migration.detail.edit',
        isViewAction: true,
    });

    return migrationService.findById({
        id: route.paramMap.get('id'),
    });
};
