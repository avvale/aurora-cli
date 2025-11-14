import { inject } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    ResolveFn,
    RouterStateSnapshot,
} from '@angular/router';
import { QueueManagerQueue } from '@apps/queue-manager';
import { queueColumnsConfig, QueueService } from '@apps/queue-manager/queue';
import {
    Action,
    ActionService,
    GridData,
    GridFiltersStorageService,
    GridStateService,
    queryStatementHandler,
} from '@aurora';
import { jobColumnsConfig } from '../job/job.columns-config';

export const queuePaginationResolver: ResolveFn<GridData<QueueManagerQueue>> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
) => {
    const actionService = inject(ActionService);
    const gridFiltersStorageService = inject(GridFiltersStorageService);
    const gridStateService = inject(GridStateService);
    const queueService = inject(QueueService);

    actionService.action({
        id: 'queueManager::queue.list.view',
        isViewAction: true,
    });

    const gridId = 'queueManager::queue.list.mainGridList';
    gridStateService.setPaginationActionId(
        gridId,
        'queueManager::queue.list.pagination',
    );
    gridStateService.setExportActionId(
        gridId,
        'queueManager::queue.list.export',
    );

    return queueService.pagination({
        query: queryStatementHandler({ columnsConfig: queueColumnsConfig })
            .setColumFilters(
                gridFiltersStorageService.getColumnFilterState(gridId),
            )
            .setSort(gridStateService.getSort(gridId))
            .setPage(gridStateService.getPage(gridId))
            .setSearch(gridStateService.getSearchState(gridId))
            .getQueryStatement(),
    });
};

export const queueNewResolver: ResolveFn<Action> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
) => {
    const actionService = inject(ActionService);

    return actionService.action({
        id: 'queueManager::queue.detail.new',
        isViewAction: true,
    });
};

export const queueEditResolver: ResolveFn<{
    object: QueueManagerQueue;
}> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const actionService = inject(ActionService);
    const queueService = inject(QueueService);
    const gridFiltersStorageService = inject(GridFiltersStorageService);
    const gridStateService = inject(GridStateService);

    actionService.action({
        id: 'queueManager::queue.detail.edit',
        isViewAction: true,
    });

    // job grid elements manager
    const jobsGridId = 'queueManager::queue.detail.jobsGridList';
    gridStateService.setPaginationActionId(
        jobsGridId,
        'queueManager::queue.detail.jobsPagination',
    );
    gridStateService.setExportActionId(
        jobsGridId,
        'queueManager::queue.detail.exportJobs',
    );

    return queueService.findByIdWithRelations({
        id: route.paramMap.get('id'),
        queryPaginateJobs: queryStatementHandler({
            columnsConfig: jobColumnsConfig,
        })
            .setColumFilters(
                gridFiltersStorageService.getColumnFilterState(jobsGridId),
            )
            .setSort(gridStateService.getSort(jobsGridId))
            .setPage(gridStateService.getPage(jobsGridId))
            .setSearch(gridStateService.getSearchState(jobsGridId))
            .getQueryStatement(),
        constraintPaginateJobs: {
            where: {
                queueId: route.paramMap.get('id'),
                jobType: 'failed',
            },
        },
    });
};
