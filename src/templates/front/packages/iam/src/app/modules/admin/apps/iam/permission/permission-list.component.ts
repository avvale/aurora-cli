import {
    ChangeDetectionStrategy,
    Component,
    ViewEncapsulation,
} from '@angular/core';
import { IamPermission } from '@apps/iam';
import {
    permissionColumnsConfig,
    PermissionService,
} from '@apps/iam/permission';
import {
    Action,
    ActionScope,
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

export const permissionMainGridListId = 'iam::permission.list.mainGridList';

@Component({
    selector: 'iam-permission-list',
    templateUrl: './permission-list.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [...defaultListImports],
})
@ActionScope('iam::permission.list')
export class PermissionListComponent extends ViewBaseComponent {
    // ---- customizations ----
    // ..

    breadcrumb: Crumb[] = [
        { translation: 'App', routerLink: ['/'] },
        { translation: 'iam.Permissions' },
    ];
    gridId: string = permissionMainGridListId;
    gridData$: Observable<GridData<IamPermission>>;
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
                        id: 'iam::permission.list.edit',
                        translation: 'edit',
                        icon: 'mode_edit',
                    },
                    {
                        id: 'iam::permission.list.delete',
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
        ...permissionColumnsConfig({ translator: this.translocoService }),
    ];

    constructor(
        private readonly gridColumnsConfigStorageService: GridColumnsConfigStorageService,
        private readonly gridFiltersStorageService: GridFiltersStorageService,
        private readonly gridStateService: GridStateService,
        private readonly permissionService: PermissionService,
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
            case 'iam::permission.list.view':
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

                this.gridData$ = this.permissionService.pagination$;
                break;

            case 'iam::permission.list.pagination':
                await lastValueFrom(
                    this.permissionService.pagination({
                        query: action.meta.query
                            ? action.meta.query
                            : queryStatementHandler({
                                  columnsConfig: permissionColumnsConfig(),
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

            case 'iam::permission.list.edit':
                this.router.navigate([
                    'iam/permission/edit',
                    action.meta.row.id,
                ]);
                break;

            case 'iam::permission.list.delete':
                const deleteDialogRef = this.confirmationService.open({
                    title: `${this.translocoService.translate('Delete')} ${this.translocoService.translate('iam.Permission')}`,
                    message: this.translocoService.translate(
                        'DeletionWarning',
                        {
                            entity: this.translocoService.translate(
                                'iam.Permission',
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
                                this.permissionService.deleteById<IamPermission>(
                                    {
                                        id: action.meta.row.id,
                                    },
                                ),
                            );

                            this.actionService.action({
                                id: 'iam::permission.list.pagination',
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

            case 'iam::permission.list.export':
                const rows = await lastValueFrom(
                    this.permissionService.get({
                        query: action.meta.query,
                    }),
                );

                const columns: string[] = permissionColumnsConfig({
                    translator: this.translocoService,
                }).map(
                    (permissionColumnConfig) => permissionColumnConfig.field,
                );
                const headers: string[] = permissionColumnsConfig({
                    translator: this.translocoService,
                }).map((permissionColumnConfig) =>
                    this.translocoService.translate(
                        permissionColumnConfig.translation,
                    ),
                );

                exportRows(
                    rows.objects,
                    'permissions.' + action.meta.format,
                    columns,
                    headers,
                    action.meta.format,
                );
                break;
            /* #endregion common actions */
        }
    }
}
