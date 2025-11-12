import { inject } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    ResolveFn,
    RouterStateSnapshot,
} from '@angular/router';
import { ToolsProcedure } from '@apps/tools';
import {
    procedureColumnsConfig,
    ProcedureService,
} from '@apps/tools/procedure';
import {
    Action,
    ActionService,
    GridData,
    GridFiltersStorageService,
    GridStateService,
    queryStatementHandler,
} from '@aurora';

export const procedurePaginationResolver: ResolveFn<
    GridData<ToolsProcedure>
> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const actionService = inject(ActionService);
    const gridFiltersStorageService = inject(GridFiltersStorageService);
    const gridStateService = inject(GridStateService);
    const procedureService = inject(ProcedureService);

    actionService.action({
        id: 'tools::procedure.list.view',
        isViewAction: true,
    });

    const gridId = 'tools::procedure.list.mainGridList';
    gridStateService.setPaginationActionId(
        gridId,
        'tools::procedure.list.pagination',
    );
    gridStateService.setExportActionId(gridId, 'tools::procedure.list.export');

    return procedureService.pagination({
        query: queryStatementHandler({ columnsConfig: procedureColumnsConfig })
            .setColumFilters(
                gridFiltersStorageService.getColumnFilterState(gridId),
            )
            .setSort(gridStateService.getSort(gridId))
            .setPage(gridStateService.getPage(gridId))
            .setSearch(gridStateService.getSearchState(gridId))
            .getQueryStatement(),
    });
};

export const procedureNewResolver: ResolveFn<Action> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
) => {
    const actionService = inject(ActionService);

    return actionService.action({
        id: 'tools::procedure.detail.new',
        isViewAction: true,
    });
};

export const procedureEditResolver: ResolveFn<{
    object: ToolsProcedure;
}> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const actionService = inject(ActionService);
    const procedureService = inject(ProcedureService);

    actionService.action({
        id: 'tools::procedure.detail.edit',
        isViewAction: true,
    });

    return procedureService.findById({
        id: route.paramMap.get('id'),
    });
};
