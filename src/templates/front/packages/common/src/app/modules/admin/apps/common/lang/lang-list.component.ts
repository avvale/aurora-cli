/**
 * @aurora-generated
 * @source cliter/common/lang.aurora.yaml
 */
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { CommonLang } from '@apps/common';
import { langColumnsConfig, LangService } from '@apps/common/lang';
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

export const langMainGridListId = 'common::lang.list.mainGridList';

@Component({
  selector: 'common-lang-list',
  templateUrl: './lang-list.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [...defaultListImports],
})
@ActionScope('common::lang.list')
export class LangListComponent extends ViewBaseComponent {
  // ---- customizations ----
  // ..

  breadcrumb: Crumb[] = [
    { translation: 'App', routerLink: ['/'] },
    { translation: 'common.Langs' },
  ];
  gridId: string = langMainGridListId;
  gridData$: Observable<GridData<CommonLang>>;
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
            id: 'common::lang.list.edit',
            translation: 'edit',
            icon: 'mode_edit',
          },
          {
            id: 'common::lang.list.delete',
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
    ...langColumnsConfig({ translator: this.translocoService }),
  ];

  constructor(
    private readonly gridColumnsConfigStorageService: GridColumnsConfigStorageService,
    private readonly gridFiltersStorageService: GridFiltersStorageService,
    private readonly gridStateService: GridStateService,
    private readonly langService: LangService,
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
      case 'common::lang.list.view':
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

        this.gridData$ = this.langService.pagination$;
        break;

      case 'common::lang.list.pagination':
        await lastValueFrom(
          this.langService.pagination({
            query: gridQueryHandler({
              gridFiltersStorageService: this.gridFiltersStorageService,
              gridStateService: this.gridStateService,
              gridId: this.gridId,
              columnsConfig: langColumnsConfig(),
              query: action.meta.query,
            }),
          }),
        );
        break;

      case 'common::lang.list.edit':
        this.router.navigate(['common/lang/edit', action.meta.row.id]);
        break;

      case 'common::lang.list.delete':
        const deleteDialogRef = this.confirmationService.open({
          title: `${this.translocoService.translate('Delete')} ${this.translocoService.translate('common.Lang')}`,
          message: this.translocoService.translate('DeletionWarning', {
            entity: this.translocoService.translate('common.Lang'),
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
                this.langService.deleteById<CommonLang>({
                  id: action.meta.row.id,
                }),
              );

              this.actionService.action({
                id: 'common::lang.list.pagination',
                isViewAction: false,
              });
            } catch (error) {
              log(`[DEBUG] Catch error in ${action.id} action: ${error}`);
            }
          }
        });
        break;

      case 'common::lang.list.export':
        const rows = await lastValueFrom(
          this.langService.get({
            query: action.meta.query,
          }),
        );

        const columns: string[] = langColumnsConfig().map(
          (langColumnConfig) => langColumnConfig.field,
        );
        const headers: string[] = langColumnsConfig().map((langColumnConfig) =>
          this.translocoService.translate(langColumnConfig.translation),
        );

        exportRows(
          rows.objects,
          'langs.' + action.meta.format,
          columns,
          headers,
          action.meta.format,
        );
        break;
      /* #endregion common actions */
    }
  }
}
