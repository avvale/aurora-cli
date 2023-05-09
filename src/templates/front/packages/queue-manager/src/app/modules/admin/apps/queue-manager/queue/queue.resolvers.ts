import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Action, ActionService, GridData, GridFiltersStorageService, GridStateService, QueryStatementHandler } from '@aurora';
import { Observable } from 'rxjs';
import { QueueManagerQueue } from '../queue-manager.types';
import { queueColumnsConfig } from './queue.columns-config';
import { jobColumnsConfig } from '../job/job.columns-config';
import { QueueService } from './queue.service';

@Injectable({
    providedIn: 'root',
})
export class QueuePaginationResolver implements Resolve<GridData<QueueManagerQueue>>
{
    constructor(
        private readonly actionService: ActionService,
        private readonly gridFiltersStorageService: GridFiltersStorageService,
        private readonly gridStateService: GridStateService,
        private readonly queueService: QueueService,
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
    ): Observable<GridData<QueueManagerQueue>>
    {
        this.actionService.action({
            id          : 'queueManager::queue.list.view',
            isViewAction: true,
        });

        const gridId = 'queueManager::queue.list.mainGridList';
        this.gridStateService.setPaginationActionId(gridId, 'queueManager::queue.list.pagination');
        this.gridStateService.setExportActionId(gridId, 'queueManager::queue.list.export');

        return this.queueService.pagination({
            query: QueryStatementHandler
                .init({ columnsConfig: queueColumnsConfig })
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
export class QueueNewResolver implements Resolve<Action>
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
            id          : 'queueManager::queue.detail.new',
            isViewAction: true,
        });
    }
}

@Injectable({
    providedIn: 'root',
})
export class QueueEditResolver implements Resolve<{
	object: QueueManagerQueue;
}>
{
    constructor(
		private readonly actionService: ActionService,
        private readonly gridFiltersStorageService: GridFiltersStorageService,
        private readonly gridStateService: GridStateService,
		private readonly queueService: QueueService,
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
		object: QueueManagerQueue;
    }>
    {
        this.actionService.action({
            id          : 'queueManager::queue.detail.edit',
            isViewAction: true,
        });

        // job grid elements manager
        const jobsGridId = 'queueManager::queue.detail.jobsGridList';
        this.gridStateService.setPaginationActionId(jobsGridId, 'queueManager::queue.detail.jobsPagination');
        this.gridStateService.setExportActionId(jobsGridId, 'queueManager::queue.detail.exportJobs');

        return this.queueService.findByIdWithRelations({
            id               : route.paramMap.get('id'),
            queryPaginateJobs: QueryStatementHandler
                .init({ columnsConfig: jobColumnsConfig })
                .setColumFilters(this.gridFiltersStorageService.getColumnFilterState(jobsGridId))
                .setSort(this.gridStateService.getSort(jobsGridId))
                .setPage(this.gridStateService.getPage(jobsGridId))
                .setSearch(this.gridStateService.getSearchState(jobsGridId))
                .getQueryStatement(),
            constraintPaginateJobs: {
                where: {
                    queueId: route.paramMap.get('id'),
                    jobType: 'failed',
                },
            },
        });
    }
}
