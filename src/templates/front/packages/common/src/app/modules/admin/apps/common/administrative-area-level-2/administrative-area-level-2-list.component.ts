/**
 * @aurora-generated
 * @source cliter/common/administrative-area-level-2.aurora.yaml
 */
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { CommonAdministrativeAreaLevel2 } from '@apps/common';
import {
  administrativeAreaLevel2ColumnsConfig,
  AdministrativeAreaLevel2Service,
} from '@apps/common/administrative-area-level-2';
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

export const administrativeAreaLevel2MainGridListId =
  'common::administrativeAreaLevel2.list.mainGridList';

@Component({
  selector: 'common-administrative-area-level-2-list',
  templateUrl: './administrative-area-level-2-list.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [...defaultListImports],
})
@ActionScope('common::administrativeAreaLevel2.list')
export class AdministrativeAreaLevel2ListComponent extends ViewBaseComponent {
  // ---- customizations ----
  // ..

  breadcrumb: Crumb[] = [
    { translation: 'App', routerLink: ['/'] },
    { translation: 'common.AdministrativeAreasLevel2' },
  ];
  gridId: string = administrativeAreaLevel2MainGridListId;
  gridData$: Observable<GridData<CommonAdministrativeAreaLevel2>>;
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
            id: 'common::administrativeAreaLevel2.list.edit',
            translation: 'edit',
            icon: 'mode_edit',
          },
          {
            id: 'common::administrativeAreaLevel2.list.delete',
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
    ...administrativeAreaLevel2ColumnsConfig({
      translator: this.translocoService,
    }),
  ];

  constructor(
    private readonly gridColumnsConfigStorageService: GridColumnsConfigStorageService,
    private readonly gridFiltersStorageService: GridFiltersStorageService,
    private readonly gridStateService: GridStateService,
    private readonly administrativeAreaLevel2Service: AdministrativeAreaLevel2Service,
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
      case 'common::administrativeAreaLevel2.list.view':
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

        this.gridData$ = this.administrativeAreaLevel2Service.pagination$;
        break;

      case 'common::administrativeAreaLevel2.list.pagination':
        await lastValueFrom(
          this.administrativeAreaLevel2Service.pagination({
            query: gridQueryHandler({
              gridFiltersStorageService: this.gridFiltersStorageService,
              gridStateService: this.gridStateService,
              gridId: this.gridId,
              columnsConfig: administrativeAreaLevel2ColumnsConfig(),
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
                {
                  association: 'administrativeAreaLevel1',
                },
              ],
            },
          }),
        );
        break;

      case 'common::administrativeAreaLevel2.list.edit':
        this.router.navigate([
          'common/administrative-area-level-2/edit',
          action.meta.row.id,
        ]);
        break;

      case 'common::administrativeAreaLevel2.list.delete':
        const deleteDialogRef = this.confirmationService.open({
          title: `${this.translocoService.translate('Delete')} ${this.translocoService.translate('common.AdministrativeAreaLevel2')}`,
          message: this.translocoService.translate('DeletionWarning', {
            entity: this.translocoService.translate(
              'common.AdministrativeAreaLevel2',
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
                this.administrativeAreaLevel2Service.deleteById<CommonAdministrativeAreaLevel2>(
                  {
                    id: action.meta.row.id,
                  },
                ),
              );

              this.actionService.action({
                id: 'common::administrativeAreaLevel2.list.pagination',
                isViewAction: false,
              });
            } catch (error) {
              log(`[DEBUG] Catch error in ${action.id} action: ${error}`);
            }
          }
        });
        break;

      case 'common::administrativeAreaLevel2.list.export':
        const rows = await lastValueFrom(
          this.administrativeAreaLevel2Service.get({
            query: action.meta.query,
          }),
        );

        const columns: string[] = administrativeAreaLevel2ColumnsConfig().map(
          (administrativeAreaLevel2ColumnConfig) =>
            administrativeAreaLevel2ColumnConfig.field,
        );
        const headers: string[] = administrativeAreaLevel2ColumnsConfig().map(
          (administrativeAreaLevel2ColumnConfig) =>
            this.translocoService.translate(
              administrativeAreaLevel2ColumnConfig.translation,
            ),
        );

        exportRows(
          rows.objects,
          'administrativeAreasLevel2.' + action.meta.format,
          columns,
          headers,
          action.meta.format,
        );
        break;
      /* #endregion common actions */
    }
  }
}
