{{
    setVar 'arrayImports' (
        array
            (object items=(array 'ChangeDetectionStrategy' 'Component' 'Injector' 'ViewEncapsulation') path='@angular/core')
            (object items='Validators' path='@angular/forms')
            (object items=(array 'Action' 'Crumb' 'log' 'mapActions' 'Utils' 'ViewDetailComponent') path='@aurora')
            (object items=(array 'lastValueFrom' 'takeUntil') path='rxjs')
            (object items=schema.aggregateName path=(sumStrings '../' toKebabCase schema.boundedContextName '.types'))
            (object items=(sumStrings (toPascalCase schema.moduleName) 'Service') path=(sumStrings './' toKebabCase schema.moduleName '.service'))
    )
~}}
{{#unlessEq schema.properties.lengthWebComponents 0 }}
{{ push arrayImports
    (object items='Observable' path='rxjs')
~}}
{{#unlessEq schema.properties.lengthGridSelectElementWebComponents 0 }}
{{ push arrayImports
    (object items='ViewChild' path='@angular/core')
~}}
{{ push arrayImports
    (object items=(array 'ColumnConfig' 'ColumnDataType' 'exportRows' 'GridColumnsConfigStorageService' 'GridData' 'GridFiltersStorageService' 'GridSelectElementComponent' 'GridStateService' 'QueryStatementHandler') path='@aurora')
~}}
{{/unlessEq}}
{{/unlessEq}}
{{#each schema.properties.withWebComponents}}
{{#eq (toKebabCase getRelationshipBoundedContext) (toKebabCase ../schema.boundedContextName)}}
{{ push ../arrayImports
    (object items=getRelationshipAggregateName path=(sumStrings '../' (toKebabCase getRelationshipBoundedContext) '.types'))
    (object items=(sumStrings (toPascalCase getRelationshipModule) 'Service') path=(sumStrings '../' (toKebabCase getRelationshipModule) '/' (toKebabCase getRelationshipModule) '.service'))
~}}
{{else}}
{{ push ../arrayImports
    (object items=getRelationshipAggregateName path=(sumStrings '../../' (toKebabCase getRelationshipBoundedContext) '/' (toKebabCase getRelationshipBoundedContext) '.types'))
    (object items=(sumStrings (toPascalCase getRelationshipModule) 'Service') path=(sumStrings '../../' (toKebabCase getRelationshipBoundedContext) '/' (toKebabCase getRelationshipModule) '/' (toKebabCase getRelationshipModule) '.service'))
~}}
{{/eq}}
{{/each}}
{{#each schema.properties.withGridSelectElementWebComponents}}
{{#eq (toKebabCase getRelationshipBoundedContext) (toKebabCase ../schema.boundedContextName)}}
{{ push ../arrayImports
    (object items=(sumStrings (toCamelCase getRelationshipModule) 'ColumnsConfig') path=(sumStrings '../' (toKebabCase getRelationshipModule) '/' (toKebabCase getRelationshipModule) '.columns-config'))
~}}
{{else}}
{{ push ../arrayImports
    (object items=(sumStrings (toCamelCase getRelationshipModule) 'ColumnsConfig') path=(sumStrings '../../' (toKebabCase getRelationshipBoundedContext) '/' (toKebabCase getRelationshipModule) '/' (toKebabCase getRelationshipModule) '.columns-config'))
~}}
{{/eq}}
{{/each}}
{{{ importManager (object imports=arrayImports) }}}
@Component({
    selector       : '{{ toKebabCase schema.boundedContextName }}-{{ toKebabCase schema.moduleName }}-detail',
    templateUrl    : './{{ toKebabCase schema.moduleName }}-detail.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class {{ toPascalCase schema.moduleName }}DetailComponent extends ViewDetailComponent
{
    // ---- customizations ----
    // ..

    // Object retrieved from the database request,
    // it should only be used to obtain uninitialized
    // data in the form, such as relations, etc.
    // It should not be used habitually, since the source of truth is the form.
    managedObject: {{ schema.aggregateName }};
{{#unlessEq schema.properties.lengthWebComponents 0 }}

    // relationships
    {{#each schema.properties.withWebComponents}}
    {{#eq webComponent.type 'select'}}
    {{ toCamelCase getRelationshipModules }}$: Observable<{{ getRelationshipAggregateName }}[]>;
    {{/eq}}
    {{#eq webComponent.type 'grid-select-element'}}
    @ViewChild('{{ toCamelCase getRelationshipModule }}GridElementSelector') {{ toCamelCase getRelationshipModules }}Component: GridSelectElementComponent;
    {{ toCamelCase getRelationshipModules }}GridId: string = 'orion::order.detail.servicePointGridList';
    {{ toCamelCase getRelationshipModules }}GridData$: Observable<GridData<{{ getRelationshipAggregateName }}>>;
    {{ toCamelCase getRelationshipModules }}ColumnsConfig$: Observable<ColumnConfig[]>;
    {{ toCamelCase getRelationshipModules }}OriginColumnsConfig: ColumnConfig[] = [
        {
            type   : ColumnDataType.ACTIONS,
            field  : 'Actions',
            sticky : true,
            actions: row =>
            {
                return [
                    {
                        id          : '{{ toCamelCase ../schema.boundedContextName }}::{{ toCamelCase ../schema.moduleName }}.detail.select{{ toPascalCase getRelationshipModule }}',
                        isViewAction: false,
                        translation : 'select',
                        icon        : 'add_link',
                    },
                ];
            },
        },
        ...{{ toCamelCase getRelationshipModule }}ColumnsConfig,
    ];
    {{/eq}}
    {{/each}}
{{/unlessEq}}

    // breadcrumb component definition
    breadcrumb: Crumb[] = [
        { translation: 'App' },
        { translation: '{{ toCamelCase schema.boundedContextName }}.{{ toPascalCase schema.moduleNames }}', routerLink: ['/{{ toKebabCase schema.boundedContextName }}/{{ toKebabCase schema.moduleName }}']},
        { translation: '{{ toCamelCase schema.boundedContextName }}.{{ toPascalCase schema.moduleName }}' },
    ];

    constructor(
        protected readonly injector: Injector,
        private readonly {{ toCamelCase schema.moduleName }}Service: {{ toPascalCase schema.moduleName }}Service,
        {{#unlessEq schema.properties.lengthGridSelectElementWebComponents 0 }}
        private readonly gridColumnsConfigStorageService: GridColumnsConfigStorageService,
        private readonly gridFiltersStorageService: GridFiltersStorageService,
        private readonly gridStateService: GridStateService,
        {{/unlessEq}}
        {{#each schema.properties.withWebComponents}}
        {{#eq webComponent.type 'select'}}
        private readonly {{ toCamelCase getRelationshipModule }}Service: {{ toPascalCase getRelationshipModule }}Service,
        {{/eq}}
        {{#eq webComponent.type 'grid-select-element'}}
        private readonly {{ toCamelCase getRelationshipModule }}Service: {{ toPascalCase getRelationshipModule }}Service,
        {{/eq}}
        {{/each}}
    )
    {
        super(injector);
    }

    // this method will be called after the ngOnInit of
    // the parent class you can use instead of ngOnInit
    init(): void
    {
        {{#eq schema.properties.lengthWebComponents 0 }}
        /**/
        {{else}}
        {{#each schema.properties.withWebComponents}}
        {{#eq webComponent.type 'select'}}
        this.{{ toCamelCase getRelationshipModules }}$ = this.{{ toCamelCase getRelationshipModule }}Service.{{ toCamelCase getRelationshipModules }}$;
        {{/eq}}
        {{#eq webComponent.type 'grid-select-element'}}
        // {{ toCamelCase getRelationshipModule }} grid-select-element
        this.{{ toCamelCase getRelationshipModules }}ColumnsConfig$ = this.gridColumnsConfigStorageService
            .getColumnsConfig(this.{{ toCamelCase getRelationshipModules }}GridId, this.{{ toCamelCase getRelationshipModules }}OriginColumnsConfig)
            .pipe(takeUntil(this.unsubscribeAll$));
        this.{{ toCamelCase getRelationshipModules }}GridData$ = this.{{ toCamelCase getRelationshipModule }}Service.pagination$;
        {{/eq}}
        {{/each}}
        {{/eq}}
    }

    onSubmit($event): void
    {
        // we have two nested forms, we check that the submit comes from the button
        // that corresponds to the main form to the main form
        if ($event.submitter.getAttribute('form') !== $event.submitter.form.getAttribute('id'))
        {
            $event.preventDefault();
            $event.stopPropagation();
            return;
        }

        // manage validations before execute actions
        if (this.fg.invalid)
        {
            log('[DEBUG] Error to validate form: ', this.fg);
            this.validationMessagesService.validate();
            return;
        }

        this.actionService.action({
            id: mapActions(
                this.currentViewAction.id,
                {
                    '{{ toCamelCase schema.boundedContextName }}::{{ toCamelCase schema.moduleName }}.detail.new' : '{{ toCamelCase schema.boundedContextName }}::{{ toCamelCase schema.moduleName }}.detail.create',
                    '{{ toCamelCase schema.boundedContextName }}::{{ toCamelCase schema.moduleName }}.detail.edit': '{{ toCamelCase schema.boundedContextName }}::{{ toCamelCase schema.moduleName }}.detail.update',
                },
            ),
            isViewAction: false,
        });
    }

    createForm(): void
    {
        this.fg = this.fb.group({
            {{#each schema.properties.formGroupFields}}
            {{#if (isAllowProperty ../schema.moduleName this) }}
            {{ toCamelCase name }}: {{#if (hasValidationFormControl .)}}[{{{initialFormGroupData .}}}, [{{#unless nullable }}Validators.required{{ hasCommaInValidationFormControl . 'nullable' }}{{/unless}}{{#if this.length}}Validators.minLength({{this.length }}), Validators.maxLength({{this.length}}){{ hasCommaInValidationFormControl . 'length' }}{{/if}}{{#if maxLength }}Validators.maxLength({{maxLength}}){{ hasCommaInValidationFormControl . 'maxLength' }}{{/if}}]]{{else}}{{{initialFormGroupData .}}}{{/if}},
            {{/if}}
            {{/each}}
        });
    }

    async handleAction(action: Action): Promise<void>
    {
        // add optional chaining (?.) to avoid first call where behaviour subject is undefined
        switch (action?.id)
        {
            case '{{ toCamelCase schema.boundedContextName }}::{{ toCamelCase schema.moduleName }}.detail.new':
                this.fg.get('id').setValue(Utils.uuid());
                break;

            case '{{ toCamelCase schema.boundedContextName }}::{{ toCamelCase schema.moduleName }}.detail.edit':
                this.{{ toCamelCase schema.moduleName }}Service
                    .{{ toCamelCase schema.moduleName }}$
                    .pipe(takeUntil(this.unsubscribeAll$))
                    .subscribe(item =>
                    {
                        this.managedObject = item;
                        this.fg.patchValue(item);
                    });
                break;

            case '{{ toCamelCase schema.boundedContextName }}::{{ toCamelCase schema.moduleName }}.detail.create':
                try
                {
                    await lastValueFrom(
                        this.{{ toCamelCase schema.moduleName }}Service
                            .create<{{ schema.aggregateName }}>({
                                object: this.fg.value,
                            }),
                    );

                    this.snackBar.open(
                        `${this.translocoService.translate('{{ toCamelCase schema.boundedContextName }}.{{ toPascalCase schema.moduleName }}')} ${this.translocoService.translate('Created.M')}`,
                        undefined,
                        {
                            verticalPosition: 'top',
                            duration        : 3000,
                        },
                    );

                    this.router.navigate(['{{ toKebabCase schema.boundedContextName }}/{{ toKebabCase schema.moduleName }}']);
                }
                catch(error)
                {
                    log(`[DEBUG] Catch error in ${action.id} action: ${error}`);
                }
                break;

            case '{{ toCamelCase schema.boundedContextName }}::{{ toCamelCase schema.moduleName }}.detail.update':
                try
                {
                    await lastValueFrom(
                        this.{{ toCamelCase schema.moduleName }}Service
                            .updateById<{{ schema.aggregateName }}>({
                                object: this.fg.value,
                            }),
                    );

                    this.snackBar.open(
                        `${this.translocoService.translate('{{ toCamelCase schema.boundedContextName }}.{{ toPascalCase schema.moduleName }}')} ${this.translocoService.translate('Saved.M')}`,
                        undefined,
                        {
                            verticalPosition: 'top',
                            duration        : 3000,
                        },
                    );

                    this.router.navigate(['{{ toKebabCase schema.boundedContextName }}/{{ toKebabCase schema.moduleName }}']);
                }
                catch(error)
                {
                    log(`[DEBUG] Catch error in ${action.id} action: ${error}`);
                }
                break;
            {{#each schema.properties.withGridSelectElementWebComponents}}

            /* #region actions to manage {{ toCamelCase property.getRelationshipModules }} grid-select-element */
            case '{{ toCamelCase ../schema.boundedContextName }}::{{ toCamelCase ../schema.moduleName }}.detail.{{ toCamelCase getRelationshipModules }}OpenDialog':
                this.{{ toCamelCase getRelationshipModules }}Component.gridState = {
                    columnFilters: this.gridFiltersStorageService.getColumnFilterState(this.{{ toCamelCase getRelationshipModules }}GridId),
                    page         : this.gridStateService.getPage(this.{{ toCamelCase getRelationshipModules }}GridId),
                    sort         : this.gridStateService.getSort(this.{{ toCamelCase getRelationshipModules }}GridId),
                    search       : this.gridStateService.getSearchState(this.{{ toCamelCase getRelationshipModules }}GridId),
                };
                this.{{ toCamelCase getRelationshipModules }}Component.openDialog();
                break;

            case '{{ toCamelCase ../schema.boundedContextName }}::{{ toCamelCase ../schema.moduleName }}.detail.{{ toCamelCase getRelationshipModules }}Pagination':
                await lastValueFrom(
                    this.{{ toCamelCase getRelationshipModule }}Service
                        .pagination({
                            query: action.data.query ?
                                action.data.query :
                                QueryStatementHandler
                                    .init({ columnsConfig: {{ toCamelCase getRelationshipModule }}ColumnsConfig })
                                    .setColumFilters(this.gridFiltersStorageService.getColumnFilterState(this.{{ toCamelCase getRelationshipModules }}GridId))
                                    .setSort(this.gridStateService.getSort(this.{{ toCamelCase getRelationshipModules }}GridId))
                                    .setPage(this.gridStateService.getPage(this.{{ toCamelCase getRelationshipModules }}GridId))
                                    .setSearch(this.gridStateService.getSearchState(this.{{ toCamelCase getRelationshipModules }}GridId))
                                    .getQueryStatement(),
                        }),
                );
                break;

            case '{{ toCamelCase ../schema.boundedContextName }}::{{ toCamelCase ../schema.moduleName }}.detail.select{{ toPascalCase getRelationshipModule }}':
                const {{ toCamelCase getRelationshipModule }} = action.data.row as {{ getRelationshipAggregateName }};

                this.fg.get('{{ toCamelCase getRelationshipModule }}Id').setValue({{ toCamelCase getRelationshipModule }}.id);
                this.fg.get('{{ toCamelCase getRelationshipModule }}Name').setValue({{ toCamelCase getRelationshipModule }}.name);
                this.fg.markAsDirty();

                this.{{ toCamelCase getRelationshipModules }}Component.closeDialog();
                break;

            case '{{ toCamelCase ../schema.boundedContextName }}::{{ toCamelCase ../schema.moduleName }}.detail.export{{ toPascalCase getRelationshipModules }}':
                const {{ toCamelCase getRelationshipModule }}Rows = await lastValueFrom(
                    this.{{ toCamelCase getRelationshipModule }}Service
                        .get({
                            query     : action.data.query,
                            constraint: { /**/ },
                        }),
                );

                const {{ toCamelCase getRelationshipModule }}Columns: string[] = {{ toCamelCase getRelationshipModule }}ColumnsConfig.map({{ toCamelCase getRelationshipModule }}ColumnConfig => {{ toCamelCase getRelationshipModule }}ColumnConfig.field);
                const {{ toCamelCase getRelationshipModule }}Headers = {{ toCamelCase getRelationshipModule }}Columns.map(column => this.translocoService.translate('{{ toCamelCase ../schema.boundedContextName }}.' + column.toPascalCase()));

                exportRows(
                    {{ toCamelCase getRelationshipModule }}Rows.objects,
                    'order{{ toPascalCase getRelationshipModules }}.' + action.data.format,
                    {{ toCamelCase getRelationshipModule }}Columns,
                    {{ toCamelCase getRelationshipModule }}Headers,
                    action.data.format,
                );
                break;
                /* #endregion actions to manage {{ toCamelCase property.getRelationshipModules }} grid-select-element */
            {{/each}}
        }
    }
}
