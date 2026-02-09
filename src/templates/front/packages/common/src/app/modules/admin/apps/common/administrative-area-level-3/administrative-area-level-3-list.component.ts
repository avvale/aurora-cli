/**
 * @aurora-generated
 * @source cliter/common/administrative-area-level-3.aurora.yaml
 */
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { CommonAdministrativeAreaLevel3 } from '@apps/common';
import {
  administrativeAreaLevel3ColumnsConfig,
  AdministrativeAreaLevel3Service,
} from '@apps/common/administrative-area-level-3';
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

export const administrativeAreaLevel3MainGridListId =
  'common::administrativeAreaLevel3.list.mainGridList';

@Component({
  selector: 'common-administrative-area-level-3-list',
  templateUrl: './administrative-area-level-3-list.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [...defaultListImports],
})
@ActionScope('common::administrativeAreaLevel3.list')
export class AdministrativeAreaLevel3ListComponent extends ViewBaseComponent {
  // ---- customizations ----
  // ..

  breadcrumb: Crumb[] = [
    { translation: 'App', routerLink: ['/'] },
    { translation: 'common.AdministrativeAreasLevel3' },
  ];
  gridId: string = administrativeAreaLevel3MainGridListId;
  gridData$: Observable<GridData<CommonAdministrativeAreaLevel3>>;
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
            id: 'common::administrativeAreaLevel3.list.edit',
            translation: 'edit',
            icon: 'mode_edit',
          },
          {
            id: 'common::administrativeAreaLevel3.list.delete',
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
    ...administrativeAreaLevel3ColumnsConfig({
      translator: this.translocoService,
    }),
  ];

  constructor(
    private readonly gridColumnsConfigStorageService: GridColumnsConfigStorageService,
    private readonly gridFiltersStorageService: GridFiltersStorageService,
    private readonly gridStateService: GridStateService,
    private readonly administrativeAreaLevel3Service: AdministrativeAreaLevel3Service,
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
      case 'common::administrativeAreaLevel3.list.view':
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

        this.gridData$ = this.administrativeAreaLevel3Service.pagination$;
        break;

      case 'common::administrativeAreaLevel3.list.pagination':
        await lastValueFrom(
          this.administrativeAreaLevel3Service.pagination({
            query: gridQueryHandler({
              gridFiltersStorageService: this.gridFiltersStorageService,
              gridStateService: this.gridStateService,
              gridId: this.gridId,
              columnsConfig: administrativeAreaLevel3ColumnsConfig(),
              query: action.meta.query,
            }),
          }),
        );
        break;

      case 'common::administrativeAreaLevel3.list.edit':
        this.router.navigate([
          'common/administrative-area-level-3/edit',
          action.meta.row.id,
        ]);
        break;

      case 'common::administrativeAreaLevel3.list.delete':
        const deleteDialogRef = this.confirmationService.open({
          title: `${this.translocoService.translate('Delete')} ${this.translocoService.translate('common.AdministrativeAreaLevel3')}`,
          message: this.translocoService.translate('DeletionWarning', {
            entity: this.translocoService.translate(
              'common.AdministrativeAreaLevel3',
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
                this.administrativeAreaLevel3Service.deleteById<CommonAdministrativeAreaLevel3>(
                  {
                    id: action.meta.row.id,
                  },
                ),
              );

              this.actionService.action({
                id: 'common::administrativeAreaLevel3.list.pagination',
                isViewAction: false,
              });
            } catch (error) {
              log(`[DEBUG] Catch error in ${action.id} action: ${error}`);
            }
          }
        });
        break;

      case 'common::administrativeAreaLevel3.list.export':
        const rows = await lastValueFrom(
          this.administrativeAreaLevel3Service.get({
            query: action.meta.query,
          }),
        );

        const columns: string[] = administrativeAreaLevel3ColumnsConfig().map(
          (administrativeAreaLevel3ColumnConfig) =>
            administrativeAreaLevel3ColumnConfig.field,
        );
        const headers: string[] = administrativeAreaLevel3ColumnsConfig().map(
          (administrativeAreaLevel3ColumnConfig) =>
            this.translocoService.translate(
              administrativeAreaLevel3ColumnConfig.translation,
            ),
        );

        exportRows(
          rows.objects,
          'administrativeAreasLevel3.' + action.meta.format,
          columns,
          headers,
          action.meta.format,
        );
        break;
      /* #endregion common actions */
    }
  }
}
