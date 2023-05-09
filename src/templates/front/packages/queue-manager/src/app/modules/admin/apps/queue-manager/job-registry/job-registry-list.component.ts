import { ChangeDetectionStrategy, Component, Injector, ViewEncapsulation } from '@angular/core';
import { Action, ColumnConfig, ColumnDataType, Crumb, exportRows, GridColumnsConfigStorageService, GridData, GridFiltersStorageService, GridState, GridStateService, log, QueryStatementHandler, ViewBaseComponent } from '@aurora';
import { lastValueFrom, Observable, takeUntil } from 'rxjs';
import { QueueManagerJobRegistry } from '../queue-manager.types';
import { JobRegistryService } from './job-registry.service';
import { jobRegistryColumnsConfig } from './job-registry.columns-config';

@Component({
    selector       : 'queue-manager-job-registry-list',
    templateUrl    : './job-registry-list.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JobRegistryListComponent extends ViewBaseComponent
{
    // ---- customizations ----
    // ..

    breadcrumb: Crumb[] = [
        { translation: 'App', routerLink: ['/']},
        { translation: 'queueManager.JobsRegistry' },
    ];
    gridId: string = 'queueManager::jobRegistry.list.mainGridList';
    gridData$: Observable<GridData<QueueManagerJobRegistry>>;
    gridState: GridState = {};
    columnsConfig$: Observable<ColumnConfig[]>;
    originColumnsConfig: ColumnConfig[] = [
        {
            type   : ColumnDataType.ACTIONS,
            field  : 'Actions',
            sticky : true,
            actions: row =>
            {
                return [
                    {
                        id         : 'queueManager::jobRegistry.list.edit',
                        translation: 'view',
                        icon       : 'pageview',
                    },
                    {
                        id         : 'queueManager::jobRegistry.list.delete',
                        translation: 'delete',
                        icon       : 'delete',
                    },
                ];
            },
        },
        {
            type       : ColumnDataType.CHECKBOX,
            field      : 'select',
            translation: 'Selects',
            sticky     : true,
        },
        ...jobRegistryColumnsConfig,
    ];

    constructor(
        protected readonly injector: Injector,
        private readonly gridColumnsConfigStorageService: GridColumnsConfigStorageService,
        private readonly gridFiltersStorageService: GridFiltersStorageService,
        private readonly gridStateService: GridStateService,
        private readonly jobRegistryService: JobRegistryService,
    )
    {
        super(injector);
    }

    // this method will be called after the ngOnInit of
    // the parent class you can use instead of ngOnInit
    init(): void
    { /**/ }

    async handleAction(action: Action): Promise<void>
    {
        // add optional chaining (?.) to avoid first call where behaviour subject is undefined
        switch (action?.id)
        {
            case 'queueManager::jobRegistry.list.view':
                this.columnsConfig$ = this.gridColumnsConfigStorageService
                    .getColumnsConfig(this.gridId, this.originColumnsConfig)
                    .pipe(takeUntil(this.unsubscribeAll$));

                this.gridState = {
                    columnFilters: this.gridFiltersStorageService.getColumnFilterState(this.gridId),
                    page         : this.gridStateService.getPage(this.gridId),
                    sort         : this.gridStateService.getSort(this.gridId),
                    search       : this.gridStateService.getSearchState(this.gridId),
                };

                this.gridData$ = this.jobRegistryService.pagination$;
                break;

            case 'queueManager::jobRegistry.list.pagination':
                await lastValueFrom(
                    this.jobRegistryService.pagination({
                        query: action.data.query ?
                            action.data.query :
                            QueryStatementHandler
                                .init({ columnsConfig: jobRegistryColumnsConfig })
                                .setColumFilters(this.gridFiltersStorageService.getColumnFilterState(this.gridId))
                                .setSort(this.gridStateService.getSort(this.gridId))
                                .setPage(this.gridStateService.getPage(this.gridId))
                                .setSearch(this.gridStateService.getSearchState(this.gridId))
                                .getQueryStatement(),
                    }),
                );
                break;

            case 'queueManager::jobRegistry.list.edit':
                this.router.navigate(['queue-manager/job-registry/edit', action.data.row.id]);
                break;

            case 'queueManager::jobRegistry.list.delete':
                const deleteDialogRef = this.confirmationService.open({
                    title  : `${this.translocoService.translate('Delete')} ${this.translocoService.translate('queueManager.JobRegistry')}`,
                    message: this.translocoService.translate('DeletionWarning', { entity: this.translocoService.translate('queueManager.JobRegistry') }),
                    icon   : {
                        show : true,
                        name : 'heroicons_outline:exclamation',
                        color: 'warn',
                    },
                    actions: {
                        confirm: {
                            show : true,
                            label: this.translocoService.translate('Remove'),
                            color: 'warn',
                        },
                        cancel: {
                            show : true,
                            label: this.translocoService.translate('Cancel'),
                        },
                    },
                    dismissible: true,
                });

                deleteDialogRef.afterClosed()
                    .subscribe(async result =>
                    {
                        if (result === 'confirmed')
                        {
                            try
                            {
                                await lastValueFrom(
                                    this.jobRegistryService
                                        .deleteById<QueueManagerJobRegistry>(action.data.row.id),
                                );
                                this.actionService.action({
                                    id          : 'queueManager::jobRegistry.list.pagination',
                                    isViewAction: false,
                                });
                            }
                            catch(error)
                            {
                                log(`[DEBUG] Catch error in ${action.id} action: ${error}`);
                            }
                        }
                    });
                break;

            case 'queueManager::jobRegistry.list.export':
                const rows = await lastValueFrom(
                    this.jobRegistryService
                        .get({
                            query: action.data.query,
                        }),
                );

                // format export rows
                (rows.objects as any[]).forEach(row => {
                    // row.id = row.id;
                });

                const columns: string[] = jobRegistryColumnsConfig.map(jobRegistryColumnConfig => jobRegistryColumnConfig.field);
                const headers: string[] = columns.map(column => this.translocoService.translate('queueManager.' + column.toPascalCase()));

                exportRows(
                    rows.objects,
                    'jobsRegistry.' + action.data.format,
                    columns,
                    headers,
                    action.data.format,
                );
                break;
        }
    }
}
