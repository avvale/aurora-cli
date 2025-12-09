import { inject } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    ResolveFn,
    RouterStateSnapshot,
} from '@angular/router';
import { SupportIssue } from '@apps/support';
import { issueColumnsConfig, IssueService } from '@apps/support/issue';
import {
    Action,
    ActionService,
    GridData,
    GridFiltersStorageService,
    GridStateService,
    queryStatementHandler,
} from '@aurora';

export const issuePaginationResolver: ResolveFn<GridData<SupportIssue>> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
) => {
    const actionService = inject(ActionService);
    const gridFiltersStorageService = inject(GridFiltersStorageService);
    const gridStateService = inject(GridStateService);
    const issueService = inject(IssueService);

    actionService.action({
        id: 'support::issue.list.view',
        isViewAction: true,
    });

    const gridId = 'support::issue.list.mainGridList';
    gridStateService.setPaginationActionId(
        gridId,
        'support::issue.list.pagination',
    );
    gridStateService.setExportActionId(gridId, 'support::issue.list.export');

    return issueService.pagination({
        query: queryStatementHandler({ columnsConfig: issueColumnsConfig() })
            .setColumFilters(
                gridFiltersStorageService.getColumnFilterState(gridId),
            )
            .setSort(gridStateService.getSort(gridId))
            .setPage(gridStateService.getPage(gridId))
            .setSearch(gridStateService.getSearchState(gridId))
            .getQueryStatement(),
    });
};

export const issueNewResolver: ResolveFn<Action> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
) => {
    const actionService = inject(ActionService);

    return actionService.action({
        id: 'support::issue.detail.new',
        isViewAction: true,
    });
};

export const issueEditResolver: ResolveFn<{
    object: SupportIssue;
}> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const actionService = inject(ActionService);
    const issueService = inject(IssueService);

    actionService.action({
        id: 'support::issue.detail.edit',
        isViewAction: true,
    });

    return issueService.findById({
        id: route.paramMap.get('id'),
        constraint: {
            include: [
                {
                    association: 'comments',
                },
            ],
            order: [['comments', 'rowId', 'DESC']],
        },
    });
};
