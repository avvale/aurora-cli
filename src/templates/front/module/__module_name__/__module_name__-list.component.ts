{{
    setVar 'importsArray' (
        array
            (object items=(array 'ChangeDetectionStrategy' 'Component' 'Injector' 'ViewEncapsulation') path='@angular/core')
            (object items=(array 'Action' 'ColumnConfig' 'ColumnDataType' 'Crumb' 'exportRows' 'GridColumnsConfigStorageService' 'GridData' 'GridFiltersStorageService' 'GridState' 'GridStateService' 'log' 'QueryStatementHandler' 'ViewBaseComponent') path='@aurora')
            (object items=(array 'lastValueFrom' 'Observable' 'takeUntil') path='rxjs')
            (object items=schema.aggregateName path=(sumStrings '../' (toKebabCase schema.boundedContextName) '.types'))
            (object items=(sumStrings (toPascalCase schema.moduleName) 'Service') path=(sumStrings './' toKebabCase schema.moduleName '.service'))
            (object items=(sumStrings (toCamelCase schema.moduleName) 'ColumnsConfig') path=(sumStrings './' toKebabCase schema.moduleName '.columns-config'))
    )
~}}
{{#if schema.properties.hasI18n}}
{{ push importsArray
    (object items=(array 'ColumnConfigAction' 'CoreLang') path='@aurora')
~}}
{{/if}}
{{{ importManager (object imports=importsArray) }}}
@Component({
    selector       : '{{ toKebabCase schema.boundedContextName }}-{{ toKebabCase schema.moduleName }}-list',
    templateUrl    : './{{ toKebabCase schema.moduleName }}-list.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class {{ toPascalCase schema.moduleName }}ListComponent extends ViewBaseComponent
{
    // ---- customizations ----
    // ..

    breadcrumb: Crumb[] = [
        { translation: 'App', routerLink: ['/']},
        { translation: '{{ toCamelCase schema.boundedContextName }}.{{ toPascalCase schema.moduleNames }}' },
    ];
    gridId: string = '{{ toCamelCase schema.boundedContextName }}::{{ toCamelCase schema.moduleName }}.list.mainGridList';
    gridData$: Observable<GridData<{{ schema.aggregateName }}>>;
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
                        id         : '{{ toCamelCase schema.boundedContextName }}::{{ toCamelCase schema.moduleName }}.list.edit',
                        translation: 'edit',
                        icon       : 'mode_edit',
                    },
                    {
                        id         : '{{ toCamelCase schema.boundedContextName }}::{{ toCamelCase schema.moduleName }}.list.delete',
                        translation: 'delete',
                        icon       : 'delete',
                    },
                ];
            },
        },
        {{#if schema.properties.hasI18n}}
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
                            id          : '{{ toCamelCase schema.boundedContextName }}::{{ toCamelCase schema.moduleName }}.list.edit',
                            translation : 'edit',
                            isViewAction: true,
                            meta        : { lang },
                        });
                    }
                    else
                    {
                        transitionActions.push({
                            id          : '{{ toCamelCase schema.boundedContextName }}::{{ toCamelCase schema.moduleName }}.list.new',
                            translation : 'new',
                            isViewAction: true,
                            meta        : { lang },
                        });
                    }
                }

                return transitionActions;
            },
        },
        {{/if}}
        {
            type       : ColumnDataType.CHECKBOX,
            field      : 'select',
            translation: 'Selects',
            sticky     : true,
        },
        ...{{ toCamelCase schema.moduleName }}ColumnsConfig,
    ];

    constructor(
        protected readonly injector: Injector,
        private readonly gridColumnsConfigStorageService: GridColumnsConfigStorageService,
        private readonly gridFiltersStorageService: GridFiltersStorageService,
        private readonly gridStateService: GridStateService,
        private readonly {{ toCamelCase schema.moduleName }}Service: {{ toPascalCase schema.moduleName }}Service,
    )
    {
        super(injector);
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
            {{#if schema.properties.hasI18n}}
            case '{{ toCamelCase schema.boundedContextName }}::{{ toCamelCase schema.moduleName }}.list.new':
                this.router
                    .navigate([
                        '{{ toKebabCase schema.boundedContextName }}/{{ toKebabCase schema.moduleName }}/new',
                        action.meta.row.id,
                        {{#if schema.properties.hasI18n}}
                        action.meta.lang && action.meta.lang[this.sessionService.get<string>('searchKeyLang')],
                        {{/if}}
                    ]);
                break;

            {{/if}}
            case '{{ toCamelCase schema.boundedContextName }}::{{ toCamelCase schema.moduleName }}.list.view':
                this.columnsConfig$ = this.gridColumnsConfigStorageService
                    .getColumnsConfig(this.gridId, this.originColumnsConfig)
                    .pipe(takeUntil(this.unsubscribeAll$));

                this.gridState = {
                    columnFilters: this.gridFiltersStorageService.getColumnFilterState(this.gridId),
                    page         : this.gridStateService.getPage(this.gridId),
                    sort         : this.gridStateService.getSort(this.gridId),
                    search       : this.gridStateService.getSearchState(this.gridId),
                };

                this.gridData$ = this.{{ toCamelCase schema.moduleName }}Service.pagination$;
                break;

            case '{{ toCamelCase schema.boundedContextName }}::{{ toCamelCase schema.moduleName }}.list.pagination':
                await lastValueFrom(
                    this.{{ toCamelCase schema.moduleName }}Service.pagination({
                        query: action.meta.query ?
                            action.meta.query :
                            QueryStatementHandler
                                .init({ columnsConfig: {{ toCamelCase schema.moduleName }}ColumnsConfig })
                                .setColumFilters(this.gridFiltersStorageService.getColumnFilterState(this.gridId))
                                .setSort(this.gridStateService.getSort(this.gridId))
                                .setPage(this.gridStateService.getPage(this.gridId))
                                .setSearch(this.gridStateService.getSearchState(this.gridId))
                                .getQueryStatement(),
                        {{#if schema.properties.hasI18n}}
                        headers: {
                            'Content-Language': this.sessionService.get('fallbackLang')[this.sessionService.get('searchKeyLang')],
                        },
                        {{/if}}
                    }),
                );
                break;

            case '{{ toCamelCase schema.boundedContextName }}::{{ toCamelCase schema.moduleName }}.list.edit':
                this.router
                    .navigate([
                        '{{ toKebabCase schema.boundedContextName }}/{{ toKebabCase schema.moduleName }}/edit',
                        action.meta.row.id,
                        {{#if schema.properties.hasI18n}}
                        action.meta.lang ?
                            action.meta.lang[this.sessionService.get('searchKeyLang')] :
                            this.sessionService.get<CoreLang>('fallbackLang')[this.sessionService.get<string>('searchKeyLang')],
                        {{/if}}
                    ]);
                break;

            case '{{ toCamelCase schema.boundedContextName }}::{{ toCamelCase schema.moduleName }}.list.delete':
                const deleteDialogRef = this.confirmationService.open({
                    title  : `${this.translocoService.translate('Delete')} ${this.translocoService.translate('{{ toCamelCase schema.boundedContextName }}.{{ toPascalCase schema.moduleName }}')}`,
                    message: this.translocoService.translate('DeletionWarning', { entity: this.translocoService.translate('{{ toCamelCase schema.boundedContextName }}.{{ toPascalCase schema.moduleName }}') }),
                    icon   : {
                        show : true,
                        name : 'heroicons_outline:exclamation',
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
                                    this.{{ toCamelCase schema.moduleName }}Service
                                        .deleteById<{{ schema.aggregateName }}>({
                                            id: action.meta.row.id,
                                            {{#if schema.properties.hasI18n}}
                                            headers: {
                                                'Content-Language': this.sessionService.get('fallbackLang')[this.sessionService.get('searchKeyLang')],
                                            },
                                            {{/if}}
                                        }),
                                );

                                this.actionService.action({
                                    id          : '{{ toCamelCase schema.boundedContextName }}::{{ toCamelCase schema.moduleName }}.list.pagination',
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

            case '{{ toCamelCase schema.boundedContextName }}::{{ toCamelCase schema.moduleName }}.list.export':
                const rows = await lastValueFrom(
                    this.{{ toCamelCase schema.moduleName }}Service
                        .get({
                            query: action.meta.query,
                            {{#if schema.properties.hasI18n}}
                            headers: {
                                'Content-Language': '*',
                            },
                            {{/if}}
                        }),
                );

                // format export rows
                (rows.objects as any[]).forEach(row =>
                {
                    // row.id = row.id;
                });

                const columns: string[] = {{ toCamelCase schema.moduleName }}ColumnsConfig.map({{ toCamelCase schema.moduleName }}ColumnConfig => {{ toCamelCase schema.moduleName }}ColumnConfig.field);
                const headers: string[] = columns.map(column => this.translocoService.translate('{{ toCamelCase schema.boundedContextName }}.' + column.toPascalCase()));

                exportRows(
                    rows.objects,
                    '{{ toCamelCase schema.moduleNames }}.' + action.meta.format,
                    columns,
                    headers,
                    action.meta.format,
                );
                break;
        }
    }
}
