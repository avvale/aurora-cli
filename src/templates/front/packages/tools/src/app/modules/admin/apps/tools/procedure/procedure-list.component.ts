import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { procedureColumnsConfig, ProcedureService } from '@apps/tools/procedure';
import { ToolsProcedure } from '@apps/tools/tools.types';
import { Action, ColumnConfig, ColumnDataType, Crumb, defaultListImports, exportRows, GridColumnsConfigStorageService, GridData, GridFiltersStorageService, GridState, GridStateService, log, queryStatementHandler, ViewBaseComponent } from '@aurora';
import { lastValueFrom, Observable, takeUntil } from 'rxjs';

export const procedureMainGridListId = 'tools::procedure.list.mainGridList';

@Component({
    selector       : 'tools-procedure-list',
    templateUrl    : './procedure-list.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone     : true,
    imports        : [
        ...defaultListImports,
    ],
})
export class ProcedureListComponent extends ViewBaseComponent
{
    // ---- customizations ----
    // ..

    breadcrumb: Crumb[] = [
        { translation: 'App', routerLink: ['/']},
        { translation: 'tools.Procedures' },
    ];
    gridId: string = procedureMainGridListId;
    gridData$: Observable<GridData<ToolsProcedure>>;
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
                        id         : 'tools::procedure.list.edit',
                        translation: 'edit',
                        icon       : 'mode_edit',
                    },
                    {
                        id         : 'tools::procedure.list.delete',
                        translation: 'delete',
                        icon       : 'delete',
                    },
                    {
                        id         : 'tools::procedure.list.check',
                        translation: 'check',
                        icon       : 'sync',
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
        ...procedureColumnsConfig,
    ];

    constructor(
        private readonly gridColumnsConfigStorageService: GridColumnsConfigStorageService,
        private readonly gridFiltersStorageService: GridFiltersStorageService,
        private readonly gridStateService: GridStateService,
        private readonly procedureService: ProcedureService,
    )
    {
        super();
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
            /* #region common actions */
            case 'tools::procedure.list.view':
                this.columnsConfig$ = this.gridColumnsConfigStorageService
                    .getColumnsConfig(this.gridId, this.originColumnsConfig)
                    .pipe(takeUntil(this.unsubscribeAll$));

                this.gridState = {
                    columnFilters: this.gridFiltersStorageService.getColumnFilterState(this.gridId),
                    page         : this.gridStateService.getPage(this.gridId),
                    sort         : this.gridStateService.getSort(this.gridId),
                    search       : this.gridStateService.getSearchState(this.gridId),
                };

                this.gridData$ = this.procedureService.pagination$;
                break;

            case 'tools::procedure.list.pagination':
                await lastValueFrom(
                    this.procedureService.pagination({
                        query: action.meta.query ?
                            action.meta.query :
                            queryStatementHandler({ columnsConfig: procedureColumnsConfig })
                                .setColumFilters(this.gridFiltersStorageService.getColumnFilterState(this.gridId))
                                .setSort(this.gridStateService.getSort(this.gridId))
                                .setPage(this.gridStateService.getPage(this.gridId))
                                .setSearch(this.gridStateService.getSearchState(this.gridId))
                                .getQueryStatement(),
                    }),
                );
                break;

            case 'tools::procedure.list.edit':
                this.router
                    .navigate([
                        'tools/procedure/edit',
                        action.meta.row.id,
                    ]);
                break;

            case 'tools::procedure.list.delete':
                const deleteDialogRef = this.confirmationService.open({
                    title  : `${this.translocoService.translate('Delete')} ${this.translocoService.translate('tools.Procedure')}`,
                    message: this.translocoService.translate('DeletionWarning', { entity: this.translocoService.translate('tools.Procedure') }),
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
                                    this.procedureService
                                        .deleteById<ToolsProcedure>({
                                            id: action.meta.row.id,
                                        }),
                                );

                                this.actionService.action({
                                    id          : 'tools::procedure.list.pagination',
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

            case 'tools::procedure.list.export':
                const rows = await lastValueFrom(
                    this.procedureService
                        .get({
                            query: action.meta.query,
                        }),
                );

                const columns: string[] = procedureColumnsConfig.map(procedureColumnConfig => procedureColumnConfig.field);
                const headers: string[] = procedureColumnsConfig.map(procedureColumnConfig => this.translocoService.translate(procedureColumnConfig.translation));

                exportRows(
                    rows.objects,
                    'procedures.' + action.meta.format,
                    columns,
                    headers,
                    action.meta.format,
                );
                break;
                /* #endregion common actions */

            case 'tools::procedure.list.check':
                try
                {
                    await lastValueFrom(
                        this.procedureService
                            .checkScriptProcedure<ToolsProcedure>({
                                procedureId: action.meta.row.id,
                            }),
                    );

                    this.actionService.action({
                        id          : 'tools::procedure.list.pagination',
                        isViewAction: false,
                    });
                }
                catch(error)
                {
                    log(`[DEBUG] Catch error in ${action.id} action: ${error}`);
                }
                break;
        }
    }
}
