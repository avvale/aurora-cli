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
{{#unlessEq schema.properties.lengthGridElementsManagerWebComponents 0 }}
{{ push arrayImports
    (object items='ViewChild' path='@angular/core')
~}}
{{ push arrayImports
    (object items='FormGroup' path='@angular/forms')
~}}
{{ push arrayImports
    (object items=(array 'ColumnConfig' 'ColumnDataType' 'GridData' 'GridElementsManagerComponent' 'GridState') path='@aurora')
~}}
{{/unlessEq}}
{{/unlessEq}}
{{#each schema.properties.withWebComponents}}
{{#eq (toKebabCase getRelationshipBoundedContext) (toKebabCase ../schema.boundedContextName)}}
{{ push ../arrayImports
    (object items=getRelationshipAggregateName path=(sumStrings '../' (toKebabCase getRelationshipBoundedContext) '.types'))
    (object items=(sumStrings (toPascalCase getRelationshipSchema.moduleName) 'Service') path=(sumStrings '../' (toKebabCase getRelationshipSchema.moduleName) '/' (toKebabCase getRelationshipSchema.moduleName) '.service'))
~}}
{{else}}
{{ push ../arrayImports
    (object items=getRelationshipAggregateName path=(sumStrings '../../' (toKebabCase getRelationshipBoundedContext) '/' (toKebabCase getRelationshipBoundedContext) '.types'))
    (object items=(sumStrings (toPascalCase getRelationshipSchema.moduleName) 'Service') path=(sumStrings '../../' (toKebabCase getRelationshipBoundedContext) '/' (toKebabCase getRelationshipSchema.moduleName) '/' (toKebabCase getRelationshipSchema.moduleName) '.service'))
~}}
{{/eq}}
{{/each}}
{{#each schema.properties.withGridSelectElementWebComponents}}
{{#eq (toKebabCase getRelationshipBoundedContext) (toKebabCase ../schema.boundedContextName)}}
{{ push ../arrayImports
    (object items=(sumStrings (toCamelCase getRelationshipSchema.moduleName) 'ColumnsConfig') path=(sumStrings '../' (toKebabCase getRelationshipSchema.moduleName) '/' (toKebabCase getRelationshipSchema.moduleName) '.columns-config'))
~}}
{{else}}
{{ push ../arrayImports
    (object items=(sumStrings (toCamelCase getRelationshipSchema.moduleName) 'ColumnsConfig') path=(sumStrings '../../' (toKebabCase getRelationshipBoundedContext) '/' (toKebabCase getRelationshipSchema.moduleName) '/' (toKebabCase getRelationshipSchema.moduleName) '.columns-config'))
~}}
{{/eq}}
{{/each}}
{{#each schema.properties.withGridElementsManagerWebComponents}}
{{#eq (toKebabCase getRelationshipBoundedContext) (toKebabCase ../schema.boundedContextName)}}
{{ push ../arrayImports
    (object items=(sumStrings (toCamelCase getRelationshipSchema.moduleName) 'ColumnsConfig') path=(sumStrings '../' (toKebabCase getRelationshipSchema.moduleName) '/' (toKebabCase getRelationshipSchema.moduleName) '.columns-config'))
~}}
{{else}}
{{ push ../arrayImports
    (object items=(sumStrings (toCamelCase getRelationshipSchema.moduleName) 'ColumnsConfig') path=(sumStrings '../../' (toKebabCase getRelationshipBoundedContext) '/' (toKebabCase getRelationshipSchema.moduleName) '/' (toKebabCase getRelationshipSchema.moduleName) '.columns-config'))
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
    {{ toCamelCase getRelationshipSchema.moduleNames }}$: Observable<{{ getRelationshipAggregateName }}[]>;
    {{/eq}}
    {{#eq webComponent.type 'grid-select-element'}}
    /* #region  variables to manage grid-select-element {{ toCamelCase getRelationshipSchema.moduleName }} */
    @ViewChild('{{ toCamelCase getRelationshipSchema.moduleName }}GridElementSelector') {{ toCamelCase getRelationshipSchema.moduleNames }}Component: GridSelectElementComponent;
    {{ toCamelCase getRelationshipSchema.moduleNames }}GridId: string = 'orion::order.detail.servicePointGridList';
    {{ toCamelCase getRelationshipSchema.moduleNames }}GridData$: Observable<GridData<{{ getRelationshipAggregateName }}>>;
    {{ toCamelCase getRelationshipSchema.moduleNames }}ColumnsConfig$: Observable<ColumnConfig[]>;
    {{ toCamelCase getRelationshipSchema.moduleNames }}OriginColumnsConfig: ColumnConfig[] = [
        {
            type   : ColumnDataType.ACTIONS,
            field  : 'Actions',
            sticky : true,
            actions: row =>
            {
                return [
                    {
                        id          : '{{ toCamelCase ../schema.boundedContextName }}::{{ toCamelCase ../schema.moduleName }}.detail.select{{ toPascalCase getRelationshipSchema.moduleName }}',
                        isViewAction: false,
                        translation : 'select',
                        icon        : 'add_link',
                    },
                ];
            },
        },
        ...{{ toCamelCase getRelationshipSchema.moduleName }}ColumnsConfig,
    ];
    /* #endregion variables to manage grid-select-element {{ toCamelCase getRelationshipSchema.moduleName }} */
    {{/eq}}
    {{#eq webComponent.type 'grid-elements-manager'}}
    /* #region  variables to manage grid-elements-manager {{ toCamelCase getRelationshipSchema.moduleNames }} */
    @ViewChild('{{ toCamelCase getRelationshipSchema.moduleNames }}GridElementsManager') {{ toCamelCase getRelationshipSchema.moduleNames }}Component: GridElementsManagerComponent;
    {{ toCamelCase getRelationshipSchema.moduleName }}DialogFg: FormGroup;
    {{ toCamelCase getRelationshipSchema.moduleNames }}GridId: string = '{{ toCamelCase ../schema.boundedContextName }}::{{ toCamelCase ../schema.moduleName }}.detail.{{ toCamelCase getRelationshipSchema.moduleNames }}GridList';
    {{ toCamelCase getRelationshipSchema.moduleNames }}GridData$: Observable<GridData<{{ getRelationshipAggregateName }}>>;
    {{ toCamelCase getRelationshipSchema.moduleNames }}GridState: GridState = {};
    {{ toCamelCase getRelationshipSchema.moduleNames }}ColumnsConfig$: Observable<ColumnConfig[]>;
    origin{{ toPascalCase getRelationshipSchema.moduleNames }}ColumnsConfig: ColumnConfig[] = [
        {
            type   : ColumnDataType.ACTIONS,
            field  : 'Actions',
            sticky : true,
            actions: row =>
            {
                const actions = [
                    {
                        id          : '{{ toCamelCase ../schema.boundedContextName }}::{{ toCamelCase ../schema.moduleName }}.detail.edit{{ toPascalCase getRelationshipSchema.moduleName }}',
                        isViewAction: false,
                        translation : 'edit',
                        icon        : 'mode_edit',
                    },
                    {
                        id          : '{{ toCamelCase ../schema.boundedContextName }}::{{ toCamelCase ../schema.moduleName }}.detail.delete{{ toPascalCase getRelationshipSchema.moduleName }}',
                        isViewAction: false,
                        translation : 'delete',
                        icon        : 'delete',
                    },
                ];

                return actions;
            },
        },
        ...{{ toCamelCase getRelationshipSchema.moduleName }}ColumnsConfig,
    ];
    /* #endregion variables to manage grid-elements-manager {{ toCamelCase getRelationshipSchema.moduleNames }} */
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
        private readonly {{ toCamelCase getRelationshipSchema.moduleName }}Service: {{ toPascalCase getRelationshipSchema.moduleName }}Service,
        {{/eq}}
        {{#eq webComponent.type 'grid-select-element'}}
        private readonly {{ toCamelCase getRelationshipSchema.moduleName }}Service: {{ toPascalCase getRelationshipSchema.moduleName }}Service,
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
        this.{{ toCamelCase getRelationshipSchema.moduleNames }}$ = this.{{ toCamelCase getRelationshipSchema.moduleName }}Service.{{ toCamelCase getRelationshipSchema.moduleNames }}$;
        {{/eq}}
        {{#eq webComponent.type 'grid-select-element'}}
        // {{ toCamelCase getRelationshipSchema.moduleName }} grid-select-element
        this.{{ toCamelCase getRelationshipSchema.moduleNames }}ColumnsConfig$ = this.gridColumnsConfigStorageService
            .getColumnsConfig(this.{{ toCamelCase getRelationshipSchema.moduleNames }}GridId, this.{{ toCamelCase getRelationshipSchema.moduleNames }}OriginColumnsConfig)
            .pipe(takeUntil(this.unsubscribeAll$));
        this.{{ toCamelCase getRelationshipSchema.moduleNames }}GridData$ = this.{{ toCamelCase getRelationshipSchema.moduleName }}Service.pagination$;
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

    {{#each schema.properties.withGridElementsManagerWebComponents}}
    /* #region methods to manage {{ toPascalCase getRelationshipSchema.moduleNames }} */
    create{{ toPascalCase getRelationshipSchema.moduleName }}DialogForm(): void
    {
        this.{{ toCamelCase getRelationshipSchema.moduleName }}DialogFg = this.fb.group({
            {{#each getRelationshipSchema.properties.formGroupFields}}
            {{#if (isAllowProperty getRelationshipSchema.moduleName this) }}
            {{ toCamelCase name }}: {{#if (hasValidationFormControl .)}}[{{{initialFormGroupData .}}}, [{{#unless nullable }}Validators.required{{ hasCommaInValidationFormControl . 'nullable' }}{{/unless}}{{#if this.length}}Validators.minLength({{this.length }}), Validators.maxLength({{this.length}}){{ hasCommaInValidationFormControl . 'length' }}{{/if}}{{#if maxLength }}Validators.maxLength({{maxLength}}){{ hasCommaInValidationFormControl . 'maxLength' }}{{/if}}]]{{else}}{{{initialFormGroupData .}}}{{/if}},
            {{/if}}
            {{/each}}
        });
    }

    handleSubmit{{ toPascalCase getRelationshipSchema.moduleName }}Form($event, dialog): void
    {
        // manage validations before execute actions
        if (this.{{ toCamelCase getRelationshipSchema.moduleName }}DialogFg.invalid)
        {
            log('[DEBUG] Error to validate form: ', this.{{ toCamelCase getRelationshipSchema.moduleName }}DialogFg);
            this.validationMessagesService.validate();
            return;
        }

        // depending on the dialog action we invoke a create{{ toPascalCase getRelationshipSchema.moduleName }} or update{{ toPascalCase getRelationshipSchema.moduleName }} action
        this.actionService.action({
            id: mapActions(
                dialog.componentInstance.data.currentActionId,
                {
                    '{{ toCamelCase schema.boundedContextName }}::{{ toCamelCase schema.moduleName }}.detail.new{{ toPascalCase getRelationshipSchema.moduleName }}' : '{{ toCamelCase schema.boundedContextName }}::{{ toCamelCase schema.moduleName }}.detail.create{{ toPascalCase getRelationshipSchema.moduleName }}',
                    '{{ toCamelCase schema.boundedContextName }}::{{ toCamelCase schema.moduleName }}.detail.edit{{ toPascalCase getRelationshipSchema.moduleName }}': '{{ toCamelCase schema.boundedContextName }}::{{ toCamelCase schema.moduleName }}.detail.update{{ toPascalCase getRelationshipSchema.moduleName }}',
                },
            ),
            isViewAction: false,
        });

        dialog.close();
    }
    /* #endregion methods to manage {{ toPascalCase getRelationshipSchema.moduleNames }} */

    {{/each}}
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

            /* #region actions to manage {{ toCamelCase property.getRelationshipSchema.moduleNames }} grid-select-element */
            case '{{ toCamelCase ../schema.boundedContextName }}::{{ toCamelCase ../schema.moduleName }}.detail.{{ toCamelCase getRelationshipSchema.moduleNames }}OpenDialog':
                this.{{ toCamelCase getRelationshipSchema.moduleNames }}Component.gridState = {
                    columnFilters: this.gridFiltersStorageService.getColumnFilterState(this.{{ toCamelCase getRelationshipSchema.moduleNames }}GridId),
                    page         : this.gridStateService.getPage(this.{{ toCamelCase getRelationshipSchema.moduleNames }}GridId),
                    sort         : this.gridStateService.getSort(this.{{ toCamelCase getRelationshipSchema.moduleNames }}GridId),
                    search       : this.gridStateService.getSearchState(this.{{ toCamelCase getRelationshipSchema.moduleNames }}GridId),
                };
                this.{{ toCamelCase getRelationshipSchema.moduleNames }}Component.openDialog();
                break;

            case '{{ toCamelCase ../schema.boundedContextName }}::{{ toCamelCase ../schema.moduleName }}.detail.{{ toCamelCase getRelationshipSchema.moduleNames }}Pagination':
                await lastValueFrom(
                    this.{{ toCamelCase getRelationshipSchema.moduleName }}Service
                        .pagination({
                            query: action.data.query ?
                                action.data.query :
                                QueryStatementHandler
                                    .init({ columnsConfig: {{ toCamelCase getRelationshipSchema.moduleName }}ColumnsConfig })
                                    .setColumFilters(this.gridFiltersStorageService.getColumnFilterState(this.{{ toCamelCase getRelationshipSchema.moduleNames }}GridId))
                                    .setSort(this.gridStateService.getSort(this.{{ toCamelCase getRelationshipSchema.moduleNames }}GridId))
                                    .setPage(this.gridStateService.getPage(this.{{ toCamelCase getRelationshipSchema.moduleNames }}GridId))
                                    .setSearch(this.gridStateService.getSearchState(this.{{ toCamelCase getRelationshipSchema.moduleNames }}GridId))
                                    .getQueryStatement(),
                        }),
                );
                break;

            case '{{ toCamelCase ../schema.boundedContextName }}::{{ toCamelCase ../schema.moduleName }}.detail.select{{ toPascalCase getRelationshipSchema.moduleName }}':
                const {{ toCamelCase getRelationshipSchema.moduleName }} = action.data.row as {{ getRelationshipAggregateName }};

                this.fg.get('{{ toCamelCase getRelationshipSchema.moduleName }}Id').setValue({{ toCamelCase getRelationshipSchema.moduleName }}.id);
                this.fg.get('{{ toCamelCase getRelationshipSchema.moduleName }}Name').setValue({{ toCamelCase getRelationshipSchema.moduleName }}.name);
                this.fg.markAsDirty();

                this.{{ toCamelCase getRelationshipSchema.moduleNames }}Component.closeDialog();
                break;

            case '{{ toCamelCase ../schema.boundedContextName }}::{{ toCamelCase ../schema.moduleName }}.detail.export{{ toPascalCase getRelationshipSchema.moduleNames }}':
                const {{ toCamelCase getRelationshipSchema.moduleName }}Rows = await lastValueFrom(
                    this.{{ toCamelCase getRelationshipSchema.moduleName }}Service
                        .get({
                            query     : action.data.query,
                            constraint: { /**/ },
                        }),
                );

                const {{ toCamelCase getRelationshipSchema.moduleName }}Columns: string[] = {{ toCamelCase getRelationshipSchema.moduleName }}ColumnsConfig.map({{ toCamelCase getRelationshipSchema.moduleName }}ColumnConfig => {{ toCamelCase getRelationshipSchema.moduleName }}ColumnConfig.field);
                const {{ toCamelCase getRelationshipSchema.moduleName }}Headers = {{ toCamelCase getRelationshipSchema.moduleName }}Columns.map(column => this.translocoService.translate('{{ toCamelCase ../schema.boundedContextName }}.' + column.toPascalCase()));

                exportRows(
                    {{ toCamelCase getRelationshipSchema.moduleName }}Rows.objects,
                    'order{{ toPascalCase getRelationshipSchema.moduleNames }}.' + action.data.format,
                    {{ toCamelCase getRelationshipSchema.moduleName }}Columns,
                    {{ toCamelCase getRelationshipSchema.moduleName }}Headers,
                    action.data.format,
                );
                break;
                /* #endregion actions to manage {{ toCamelCase property.getRelationshipSchema.moduleNames }} grid-select-element */
            {{/each}}
        }
    }
}
