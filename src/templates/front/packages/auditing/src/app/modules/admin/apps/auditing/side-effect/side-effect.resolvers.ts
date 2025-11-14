import { inject } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    ResolveFn,
    RouterStateSnapshot,
} from '@angular/router';
import { AuditingSideEffect } from '@apps/auditing';
import {
    sideEffectColumnsConfig,
    SideEffectService,
} from '@apps/auditing/side-effect';
import {
    Action,
    ActionService,
    GridData,
    GridFiltersStorageService,
    GridStateService,
    queryStatementHandler,
} from '@aurora';

export const sideEffectPaginationResolver: ResolveFn<
    GridData<AuditingSideEffect>
> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const actionService = inject(ActionService);
    const gridFiltersStorageService = inject(GridFiltersStorageService);
    const gridStateService = inject(GridStateService);
    const sideEffectService = inject(SideEffectService);

    actionService.action({
        id: 'auditing::sideEffect.list.view',
        isViewAction: true,
    });

    const gridId = 'auditing::sideEffect.list.mainGridList';
    gridStateService.setPaginationActionId(
        gridId,
        'auditing::sideEffect.list.pagination',
    );
    gridStateService.setExportActionId(
        gridId,
        'auditing::sideEffect.list.export',
    );

    return sideEffectService.pagination({
        query: queryStatementHandler({ columnsConfig: sideEffectColumnsConfig })
            .setColumFilters(
                gridFiltersStorageService.getColumnFilterState(gridId),
            )
            .setSort(gridStateService.getSort(gridId))
            .setPage(gridStateService.getPage(gridId))
            .setSearch(gridStateService.getSearchState(gridId))
            .getQueryStatement(),
    });
};

export const sideEffectNewResolver: ResolveFn<Action> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
) => {
    const actionService = inject(ActionService);

    return actionService.action({
        id: 'auditing::sideEffect.detail.new',
        isViewAction: true,
    });
};

export const sideEffectEditResolver: ResolveFn<{
    object: AuditingSideEffect;
}> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const actionService = inject(ActionService);
    const sideEffectService = inject(SideEffectService);

    actionService.action({
        id: 'auditing::sideEffect.detail.edit',
        isViewAction: true,
    });

    return sideEffectService.findById({
        id: route.paramMap.get('id'),
    });
};
