/**
 * @aurora-generated
 * @source cliter/common/administrative-area-level-1.aurora.yaml
 */
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { CommonAdministrativeAreaLevel1 } from '@apps/common';
import {
  administrativeAreaLevel1ColumnsConfig,
  AdministrativeAreaLevel1Service,
} from '@apps/common/administrative-area-level-1';
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

export const administrativeAreaLevel1MainGridListId =
  'common::administrativeAreaLevel1.list.mainGridList';

@Component({
  selector: 'common-administrative-area-level-1-list',
  templateUrl: './administrative-area-level-1-list.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [...defaultListImports],
})
@ActionScope('common::administrativeAreaLevel1.list')
export class AdministrativeAreaLevel1ListComponent extends ViewBaseComponent {
  // ---- customizations ----
  // ..

  breadcrumb: Crumb[] = [
    { translation: 'App', routerLink: ['/'] },
    { translation: 'common.AdministrativeAreasLevel1' },
  ];
  gridId: string = administrativeAreaLevel1MainGridListId;
  gridData$: Observable<GridData<CommonAdministrativeAreaLevel1>>;
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
            id: 'common::administrativeAreaLevel1.list.edit',
            translation: 'edit',
            icon: 'mode_edit',
          },
          {
            id: 'common::administrativeAreaLevel1.list.delete',
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
    ...administrativeAreaLevel1ColumnsConfig({
      translator: this.translocoService,
    }),
  ];

  constructor(
    private readonly gridColumnsConfigStorageService: GridColumnsConfigStorageService,
    private readonly gridFiltersStorageService: GridFiltersStorageService,
    private readonly gridStateService: GridStateService,
    private readonly administrativeAreaLevel1Service: AdministrativeAreaLevel1Service,
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
      case 'common::administrativeAreaLevel1.list.view':
        this.columnsConfig$ = this.gridColumnsConfigStorageService
          .getColumnsConfig(this.gridId, this.originColumnsConfig)
          .pipe(takeUntil(this.unsubscribeAll$));

        this.gridState = {
          columnFilters: this.gridFiltersStorageService.getColumnFilterState(
            this.gridId,
          ),
          page: this.gridStateService.getPage(this.gridId),
          sort: this.gridStateService.getSort(this.gridId),
          search: this.gridStateService.getSearchState(this.gridId),
        };

        this.gridData$ = this.administrativeAreaLevel1Service.pagination$;
        break;

      case 'common::administrativeAreaLevel1.list.pagination':
        await lastValueFrom(
          this.administrativeAreaLevel1Service.pagination({
            query: gridQueryHandler({
              gridFiltersStorageService: this.gridFiltersStorageService,
              gridStateService: this.gridStateService,
              gridId: this.gridId,
              columnsConfig: administrativeAreaLevel1ColumnsConfig(),
              query: action.meta.query,
            }),
            constraint: {
              include: [
                {
                  association: 'country',
                  include: [
                    {
                      association: 'countryI18n',
                    },
                  ],
                },
              ],
            },
          }),
        );
        break;

      case 'common::administrativeAreaLevel1.list.edit':
        this.router.navigate([
          'common/administrative-area-level-1/edit',
          action.meta.row.id,
        ]);
        break;

      case 'common::administrativeAreaLevel1.list.delete':
        const deleteDialogRef = this.confirmationService.open({
          title: `${this.translocoService.translate('Delete')} ${this.translocoService.translate('common.AdministrativeAreaLevel1')}`,
          message: this.translocoService.translate('DeletionWarning', {
            entity: this.translocoService.translate(
              'common.AdministrativeAreaLevel1',
            ),
          }),
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
                this.administrativeAreaLevel1Service.deleteById<CommonAdministrativeAreaLevel1>(
                  {
                    id: action.meta.row.id,
                  },
                ),
              );

              this.actionService.action({
                id: 'common::administrativeAreaLevel1.list.pagination',
                isViewAction: false,
              });
            } catch (error) {
              log(`[DEBUG] Catch error in ${action.id} action: ${error}`);
            }
          }
        });
        break;

      case 'common::administrativeAreaLevel1.list.export':
        const rows = await lastValueFrom(
          this.administrativeAreaLevel1Service.get({
            query: action.meta.query,
          }),
        );

        const columns: string[] = administrativeAreaLevel1ColumnsConfig().map(
          (administrativeAreaLevel1ColumnConfig) =>
            administrativeAreaLevel1ColumnConfig.field,
        );
        const headers: string[] = administrativeAreaLevel1ColumnsConfig().map(
          (administrativeAreaLevel1ColumnConfig) =>
            this.translocoService.translate(
              administrativeAreaLevel1ColumnConfig.translation,
            ),
        );

        exportRows(
          rows.objects,
          'administrativeAreasLevel1.' + action.meta.format,
          columns,
          headers,
          action.meta.format,
        );
        break;
      /* #endregion common actions */
    }
  }
}
