import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Action, ActionService, GridData, GridFiltersStorageService, GridStateService, QueryStatementHandler } from '@aurora';
import { Observable, Subject, first, map } from 'rxjs';
import { QueueManagerJob, QueueManagerJobRegistry } from '../queue-manager.types';
import { jobRegistryColumnsConfig } from './job-registry.columns-config';
import { JobService } from '../job/job.service';
import { JobRegistryService } from './job-registry.service';

@Injectable({
    providedIn: 'root',
})
export class JobRegistryPaginationResolver implements Resolve<GridData<QueueManagerJobRegistry>>
{
    constructor(
        private readonly actionService: ActionService,
        private readonly gridFiltersStorageService: GridFiltersStorageService,
        private readonly gridStateService: GridStateService,
        private readonly jobRegistryService: JobRegistryService,
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
    ): Observable<GridData<QueueManagerJobRegistry>>
    {
        this.actionService.action({
            id          : 'queueManager::jobRegistry.list.view',
            isViewAction: true,
        });

        const gridId = 'queueManager::jobRegistry.list.mainGridList';
        this.gridStateService.setPaginationActionId(gridId, 'queueManager::jobRegistry.list.pagination');
        this.gridStateService.setExportActionId(gridId, 'queueManager::jobRegistry.list.export');

        return this.jobRegistryService.pagination({
            query: QueryStatementHandler
                .init({ columnsConfig: jobRegistryColumnsConfig })
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
export class JobRegistryNewResolver implements Resolve<Action>
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
            id          : 'queueManager::jobRegistry.detail.new',
            isViewAction: true,
        });
    }
}

@Injectable({
    providedIn: 'root',
})
export class JobRegistryEditResolver implements Resolve<{
	object: QueueManagerJob;
}>
{
    constructor(
		private readonly actionService: ActionService,
		private readonly jobRegistryService: JobRegistryService,
        private readonly jobService: JobService,
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
		object: QueueManagerJob;
    }>
    {
        this.actionService.action({
            id          : 'queueManager::jobRegistry.detail.edit',
            isViewAction: true,
        });

        const jobResponse = new Subject<{ object: QueueManagerJob; }>();
        this.jobRegistryService.findById({
            id: route.paramMap.get('id'),
        })
            .pipe(
                map(response => response.object),
                first(),
            )
            .subscribe(jobRegistry =>
            {
                this.jobService
                    .findById({
                        id  : jobRegistry.jobId,
                        name: jobRegistry.queueName,
                    })
                    .pipe(
                        first(),
                    )
                    .subscribe(job =>
                    {
                        jobResponse.next(job);
                    });
            });

        return jobResponse;
    }
}
