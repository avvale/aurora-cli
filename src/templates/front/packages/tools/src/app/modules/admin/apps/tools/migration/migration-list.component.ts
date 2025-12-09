import {
    ChangeDetectionStrategy,
    Component,
    ViewEncapsulation,
} from '@angular/core';
import {
    migrationColumnsConfig,
    MigrationService,
} from '@apps/tools/migration';
import { ToolsMigration } from '@apps/tools/tools.types';
import {
    Action,
    ColumnConfig,
    ColumnDataType,
    Crumb,
    defaultListImports,
    EnvironmentsInformationService,
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
import { firstValueFrom, lastValueFrom, Observable, takeUntil } from 'rxjs';

export const migrationMainGridListId = 'tools::migration.list.mainGridList';

@Component({
    selector: 'tools-migration-list',
    templateUrl: './migration-list.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [...defaultListImports],
})
export class MigrationListComponent extends ViewBaseComponent {
    // ---- customizations ----
    // ..

    breadcrumb: Crumb[] = [
        { translation: 'App', routerLink: ['/'] },
        { translation: 'tools.Migrations' },
    ];
    gridId: string = migrationMainGridListId;
    gridData$: Observable<GridData<ToolsMigration>>;
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
                        id: 'tools::migration.list.edit',
                        translation: 'edit',
                        icon: 'mode_edit',
                    },
                    {
                        id: 'tools::migration.list.delete',
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
        ...migrationColumnsConfig,
    ];

    constructor(
        private readonly gridColumnsConfigStorageService: GridColumnsConfigStorageService,
        private readonly gridFiltersStorageService: GridFiltersStorageService,
        private readonly gridStateService: GridStateService,
        private readonly migrationService: MigrationService,
        private readonly environmentsInformationService: EnvironmentsInformationService,
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
            case 'tools::migration.list.view':
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

                this.gridData$ = this.migrationService.pagination$;
                break;

            case 'tools::migration.list.pagination':
                await lastValueFrom(
                    this.migrationService.pagination({
                        query: action.meta.query
                            ? action.meta.query
                            : queryStatementHandler({
                                  columnsConfig: migrationColumnsConfig,
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

            case 'tools::migration.list.edit':
                this.router.navigate([
                    'tools/migration/edit',
                    action.meta.row.id,
                ]);
                break;

            case 'tools::migration.list.delete':
                const deleteDialogRef = this.confirmationService.open({
                    title: `${this.translocoService.translate('Delete')} ${this.translocoService.translate('tools.Migration')}`,
                    message: this.translocoService.translate(
                        'DeletionWarning',
                        {
                            entity: this.translocoService.translate(
                                'tools.Migration',
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
                                this.migrationService.deleteById<ToolsMigration>(
                                    {
                                        id: action.meta.row.id,
                                    },
                                ),
                            );

                            this.actionService.action({
                                id: 'tools::migration.list.pagination',
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

            case 'tools::migration.list.export':
                const rows = await lastValueFrom(
                    this.migrationService.get({
                        query: action.meta.query,
                    }),
                );

                const columns: string[] = migrationColumnsConfig.map(
                    (migrationColumnConfig) => migrationColumnConfig.field,
                );
                const headers: string[] = migrationColumnsConfig.map(
                    (migrationColumnConfig) =>
                        this.translocoService.translate(
                            migrationColumnConfig.translation,
                        ),
                );

                exportRows(
                    rows.objects,
                    'migrations.' + action.meta.format,
                    columns,
                    headers,
                    action.meta.format,
                );
                break;
            /* #endregion common actions */

            /* #region script actions */
            case 'tools::migration.list.runScripts':
                const environmentsInformation = await firstValueFrom(
                    this.environmentsInformationService
                        .environmentsInformation$,
                );

                const runScriptsDialogRef = this.confirmationService.open({
                    title: `${this.translocoService.translate('tools.RunScripts')}`,
                    message: this.translocoService.translate(
                        'tools.RunScriptsDisclaimer',
                        { version: environmentsInformation.back.version },
                    ),
                    icon: {
                        show: true,
                        name: 'heroicons_outline:exclamation-triangle',
                        color: 'warn',
                    },
                    actions: {
                        confirm: {
                            show: true,
                            label: this.translocoService.translate('tools.Run'),
                            color: 'warn',
                        },
                        cancel: {
                            show: true,
                            label: this.translocoService.translate('Cancel'),
                        },
                    },
                    dismissible: true,
                });

                runScriptsDialogRef.afterClosed().subscribe(async (result) => {
                    if (result === 'confirmed') {
                        try {
                            await lastValueFrom(
                                this.migrationService.runScriptsMigration(),
                            );

                            this.actionService.action({
                                id: 'tools::migration.list.pagination',
                                isViewAction: false,
                            });

                            this.snackBar.open(
                                `${this.translocoService.translate('tools.ScriptsExecutedSuccessfully')}`,
                                undefined,
                                {
                                    verticalPosition: 'top',
                                    duration: 3000,
                                },
                            );
                        } catch (error) {
                            log(
                                `[DEBUG] Catch error in ${action.id} action: ${error}`,
                            );
                        }
                    }
                });
                break;
            /* #endregion script actions */
        }
    }
}
