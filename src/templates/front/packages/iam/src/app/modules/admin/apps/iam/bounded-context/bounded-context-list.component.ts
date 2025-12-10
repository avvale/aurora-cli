import {
    ChangeDetectionStrategy,
    Component,
    ViewEncapsulation,
} from '@angular/core';
import {
    boundedContextColumnsConfig,
    BoundedContextService,
} from '@apps/iam/bounded-context';
import { IamBoundedContext } from '@apps/iam/iam.types';
import {
    Action,
    ColumnConfig,
    ColumnDataType,
    Crumb,
    defaultListImports,
    exportRows,
    GridColumnsConfigStorageService,
    GridData,
    GridFiltersStorageService,
    GridState,
    GridStateService,
    log,
    queryStatementHandler,
    ViewBaseComponent,
} from '@aurora';
import { lastValueFrom, Observable, takeUntil } from 'rxjs';

export const boundedContextMainGridListId =
    'iam::boundedContext.list.mainGridList';

@Component({
    selector: 'iam-bounded-context-list',
    templateUrl: './bounded-context-list.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [...defaultListImports],
})
export class BoundedContextListComponent extends ViewBaseComponent {
    // ---- customizations ----
    // ..

    breadcrumb: Crumb[] = [
        { translation: 'App', routerLink: ['/'] },
        { translation: 'iam.BoundedContexts' },
    ];
    gridId: string = boundedContextMainGridListId;
    gridData$: Observable<GridData<IamBoundedContext>>;
    gridState: GridState = {};
    columnsConfig$: Observable<ColumnConfig[]>;
    originColumnsConfig: ColumnConfig[] = [
        {
            type: ColumnDataType.ACTIONS,
            field: 'Actions',
            sticky: true,
            actions: (row) => {
                return [
                    {
                        id: 'iam::boundedContext.list.edit',
                        translation: 'edit',
                        icon: 'mode_edit',
                    },
                    {
                        id: 'iam::boundedContext.list.delete',
                        translation: 'delete',
                        icon: 'delete',
                    },
                ];
            },
        },
        {
            type: ColumnDataType.CHECKBOX,
            field: 'select',
            translation: 'Selects',
            sticky: true,
        },
        ...boundedContextColumnsConfig,
    ];

    constructor(
        private readonly gridColumnsConfigStorageService: GridColumnsConfigStorageService,
        private readonly gridFiltersStorageService: GridFiltersStorageService,
        private readonly gridStateService: GridStateService,
        private readonly boundedContextService: BoundedContextService,
    ) {
        super();
    }

    // this method will be called after the ngOnInit of
    // the parent class you can use instead of ngOnInit
    init(): void {
        /**/
    }

    async handleAction(action: Action): Promise<void> {
        // add optional chaining (?.) to avoid first call where behaviour subject is undefined
        switch (action?.id) {
            /* #region common actions */
            case 'iam::boundedContext.list.view':
                this.columnsConfig$ = this.gridColumnsConfigStorageService
                    .getColumnsConfig(this.gridId, this.originColumnsConfig)
                    .pipe(takeUntil(this.unsubscribeAll$));

                this.gridState = {
                    columnFilters:
                        this.gridFiltersStorageService.getColumnFilterState(
                            this.gridId,
                        ),
                    page: this.gridStateService.getPage(this.gridId),
                    sort: this.gridStateService.getSort(this.gridId),
                    search: this.gridStateService.getSearchState(this.gridId),
                };

                this.gridData$ = this.boundedContextService.pagination$;
                break;

            case 'iam::boundedContext.list.pagination':
                await lastValueFrom(
                    this.boundedContextService.pagination({
                        query: action.meta.query
                            ? action.meta.query
                            : queryStatementHandler({
                                  columnsConfig: boundedContextColumnsConfig,
                              })
                                  .setColumFilters(
                                      this.gridFiltersStorageService.getColumnFilterState(
                                          this.gridId,
                                      ),
                                  )
                                  .setSort(
                                      this.gridStateService.getSort(
                                          this.gridId,
                                      ),
                                  )
                                  .setPage(
                                      this.gridStateService.getPage(
                                          this.gridId,
                                      ),
                                  )
                                  .setSearch(
                                      this.gridStateService.getSearchState(
                                          this.gridId,
                                      ),
                                  )
                                  .getQueryStatement(),
                    }),
                );
                break;

            case 'iam::boundedContext.list.edit':
                this.router.navigate([
                    'iam/bounded-context/edit',
                    action.meta.row.id,
                ]);
                break;

            case 'iam::boundedContext.list.delete':
                const deleteDialogRef = this.confirmationService.open({
                    title: `${this.translocoService.translate('Delete')} ${this.translocoService.translate('iam.BoundedContext')}`,
                    message: this.translocoService.translate(
                        'DeletionWarning',
                        {
                            entity: this.translocoService.translate(
                                'iam.BoundedContext',
                            ),
                        },
                    ),
                    icon: {
                        show: true,
                        name: 'heroicons_outline:exclamation-triangle',
                        color: 'warn',
                    },
                    actions: {
                        confirm: {
                            show: true,
                            label: this.translocoService.translate('Remove'),
                            color: 'warn',
                        },
                        cancel: {
                            show: true,
                            label: this.translocoService.translate('Cancel'),
                        },
                    },
                    dismissible: true,
                });

                deleteDialogRef.afterClosed().subscribe(async (result) => {
                    if (result === 'confirmed') {
                        try {
                            await lastValueFrom(
                                this.boundedContextService.deleteById<IamBoundedContext>(
                                    {
                                        id: action.meta.row.id,
                                    },
                                ),
                            );

                            this.actionService.action({
                                id: 'iam::boundedContext.list.pagination',
                                isViewAction: false,
                            });
                        } catch (error) {
                            log(
                                `[DEBUG] Catch error in ${action.id} action: ${error}`,
                            );
                        }
                    }
                });
                break;

            case 'iam::boundedContext.list.export':
                const rows = await lastValueFrom(
                    this.boundedContextService.get({
                        query: action.meta.query,
                    }),
                );

                const columns: string[] = boundedContextColumnsConfig.map(
                    (boundedContextColumnConfig) =>
                        boundedContextColumnConfig.field,
                );
                const headers: string[] = boundedContextColumnsConfig.map(
                    (boundedContextColumnConfig) =>
                        this.translocoService.translate(
                            boundedContextColumnConfig.translation,
                        ),
                );

                exportRows(
                    rows.objects,
                    'boundedContexts.' + action.meta.format,
                    columns,
                    headers,
                    action.meta.format,
                );
                break;
            /* #endregion common actions */
        }
    }
}
