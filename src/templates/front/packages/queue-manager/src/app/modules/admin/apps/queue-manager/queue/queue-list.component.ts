import { QueueManagerQueue } from '../queue-manager.types';
import { queueColumnsConfig } from './queue.columns-config';
import { QueueService } from './queue.service';
import { ChangeDetectionStrategy, Component, Injector, ViewEncapsulation } from '@angular/core';
import { Action, ColumnConfig, ColumnDataType, Crumb, defaultListImports, exportRows, GridColumnsConfigStorageService, GridData, GridFiltersStorageService, GridState, GridStateService, log, QueryStatementHandler, ViewBaseComponent } from '@aurora';
import { lastValueFrom, Observable, takeUntil } from 'rxjs';

@Component({
    selector       : 'queue-manager-queue-list',
    templateUrl    : './queue-list.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone     : true,
    imports        : [
        ...defaultListImports,
    ],
})
export class QueueListComponent extends ViewBaseComponent
{
    // ---- customizations ----
    // ..

    breadcrumb: Crumb[] = [
        { translation: 'App', routerLink: ['/']},
        { translation: 'queueManager.Queues' },
    ];
    gridId: string = 'queueManager::queue.list.mainGridList';
    gridData$: Observable<GridData<QueueManagerQueue>>;
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
                        id         : 'queueManager::queue.list.edit',
                        translation: 'edit',
                        icon       : 'mode_edit',
                    },
                    {
                        id         : 'queueManager::queue.list.delete',
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
        ...queueColumnsConfig,
    ];

    constructor(
        protected readonly injector: Injector,
        private readonly gridColumnsConfigStorageService: GridColumnsConfigStorageService,
        private readonly gridFiltersStorageService: GridFiltersStorageService,
        private readonly gridStateService: GridStateService,
        private readonly queueService: QueueService,
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
            case 'queueManager::queue.list.view':
                this.columnsConfig$ = this.gridColumnsConfigStorageService
                    .getColumnsConfig(this.gridId, this.originColumnsConfig)
                    .pipe(takeUntil(this.unsubscribeAll$));

                this.gridState = {
                    columnFilters: this.gridFiltersStorageService.getColumnFilterState(this.gridId),
                    page         : this.gridStateService.getPage(this.gridId),
                    sort         : this.gridStateService.getSort(this.gridId),
                    search       : this.gridStateService.getSearchState(this.gridId),
                };

                this.gridData$ = this.queueService.pagination$;
                break;

            case 'queueManager::queue.list.pagination':
                await lastValueFrom(
                    this.queueService.pagination({
                        query: action.meta.query ?
                            action.meta.query :
                            QueryStatementHandler
                                .init({ columnsConfig: queueColumnsConfig })
                                .setColumFilters(this.gridFiltersStorageService.getColumnFilterState(this.gridId))
                                .setSort(this.gridStateService.getSort(this.gridId))
                                .setPage(this.gridStateService.getPage(this.gridId))
                                .setSearch(this.gridStateService.getSearchState(this.gridId))
                                .getQueryStatement(),
                    }),
                );
                break;

            case 'queueManager::queue.list.edit':
                this.router
                    .navigate([
                        'queue-manager/queue/edit',
                        action.meta.row.id,
                    ]);
                break;

            case 'queueManager::queue.list.delete':
                const deleteDialogRef = this.confirmationService.open({
                    title  : `${this.translocoService.translate('Delete')} ${this.translocoService.translate('queueManager.Queue')}`,
                    message: this.translocoService.translate('DeletionWarning', { entity: this.translocoService.translate('queueManager.Queue') }),
                    icon   : {
                        show : true,
                        name : 'heroicons_outline:exclamation-triangle',
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
                                    this.queueService
                                        .deleteById<QueueManagerQueue>({
                                            id: action.meta.row.id,
                                        }),
                                );

                                this.actionService.action({
                                    id          : 'queueManager::queue.list.pagination',
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

            case 'queueManager::queue.list.export':
                const rows = await lastValueFrom(
                    this.queueService
                        .get({
                            query: action.meta.query,
                        }),
                );

                // format export rows
                (rows.objects as any[]).forEach(row =>
                {
                    // row.id = row.id;
                });

                const columns: string[] = queueColumnsConfig.map(queueColumnConfig => queueColumnConfig.field);
                const headers: string[] = columns.map(column => this.translocoService.translate('queueManager.' + column.toPascalCase()));

                exportRows(
                    rows.objects,
                    'queues.' + action.meta.format,
                    columns,
                    headers,
                    action.meta.format,
                );
                break;
        }
    }
}
