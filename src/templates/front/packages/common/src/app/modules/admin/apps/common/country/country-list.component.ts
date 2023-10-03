import { CommonCountry } from '../common.types';
import { countryColumnsConfig } from './country.columns-config';
import { CountryService } from './country.service';
import { ChangeDetectionStrategy, Component, Injector, ViewEncapsulation } from '@angular/core';
import { Action, ColumnConfig, ColumnConfigAction, ColumnDataType, CoreLang, Crumb, defaultListImports, exportRows, GridColumnsConfigStorageService, GridData, GridFiltersStorageService, GridState, GridStateService, log, QueryStatementHandler, ViewBaseComponent } from '@aurora';
import { lastValueFrom, Observable, takeUntil } from 'rxjs';

@Component({
    selector       : 'common-country-list',
    templateUrl    : './country-list.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone     : true,
    imports        : [
        ...defaultListImports,
    ],
})
export class CountryListComponent extends ViewBaseComponent
{
    // ---- customizations ----
    // ..

    breadcrumb: Crumb[] = [
        { translation: 'App', routerLink: ['/']},
        { translation: 'common.Countries' },
    ];
    gridId: string = 'common::country.list.mainGridList';
    gridData$: Observable<GridData<CommonCountry>>;
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
                        id         : 'common::country.list.edit',
                        translation: 'edit',
                        icon       : 'mode_edit',
                    },
                    {
                        id         : 'common::country.list.delete',
                        translation: 'delete',
                        icon       : 'delete',
                    },
                ];
            },
        },
        {
            type                : ColumnDataType.TRANSLATIONS_MENU,
            field               : 'translations',
            translation         : 'Translations',
            sticky              : true,
            translationIconColor: row =>
            {
                const langs = this.sessionService.get('langs');

                for (const lang of langs.filter(lang => lang.isActive))
                {
                    if (!row.availableLangs.includes(lang.id)) return 'warn';
                }
                return 'primary';
            },
            actions: row =>
            {
                const langs = this.sessionService.get('langs');
                const transitionActions: ColumnConfigAction[] = [];

                for (const lang of langs.filter(lang => lang.isActive))
                {
                    if (row.availableLangs.includes(lang.id))
                    {
                        transitionActions.push({
                            id          : 'common::country.list.edit',
                            translation : 'edit',
                            isViewAction: true,
                            meta        : { lang },
                        });
                    }
                    else
                    {
                        transitionActions.push({
                            id          : 'common::country.list.new',
                            translation : 'new',
                            isViewAction: true,
                            meta        : { lang },
                        });
                    }
                }

                return transitionActions;
            },
        },
        {
            type       : ColumnDataType.CHECKBOX,
            field      : 'select',
            translation: 'Selects',
            sticky     : true,
        },
        ...countryColumnsConfig,
    ];

    constructor(
        protected readonly injector: Injector,
        private readonly gridColumnsConfigStorageService: GridColumnsConfigStorageService,
        private readonly gridFiltersStorageService: GridFiltersStorageService,
        private readonly gridStateService: GridStateService,
        private readonly countryService: CountryService,
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
            case 'common::country.list.new':
                this.router
                    .navigate([
                        'common/country/new',
                        action.meta.row.id,
                        action.meta.lang && action.meta.lang[this.sessionService.get<string>('searchKeyLang')],
                    ]);
                break;

            case 'common::country.list.view':
                this.columnsConfig$ = this.gridColumnsConfigStorageService
                    .getColumnsConfig(this.gridId, this.originColumnsConfig)
                    .pipe(takeUntil(this.unsubscribeAll$));

                this.gridState = {
                    columnFilters: this.gridFiltersStorageService.getColumnFilterState(this.gridId),
                    page         : this.gridStateService.getPage(this.gridId),
                    sort         : this.gridStateService.getSort(this.gridId),
                    search       : this.gridStateService.getSearchState(this.gridId),
                };

                this.gridData$ = this.countryService.pagination$;
                break;

            case 'common::country.list.pagination':
                await lastValueFrom(
                    this.countryService.pagination({
                        query: action.meta.query ?
                            action.meta.query :
                            QueryStatementHandler
                                .init({ columnsConfig: countryColumnsConfig })
                                .setColumFilters(this.gridFiltersStorageService.getColumnFilterState(this.gridId))
                                .setSort(this.gridStateService.getSort(this.gridId))
                                .setPage(this.gridStateService.getPage(this.gridId))
                                .setSearch(this.gridStateService.getSearchState(this.gridId))
                                .getQueryStatement(),
                        headers: {
                            'Content-Language': this.sessionService.get('fallbackLang')[this.sessionService.get('searchKeyLang')],
                        },
                    }),
                );
                break;

            case 'common::country.list.edit':
                this.router
                    .navigate([
                        'common/country/edit',
                        action.meta.row.id,
                        action.meta.lang ?
                            action.meta.lang[this.sessionService.get('searchKeyLang')] :
                            this.sessionService.get<CoreLang>('fallbackLang')[this.sessionService.get<string>('searchKeyLang')],
                    ]);
                break;

            case 'common::country.list.delete':
                const deleteDialogRef = this.confirmationService.open({
                    title  : `${this.translocoService.translate('Delete')} ${this.translocoService.translate('common.Country')}`,
                    message: this.translocoService.translate('DeletionWarning', { entity: this.translocoService.translate('common.Country') }),
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
                                    this.countryService
                                        .deleteById<CommonCountry>({
                                            id: action.meta.row.id,
                                            headers: {
                                                'Content-Language': this.sessionService.get('fallbackLang')[this.sessionService.get('searchKeyLang')],
                                            },
                                        }),
                                );

                                this.actionService.action({
                                    id          : 'common::country.list.pagination',
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

            case 'common::country.list.export':
                const rows = await lastValueFrom(
                    this.countryService
                        .get({
                            query: action.meta.query,
                            headers: {
                                'Content-Language': '*',
                            },
                        }),
                );

                // format export rows
                (rows.objects as any[]).forEach(row =>
                {
                    // row.id = row.id;
                });

                const columns: string[] = countryColumnsConfig.map(countryColumnConfig => countryColumnConfig.field);
                const headers: string[] = columns.map(column => this.translocoService.translate('common.' + column.toPascalCase()));

                exportRows(
                    rows.objects,
                    'countries.' + action.meta.format,
                    columns,
                    headers,
                    action.meta.format,
                );
                break;
        }
    }
}
