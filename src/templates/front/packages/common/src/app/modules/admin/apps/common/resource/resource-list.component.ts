/**
 * @aurora-generated
 * @source cliter/common/resource.aurora.yaml
 */
import {
    ChangeDetectionStrategy,
    Component,
    ViewEncapsulation,
} from '@angular/core';
import { CommonResource } from '@apps/common';
import { resourceColumnsConfig, ResourceService } from '@apps/common/resource';
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
    gridQueryHandler,
    GridState,
    GridStateService,
    log,
    ViewBaseComponent,
} from '@aurora';
import { lastValueFrom, Observable, takeUntil } from 'rxjs';

export const resourceMainGridListId = 'common::resource.list.mainGridList';

@Component({
    selector: 'common-resource-list',
    templateUrl: './resource-list.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [...defaultListImports],
})
@ActionScope('common::resource.list')
export class ResourceListComponent extends ViewBaseComponent {
    // ---- customizations ----
    // ..

    breadcrumb: Crumb[] = [
        { translation: 'App', routerLink: ['/'] },
        { translation: 'common.Resources' },
    ];
    gridId: string = resourceMainGridListId;
    gridData$: Observable<GridData<CommonResource>>;
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
                        id: 'common::resource.list.edit',
                        translation: 'edit',
                        icon: 'mode_edit',
                    },
                    {
                        id: 'common::resource.list.delete',
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
        ...resourceColumnsConfig({ translator: this.translocoService }),
    ];

    constructor(
        private readonly gridColumnsConfigStorageService: GridColumnsConfigStorageService,
        private readonly gridFiltersStorageService: GridFiltersStorageService,
        private readonly gridStateService: GridStateService,
        private readonly resourceService: ResourceService,
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
            case 'common::resource.list.view':
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

                this.gridData$ = this.resourceService.pagination$;
                break;

            case 'common::resource.list.pagination':
                await lastValueFrom(
                    this.resourceService.pagination({
                        query: gridQueryHandler({
                            gridFiltersStorageService:
                                this.gridFiltersStorageService,
                            gridStateService: this.gridStateService,
                            gridId: this.gridId,
                            columnsConfig: resourceColumnsConfig(),
                            query: action.meta.query,
                        }),
                    }),
                );
                break;

            case 'common::resource.list.edit':
                this.router.navigate([
                    'common/resource/edit',
                    action.meta.row.id,
                ]);
                break;

            case 'common::resource.list.delete':
                const deleteDialogRef = this.confirmationService.open({
                    title: `${this.translocoService.translate('Delete')} ${this.translocoService.translate('common.Resource')}`,
                    message: this.translocoService.translate(
                        'DeletionWarning',
                        {
                            entity: this.translocoService.translate(
                                'common.Resource',
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
                                this.resourceService.deleteById<CommonResource>(
                                    {
                                        id: action.meta.row.id,
                                    },
                                ),
                            );

                            this.actionService.action({
                                id: 'common::resource.list.pagination',
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

            case 'common::resource.list.export':
                const rows = await lastValueFrom(
                    this.resourceService.get({
                        query: action.meta.query,
                    }),
                );

                const columns: string[] = resourceColumnsConfig().map(
                    (resourceColumnConfig) => resourceColumnConfig.field,
                );
                const headers: string[] = resourceColumnsConfig().map(
                    (resourceColumnConfig) =>
                        this.translocoService.translate(
                            resourceColumnConfig.translation,
                        ),
                );

                exportRows(
                    rows.objects,
                    'resources.' + action.meta.format,
                    columns,
                    headers,
                    action.meta.format,
                );
                break;
            /* #endregion common actions */
        }
    }
}
