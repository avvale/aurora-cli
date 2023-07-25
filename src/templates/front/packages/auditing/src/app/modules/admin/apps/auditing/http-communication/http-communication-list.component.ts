import { AuditingHttpCommunication } from '../auditing.types';
import { httpCommunicationColumnsConfig } from './http-communication.columns-config';
import { HttpCommunicationService } from './http-communication.service';
import { ChangeDetectionStrategy, Component, Injector, ViewEncapsulation } from '@angular/core';
import { Action, ColumnConfig, ColumnDataType, Crumb, defaultListImports, exportRows, GridColumnsConfigStorageService, GridData, GridFiltersStorageService, GridState, GridStateService, log, QueryStatementHandler, ViewBaseComponent } from '@aurora';
import { lastValueFrom, Observable, takeUntil } from 'rxjs';

@Component({
    selector       : 'auditing-http-communication-list',
    templateUrl    : './http-communication-list.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone     : true,
    imports        : [
        ...defaultListImports,
    ],
})
export class HttpCommunicationListComponent extends ViewBaseComponent
{
    // ---- customizations ----
    // ..

    breadcrumb: Crumb[] = [
        { translation: 'App', routerLink: ['/']},
        { translation: 'auditing.HttpCommunications' },
    ];
    gridId: string = 'auditing::httpCommunication.list.mainGridList';
    gridData$: Observable<GridData<AuditingHttpCommunication>>;
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
                        id         : 'auditing::httpCommunication.list.edit',
                        translation: 'edit',
                        icon       : 'mode_edit',
                    },
                    {
                        id         : 'auditing::httpCommunication.list.delete',
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
        ...httpCommunicationColumnsConfig,
    ];

    constructor(
        protected readonly injector: Injector,
        private readonly gridColumnsConfigStorageService: GridColumnsConfigStorageService,
        private readonly gridFiltersStorageService: GridFiltersStorageService,
        private readonly gridStateService: GridStateService,
        private readonly httpCommunicationService: HttpCommunicationService,
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
            case 'auditing::httpCommunication.list.view':
                this.columnsConfig$ = this.gridColumnsConfigStorageService
                    .getColumnsConfig(this.gridId, this.originColumnsConfig)
                    .pipe(takeUntil(this.unsubscribeAll$));

                this.gridState = {
                    columnFilters: this.gridFiltersStorageService.getColumnFilterState(this.gridId),
                    page         : this.gridStateService.getPage(this.gridId),
                    sort         : this.gridStateService.getSort(this.gridId),
                    search       : this.gridStateService.getSearchState(this.gridId),
                };

                this.gridData$ = this.httpCommunicationService.pagination$;
                break;

            case 'auditing::httpCommunication.list.pagination':
                await lastValueFrom(
                    this.httpCommunicationService.pagination({
                        query: action.meta.query ?
                            action.meta.query :
                            QueryStatementHandler
                                .init({ columnsConfig: httpCommunicationColumnsConfig })
                                .setColumFilters(this.gridFiltersStorageService.getColumnFilterState(this.gridId))
                                .setSort(this.gridStateService.getSort(this.gridId))
                                .setPage(this.gridStateService.getPage(this.gridId))
                                .setSearch(this.gridStateService.getSearchState(this.gridId))
                                .getQueryStatement(),
                    }),
                );
                break;

            case 'auditing::httpCommunication.list.edit':
                this.router
                    .navigate([
                        'auditing/http-communication/edit',
                        action.meta.row.id,
                    ]);
                break;

            case 'auditing::httpCommunication.list.delete':
                const deleteDialogRef = this.confirmationService.open({
                    title  : `${this.translocoService.translate('Delete')} ${this.translocoService.translate('auditing.HttpCommunication')}`,
                    message: this.translocoService.translate('DeletionWarning', { entity: this.translocoService.translate('auditing.HttpCommunication') }),
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
                                    this.httpCommunicationService
                                        .deleteById<AuditingHttpCommunication>({
                                            id: action.meta.row.id,
                                        }),
                                );

                                this.actionService.action({
                                    id          : 'auditing::httpCommunication.list.pagination',
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

            case 'auditing::httpCommunication.list.export':
                const rows = await lastValueFrom(
                    this.httpCommunicationService
                        .get({
                            query: action.meta.query,
                        }),
                );

                // format export rows
                (rows.objects as any[]).forEach(row =>
                {
                    // row.id = row.id;
                });

                const columns: string[] = httpCommunicationColumnsConfig.map(httpCommunicationColumnConfig => httpCommunicationColumnConfig.field);
                const headers: string[] = columns.map(column => this.translocoService.translate('auditing.' + column.toPascalCase()));

                exportRows(
                    rows.objects,
                    'httpCommunications.' + action.meta.format,
                    columns,
                    headers,
                    action.meta.format,
                );
                break;
        }
    }
}
