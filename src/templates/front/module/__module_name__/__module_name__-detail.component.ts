{{
    setVar 'importsArray' (
        array
            (object items=(array 'ChangeDetectionStrategy' 'Component' 'Injector' 'ViewEncapsulation') path='@angular/core')
            (object items='Validators' path='@angular/forms')
            (object items=(array 'Action' 'Crumb' 'defaultDetailImports' 'log' 'mapActions' 'Utils' 'ViewDetailComponent') path='@aurora')
            (object items=(array 'lastValueFrom' 'takeUntil') path='rxjs')
            (object items=schema.aggregateName path=(sumStrings '../' toKebabCase schema.boundedContextName '.types'))
            (object items=(sumStrings (toPascalCase schema.moduleName) 'Service') path=(sumStrings './' toKebabCase schema.moduleName '.service'))
    )
~}}
{{#if (hasI18nProperties schema.aggregateProperties) }}
{{ push importsArray
    (object items=(array 'CoreCurrentLangService' 'CoreLang') path='@aurora')
~}}
{{/if}}
{{#unlessEq (countWebComponentsProperties schema.aggregateProperties) 0 }}
{{ push importsArray
    (object items='Observable' path='rxjs')
~}}
{{#unlessEq (countGridSelectElementWebComponentsProperties schema.aggregateProperties) 0 }}
{{ push importsArray
    (object items='ViewChild' path='@angular/core')
~}}
{{ push importsArray
    (object items=(array 'ColumnConfig' 'ColumnDataType' 'exportRows' 'GridColumnsConfigStorageService' 'GridData' 'GridFiltersStorageService' 'GridSelectElementComponent' 'GridStateService' 'QueryStatementHandler') path='@aurora')
~}}
{{/unlessEq}}
{{#unlessEq (countGridElementsManagerWebComponentsProperties schema.aggregateProperties) 0 }}
{{ push importsArray
    (object items='ViewChild' path='@angular/core')
~}}
{{ push importsArray
    (object items='FormGroup' path='@angular/forms')
~}}
{{ push importsArray
    (object items=(array 'ColumnConfig' 'ColumnDataType' 'exportRows' 'GridColumnsConfigStorageService' 'GridData' 'GridElementsManagerComponent' 'GridFiltersStorageService' 'GridState' 'GridStateService' 'QueryStatementHandler') path='@aurora')
~}}
{{/unlessEq}}
{{/unlessEq}}
{{#each (getWebComponentsProperties schema.aggregateProperties) }}
{{#eq (toKebabCase (getBoundedContextNameFromPropertyRelationship this)) (toKebabCase ../schema.boundedContextName)}}
{{ push ../importsArray
    (object items=(getAggregateNameFromPropertyRelationship this ../schema) path=(sumStrings '../' (toKebabCase (getBoundedContextNameFromPropertyRelationship this)) '.types'))
    (object items=(sumStrings (toPascalCase (getModuleNameFromPropertyRelationship this)) 'Service') path=(sumStrings '../' (toKebabCase (getModuleNameFromPropertyRelationship this)) '/' (toKebabCase (getModuleNameFromPropertyRelationship this)) '.service'))
~}}
{{else}}
{{ push ../importsArray
    (object items=(getAggregateNameFromPropertyRelationship this ../schema) path=(sumStrings '../../' (toKebabCase (getBoundedContextNameFromPropertyRelationship this)) '/' (toKebabCase (getBoundedContextNameFromPropertyRelationship this)) '.types'))
    (object items=(sumStrings (toPascalCase (getModuleNameFromPropertyRelationship this)) 'Service') path=(sumStrings '../../' (toKebabCase (getBoundedContextNameFromPropertyRelationship this)) '/' (toKebabCase (getModuleNameFromPropertyRelationship this)) '/' (toKebabCase (getModuleNameFromPropertyRelationship this)) '.service'))
~}}
{{/eq}}
{{/each}}
{{#each (getGridSelectElementWebComponentsProperties schema.aggregateProperties) }}
{{#eq (toKebabCase (getBoundedContextNameFromPropertyRelationship this)) (toKebabCase ../schema.boundedContextName)}}
{{ push ../importsArray
    (object items=(sumStrings (toCamelCase (getModuleNameFromPropertyRelationship this)) 'ColumnsConfig') path=(sumStrings '../' (toKebabCase (getModuleNameFromPropertyRelationship this)) '/' (toKebabCase (getModuleNameFromPropertyRelationship this)) '.columns-config'))
~}}
{{else}}
{{ push ../importsArray
    (object items=(sumStrings (toCamelCase (getModuleNameFromPropertyRelationship this)) 'ColumnsConfig') path=(sumStrings '../../' (toKebabCase (getBoundedContextNameFromPropertyRelationship this)) '/' (toKebabCase (getModuleNameFromPropertyRelationship this)) '/' (toKebabCase (getModuleNameFromPropertyRelationship this)) '.columns-config'))
~}}
{{/eq}}
{{/each}}
{{#each (getGridElementsManagerWebComponentsProperties schema.aggregateProperties) }}
{{#eq (toKebabCase (getBoundedContextNameFromPropertyRelationship this)) (toKebabCase ../schema.boundedContextName)}}
{{ push ../importsArray
    (object items=(sumStrings (toCamelCase (getModuleNameFromPropertyRelationship this)) 'ColumnsConfig') path=(sumStrings '../' (toKebabCase (getModuleNameFromPropertyRelationship this)) '/' (toKebabCase (getModuleNameFromPropertyRelationship this)) '.columns-config'))
~}}
{{else}}
{{ push ../importsArray
    (object items=(sumStrings (toCamelCase (getModuleNameFromPropertyRelationship this)) 'ColumnsConfig') path=(sumStrings '../../' (toKebabCase (getBoundedContextNameFromPropertyRelationship this)) '/' (toKebabCase (getModuleNameFromPropertyRelationship this)) '/' (toKebabCase (getModuleNameFromPropertyRelationship this)) '.columns-config'))
~}}
{{/eq}}
{{/each}}
{{{ importManager (object imports=importsArray) }}}
@Component({
    selector       : '{{ toKebabCase schema.boundedContextName }}-{{ toKebabCase schema.moduleName }}-detail',
    templateUrl    : './{{ toKebabCase schema.moduleName }}-detail.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone     : true,
    imports        : [
        ...defaultDetailImports,
    ],
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
    {{#if (hasI18nProperties schema.aggregateProperties) }}
    currentLang: CoreLang;
    fallbackLang: CoreLang;
    {{/if}}
{{#unlessEq (countWebComponentsProperties schema.aggregateProperties) 0 }}

    // relationships
    {{#each (getWebComponentsProperties schema.aggregateProperties) }}
    {{#eq webComponent.type 'select'}}
    {{ toCamelCase (getModuleNamesFromPropertyRelationship this) }}$: Observable<{{ getAggregateNameFromPropertyRelationship this ../schema }}[]>;
    {{/eq}}
    {{#eq webComponent.type 'grid-select-element'}}
    /* #region  variables to manage grid-select-element {{ toCamelCase (getModuleNameFromPropertyRelationship this) }} */
    @ViewChild('{{ toCamelCase (getModuleNameFromPropertyRelationship this) }}GridElementSelector') {{ toCamelCase (getModuleNamesFromPropertyRelationship this) }}Component: GridSelectElementComponent;
    {{ toCamelCase (getModuleNamesFromPropertyRelationship this) }}GridId: string = '{{ toCamelCase ../schema.boundedContextName }}::{{ toCamelCase ../schema.moduleName }}.detail.{{ toCamelCase (getModuleNamesFromPropertyRelationship this) }}GridList';
    {{ toCamelCase (getModuleNamesFromPropertyRelationship this) }}GridData$: Observable<GridData<{{ getAggregateNameFromPropertyRelationship this ../schema }}>>;
    {{ toCamelCase (getModuleNamesFromPropertyRelationship this) }}ColumnsConfig$: Observable<ColumnConfig[]>;
    {{ toCamelCase (getModuleNamesFromPropertyRelationship this) }}OriginColumnsConfig: ColumnConfig[] = [
        {
            type   : ColumnDataType.ACTIONS,
            field  : 'Actions',
            sticky : true,
            actions: row =>
            {
                return [
                    {
                        id          : '{{ toCamelCase ../schema.boundedContextName }}::{{ toCamelCase ../schema.moduleName }}.detail.select{{ toPascalCase (getModuleNameFromPropertyRelationship this) }}',
                        isViewAction: false,
                        translation : 'select',
                        icon        : 'add_link',
                    },
                ];
            },
        },
        ...{{ toCamelCase (getModuleNameFromPropertyRelationship this) }}ColumnsConfig,
    ];
    /* #endregion variables to manage grid-select-element {{ toCamelCase (getModuleNameFromPropertyRelationship this) }} */
    {{/eq}}
    {{#eq webComponent.type 'grid-elements-manager'}}
    /* #region  variables to manage grid-elements-manager {{ toCamelCase (getModuleNamesFromPropertyRelationship this) }} */
    @ViewChild('{{ toCamelCase (getModuleNamesFromPropertyRelationship this) }}GridElementsManager') {{ toCamelCase (getModuleNamesFromPropertyRelationship this) }}Component: GridElementsManagerComponent;
    {{ toCamelCase (getModuleNameFromPropertyRelationship this) }}DialogFg: FormGroup;
    {{ toCamelCase (getModuleNamesFromPropertyRelationship this) }}GridId: string = '{{ toCamelCase ../schema.boundedContextName }}::{{ toCamelCase ../schema.moduleName }}.detail.{{ toCamelCase (getModuleNamesFromPropertyRelationship this) }}GridList';
    {{ toCamelCase (getModuleNamesFromPropertyRelationship this) }}GridData$: Observable<GridData<{{ getAggregateNameFromPropertyRelationship this ../schema }}>>;
    {{ toCamelCase (getModuleNamesFromPropertyRelationship this) }}GridState: GridState = {};
    {{ toCamelCase (getModuleNamesFromPropertyRelationship this) }}ColumnsConfig$: Observable<ColumnConfig[]>;
    origin{{ toPascalCase (getModuleNamesFromPropertyRelationship this) }}ColumnsConfig: ColumnConfig[] = [
        {
            type   : ColumnDataType.ACTIONS,
            field  : 'Actions',
            sticky : true,
            actions: row =>
            {
                const actions = [
                    {
                        id          : '{{ toCamelCase ../schema.boundedContextName }}::{{ toCamelCase ../schema.moduleName }}.detail.edit{{ toPascalCase (getModuleNameFromPropertyRelationship this) }}',
                        isViewAction: false,
                        translation : 'edit',
                        icon        : 'mode_edit',
                    },
                    {
                        id          : '{{ toCamelCase ../schema.boundedContextName }}::{{ toCamelCase ../schema.moduleName }}.detail.delete{{ toPascalCase (getModuleNameFromPropertyRelationship this) }}',
                        isViewAction: false,
                        translation : 'delete',
                        icon        : 'delete',
                    },
                ];

                return actions;
            },
        },
        ...{{ toCamelCase (getModuleNameFromPropertyRelationship this) }}ColumnsConfig,
    ];
    /* #endregion variables to manage grid-elements-manager {{ toCamelCase (getModuleNamesFromPropertyRelationship this) }} */
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
{{
    setVar 'injectionsArray' (
        array
            (object scope='protected' variableName='injector' className='Injector')
            (object variableName=(sumStrings (toCamelCase schema.moduleName) 'Service') className=(sumStrings (toPascalCase schema.moduleName) 'Service'))
    )
~}}
{{#if (hasI18nProperties schema.aggregateProperties) }}
{{ push injectionsArray
    (object variableName='coreCurrentLangService' className='CoreCurrentLangService')
~}}
{{/if}}
{{#unlessEq (countGridSelectElementWebComponentsProperties schema.aggregateProperties) 0 }}
{{ push injectionsArray
    (object variableName='gridColumnsConfigStorageService' className='GridColumnsConfigStorageService')
    (object variableName='gridFiltersStorageService' className='GridFiltersStorageService')
    (object variableName='gridStateService' className='GridStateService')
~}}
{{/unlessEq ~}}
{{#unlessEq (countGridElementsManagerWebComponentsProperties schema.aggregateProperties) 0 }}
{{ push injectionsArray
    (object variableName='gridColumnsConfigStorageService' className='GridColumnsConfigStorageService')
    (object variableName='gridFiltersStorageService' className='GridFiltersStorageService')
    (object variableName='gridStateService' className='GridStateService')
~}}
{{/unlessEq ~}}
{{#each (getWebComponentsProperties schema.aggregateProperties) }}
{{#eq webComponent.type 'select'}}
{{ push ../injectionsArray
    (object variableName=(sumStrings (toCamelCase (getModuleNameFromPropertyRelationship this)) 'Service') className=(sumStrings (toPascalCase (getModuleNameFromPropertyRelationship this)) 'Service'))
~}}
{{/eq ~}}
{{#eq webComponent.type 'grid-select-element'}}
{{ push ../injectionsArray
    (object variableName=(sumStrings (toCamelCase (getModuleNameFromPropertyRelationship this)) 'Service') className=(sumStrings (toPascalCase (getModuleNameFromPropertyRelationship this)) 'Service'))
~}}
{{/eq ~}}
{{#eq webComponent.type 'grid-elements-manager'}}
{{ push ../injectionsArray
    (object variableName=(sumStrings (toCamelCase (getModuleNameFromPropertyRelationship this)) 'Service') className=(sumStrings (toPascalCase (getModuleNameFromPropertyRelationship this)) 'Service'))
~}}
{{/eq ~}}
{{/each ~}}
{{{ constructorInjectorManager (object injections=injectionsArray) }}}
    )
    {
        super(injector);
    }

    // this method will be called after the ngOnInit of
    // the parent class you can use instead of ngOnInit
    init(): void
    {
        /**/
        {{#each (getWebComponentsProperties schema.aggregateProperties) }}
        {{#eq webComponent.type 'select'}}
        this.{{ toCamelCase (getModuleNamesFromPropertyRelationship this) }}$ = this.{{ toCamelCase (getModuleNameFromPropertyRelationship this) }}Service.{{ toCamelCase (getModuleNamesFromPropertyRelationship this) }}$;
        {{/eq}}
        {{#eq webComponent.type 'grid-select-element'}}
        // {{ toCamelCase (getModuleNameFromPropertyRelationship this) }} grid-select-element
        this.{{ toCamelCase (getModuleNamesFromPropertyRelationship this) }}ColumnsConfig$ = this.gridColumnsConfigStorageService
            .getColumnsConfig(this.{{ toCamelCase (getModuleNamesFromPropertyRelationship this) }}GridId, this.{{ toCamelCase (getModuleNamesFromPropertyRelationship this) }}OriginColumnsConfig)
            .pipe(takeUntil(this.unsubscribeAll$));
        this.{{ toCamelCase (getModuleNamesFromPropertyRelationship this) }}GridData$ = this.{{ toCamelCase (getModuleNameFromPropertyRelationship this) }}Service.pagination$;
        {{/eq}}
        {{/each}}
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
            {{#each (getFormGroupFieldsProperties schema.aggregateProperties) }}
            {{#if (isAllowProperty ../schema.moduleName this) }}
            {{ toCamelCase (getPropertyName this) }}: {{#if (hasValidationFormControl .)}}[{{{initialFormGroupData .}}}, [{{#unless nullable }}Validators.required{{ hasCommaInValidationFormControl . 'nullable' }}{{/unless}}{{#if (length this) }}Validators.minLength({{ (length this) }}), Validators.maxLength({{ (length this) }}){{ hasCommaInValidationFormControl . 'length' }}{{/if}}{{#if maxLength }}Validators.maxLength({{maxLength}}){{ hasCommaInValidationFormControl . 'maxLength' }}{{/if}}]]{{else}}{{{initialFormGroupData .}}}{{/if}},
            {{/if}}
            {{/each}}
        });
    }

    {{#if (hasI18nProperties schema.aggregateProperties) }}
    // disable fields when manage object
    // that language is not APP_FALLBACK_LANG
    disabledNotI18nFields(): void
    {
        {{#each (getFormGroupFieldsIsNotI18nProperties schema.aggregateProperties) }}
        this.fg.get('{{ toCamelCase (getPropertyName this) }}').disable();
        {{/each}}
    }

    {{/if}}
    {{#each (getGridElementsManagerWebComponentsProperties schema.aggregateProperties) }}
    /* #region methods to manage {{ toPascalCase (getModuleNamesFromPropertyRelationship this) }} */
    create{{ toPascalCase (getModuleNameFromPropertyRelationship this) }}DialogForm(): void
    {
        this.{{ toCamelCase (getModuleNameFromPropertyRelationship this) }}DialogFg = this.fb.group({
            {{#each (getFormGroupFieldsProperties (getPropertiesFromPropertyRelationship this)) }}
            {{#if (isAllowProperty (getModuleNameFromPropertyRelationship this) this) }}
            {{ toCamelCase (getPropertyName this) }}: {{#if (hasValidationFormControl .)}}[{{{initialFormGroupData .}}}, [{{#unless nullable }}Validators.required{{ hasCommaInValidationFormControl . 'nullable' }}{{/unless}}{{#if (length this) }}Validators.minLength({{ (length this) }}), Validators.maxLength({{ (length this) }}){{ hasCommaInValidationFormControl . 'length' }}{{/if}}{{#if maxLength }}Validators.maxLength({{maxLength}}){{ hasCommaInValidationFormControl . 'maxLength' }}{{/if}}]]{{else}}{{{initialFormGroupData .}}}{{/if}},
            {{/if}}
            {{/each}}
        });
    }

    handleSubmit{{ toPascalCase (getModuleNameFromPropertyRelationship this) }}Form($event, dialog): void
    {
        // manage validations before execute actions
        if (this.{{ toCamelCase (getModuleNameFromPropertyRelationship this) }}DialogFg.invalid)
        {
            log('[DEBUG] Error to validate form: ', this.{{ toCamelCase (getModuleNameFromPropertyRelationship this) }}DialogFg);
            this.validationMessagesService.validate();
            return;
        }

        // depending on the dialog action we invoke a create{{ toPascalCase (getModuleNameFromPropertyRelationship this) }} or update{{ toPascalCase (getModuleNameFromPropertyRelationship this) }} action
        this.actionService.action({
            id: mapActions(
                dialog.componentInstance.data.currentActionId,
                {
                    '{{ toCamelCase schema.boundedContextName }}::{{ toCamelCase schema.moduleName }}.detail.new{{ toPascalCase (getModuleNameFromPropertyRelationship this) }}' : '{{ toCamelCase schema.boundedContextName }}::{{ toCamelCase schema.moduleName }}.detail.create{{ toPascalCase (getModuleNameFromPropertyRelationship this) }}',
                    '{{ toCamelCase schema.boundedContextName }}::{{ toCamelCase schema.moduleName }}.detail.edit{{ toPascalCase (getModuleNameFromPropertyRelationship this) }}': '{{ toCamelCase schema.boundedContextName }}::{{ toCamelCase schema.moduleName }}.detail.update{{ toPascalCase (getModuleNameFromPropertyRelationship this) }}',
                },
            ),
            isViewAction: false,
        });

        dialog.close();
    }
    /* #endregion methods to manage {{ toPascalCase (getModuleNamesFromPropertyRelationship this) }} */

    {{/each}}
    async handleAction(action: Action): Promise<void>
    {
        // add optional chaining (?.) to avoid first call where behaviour subject is undefined
        switch (action?.id)
        {
            /* #region common actions */
            case '{{ toCamelCase schema.boundedContextName }}::{{ toCamelCase schema.moduleName }}.detail.new':
                {{#unless (hasI18nProperties schema.aggregateProperties) }}
                this.fg.get('id').setValue(Utils.uuid());
                {{else}}
                this.currentLang = this.coreCurrentLangService.currentLang;

                // only when hasta id param, we are creating
                // a record with an alternative language
                if (this.activatedRoute.snapshot.paramMap.get('id'))
                {
                    this.{{ toCamelCase schema.moduleName }}Service
                        .{{ toCamelCase schema.moduleName }}$
                        .pipe(takeUntil(this.unsubscribeAll$))
                        .subscribe(item =>
                        {
                            this.managedObject = item;
                            this.fg.patchValue(item);
                            this.disabledNotI18nFields();
                        });
                }
                else
                {
                    // only when we create a record
                    // with default language
                    this.fg.get('id').setValue(Utils.uuid());
                }

                this.fg.get('langId').setValue(this.currentLang.id);
                {{/unless}}
                break;

            case '{{ toCamelCase schema.boundedContextName }}::{{ toCamelCase schema.moduleName }}.detail.edit':
                {{#if (hasI18nProperties schema.aggregateProperties) }}
                this.currentLang = this.coreCurrentLangService.currentLang;
                this.fallbackLang = this.sessionService.get('fallbackLang');

                {{/if}}
                this.{{ toCamelCase schema.moduleName }}Service
                    .{{ toCamelCase schema.moduleName }}$
                    .pipe(takeUntil(this.unsubscribeAll$))
                    .subscribe(item =>
                    {
                        this.managedObject = item;
                        this.fg.patchValue(item);
                        {{#if (hasI18nProperties schema.aggregateProperties) }}
                        if (this.fallbackLang.id !== this.currentLang.id) this.disabledNotI18nFields();
                        {{/if}}
                    });
                {{#each (getGridElementsManagerWebComponentsProperties schema.aggregateProperties) }}

                /* #region init actions to manage {{ toCamelCase (getModuleNamesFromPropertyRelationship this) }} grid-elements-manager */
                this.{{ toCamelCase (getModuleNamesFromPropertyRelationship this) }}ColumnsConfig$ = this.gridColumnsConfigStorageService
                    .getColumnsConfig(this.{{ toCamelCase (getModuleNamesFromPropertyRelationship this) }}GridId, this.origin{{ toPascalCase (getModuleNamesFromPropertyRelationship this) }}ColumnsConfig)
                    .pipe(takeUntil(this.unsubscribeAll$));

                this.{{ toCamelCase (getModuleNamesFromPropertyRelationship this) }}GridState = {
                    columnFilters: this.gridFiltersStorageService.getColumnFilterState(this.{{ toCamelCase (getModuleNamesFromPropertyRelationship this) }}GridId),
                    page         : this.gridStateService.getPage(this.{{ toCamelCase (getModuleNamesFromPropertyRelationship this) }}GridId),
                    sort         : this.gridStateService.getSort(this.{{ toCamelCase (getModuleNamesFromPropertyRelationship this) }}GridId),
                    search       : this.gridStateService.getSearchState(this.{{ toCamelCase (getModuleNamesFromPropertyRelationship this) }}GridId),
                };

                this.{{ toCamelCase (getModuleNamesFromPropertyRelationship this) }}GridData$ = this.{{ toCamelCase (getModuleNameFromPropertyRelationship this) }}Service.pagination$;

                // subscription to get {{ toCamelCase (getModuleNameFromPropertyRelationship this) }} in edit {{ toCamelCase ../schema.moduleName }} action
                this.{{ toCamelCase (getModuleNameFromPropertyRelationship this) }}Service
                    .{{ toCamelCase (getModuleNameFromPropertyRelationship this) }}$
                    .pipe(takeUntil(this.unsubscribeAll$))
                    .subscribe(({{ toCamelCase (getModuleNameFromPropertyRelationship this) }}: {{ (getAggregateNameFromPropertyRelationship this) }}) =>
                    {
                        if ({{ toCamelCase (getModuleNameFromPropertyRelationship this) }} && this.currentAction.id === '{{ toCamelCase schema.boundedContextName }}::{{ toCamelCase schema.moduleName }}.detail.edit{{ toPascalCase (getModuleNameFromPropertyRelationship this) }}')
                        {
                            this.{{ toCamelCase (getModuleNameFromPropertyRelationship this) }}DialogFg.patchValue({{ toCamelCase (getModuleNameFromPropertyRelationship this) }});
                        }
                    });
                /* #endregion init actions to manage {{ toCamelCase (getModuleNamesFromPropertyRelationship this) }} grid-elements-manager */
                {{/each}}
                break;

            case '{{ toCamelCase schema.boundedContextName }}::{{ toCamelCase schema.moduleName }}.detail.create':
                try
                {
                    await lastValueFrom(
                        this.{{ toCamelCase schema.moduleName }}Service
                            .create<{{ schema.aggregateName }}>({
                                {{#unless (hasI18nProperties schema.aggregateProperties) }}
                                object: this.fg.value,
                                {{else}}
                                // getRawValue to send disabled values
                                object : this.fg.getRawValue(),
                                headers: {
                                    'Content-Language': this.currentLang[this.sessionService.get('searchKeyLang')],
                                },
                                {{/unless}}
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
                                {{#unless (hasI18nProperties schema.aggregateProperties) }}
                                object: this.fg.value,
                                {{else}}
                                // getRawValue to send disabled values
                                object : this.fg.getRawValue(),
                                headers: {
                                    'Content-Language': this.currentLang[this.sessionService.get('searchKeyLang')],
                                },
                                {{/unless}}
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
            {{#if (hasI18nProperties schema.aggregateProperties) }}

            case '{{ toCamelCase schema.boundedContextName }}::{{ toCamelCase schema.moduleName }}.detail.delete':
                const deleteDialogRef = this.confirmationService.open({
                    title  : `${this.translocoService.translate('DeleteTranslation')} ${this.translocoService.translate('Of').toLowerCase()} ${this.translocoService.translate('{{ toCamelCase schema.boundedContextName }}.{{ toPascalCase schema.moduleName }}').toLowerCase()}`,
                    message: this.translocoService.translate('DeletionWarning', { entity: this.translocoService.translate('{{ toCamelCase schema.boundedContextName }}.{{ toPascalCase schema.moduleName }}') }),
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
                                    this.{{ toCamelCase schema.moduleName }}Service
                                        .deleteById<{{ schema.aggregateName }}>({
                                            id     : this.managedObject.id,
                                            headers: {
                                                'Content-Language': this.currentLang[this.sessionService.get('searchKeyLang')],
                                            },
                                        }),
                                );

                                this.router.navigate(['{{ toKebabCase schema.boundedContextName }}/{{ toKebabCase schema.moduleName }}']);
                            }
                            catch(error)
                            {
                                log(`[DEBUG] Catch error in ${action.id} action: ${error}`);
                            }
                        }
                    });
                break;
                {{/if}}
                /* #endregion common actions */
            {{#each (getGridSelectElementWebComponentsProperties schema.aggregateProperties) }}

            /* #region actions to manage {{ toCamelCase (getModuleNamesFromPropertyRelationship property) }} grid-select-element */
            case '{{ toCamelCase ../schema.boundedContextName }}::{{ toCamelCase ../schema.moduleName }}.detail.{{ toCamelCase (getModuleNamesFromPropertyRelationship this) }}OpenDialog':
                this.{{ toCamelCase (getModuleNamesFromPropertyRelationship this) }}Component.gridState = {
                    columnFilters: this.gridFiltersStorageService.getColumnFilterState(this.{{ toCamelCase (getModuleNamesFromPropertyRelationship this) }}GridId),
                    page         : this.gridStateService.getPage(this.{{ toCamelCase (getModuleNamesFromPropertyRelationship this) }}GridId),
                    sort         : this.gridStateService.getSort(this.{{ toCamelCase (getModuleNamesFromPropertyRelationship this) }}GridId),
                    search       : this.gridStateService.getSearchState(this.{{ toCamelCase (getModuleNamesFromPropertyRelationship this) }}GridId),
                };
                this.{{ toCamelCase (getModuleNamesFromPropertyRelationship this) }}Component.openDialog();
                break;

            case '{{ toCamelCase ../schema.boundedContextName }}::{{ toCamelCase ../schema.moduleName }}.detail.{{ toCamelCase (getModuleNamesFromPropertyRelationship this) }}Pagination':
                await lastValueFrom(
                    this.{{ toCamelCase (getModuleNameFromPropertyRelationship this) }}Service
                        .pagination({
                            query: action.meta.query ?
                                action.meta.query :
                                QueryStatementHandler
                                    .init({ columnsConfig: {{ toCamelCase (getModuleNameFromPropertyRelationship this) }}ColumnsConfig })
                                    .setColumFilters(this.gridFiltersStorageService.getColumnFilterState(this.{{ toCamelCase (getModuleNamesFromPropertyRelationship this) }}GridId))
                                    .setSort(this.gridStateService.getSort(this.{{ toCamelCase (getModuleNamesFromPropertyRelationship this) }}GridId))
                                    .setPage(this.gridStateService.getPage(this.{{ toCamelCase (getModuleNamesFromPropertyRelationship this) }}GridId))
                                    .setSearch(this.gridStateService.getSearchState(this.{{ toCamelCase (getModuleNamesFromPropertyRelationship this) }}GridId))
                                    .getQueryStatement(),
                        }),
                );
                break;

            case '{{ toCamelCase ../schema.boundedContextName }}::{{ toCamelCase ../schema.moduleName }}.detail.select{{ toPascalCase (getModuleNameFromPropertyRelationship this) }}':
                const {{ toCamelCase (getModuleNameFromPropertyRelationship this) }} = action.meta.row as {{ getAggregateNameFromPropertyRelationship this ../schema }};

                this.fg.get('{{ toCamelCase (getModuleNameFromPropertyRelationship this) }}Id').setValue({{ toCamelCase (getModuleNameFromPropertyRelationship this) }}.id);
                this.fg.get('{{ toCamelCase (getModuleNameFromPropertyRelationship this) }}Name').setValue({{ toCamelCase (getModuleNameFromPropertyRelationship this) }}.name);
                this.fg.markAsDirty();

                this.{{ toCamelCase (getModuleNamesFromPropertyRelationship this) }}Component.closeDialog();
                break;

            case '{{ toCamelCase ../schema.boundedContextName }}::{{ toCamelCase ../schema.moduleName }}.detail.export{{ toPascalCase (getModuleNamesFromPropertyRelationship this) }}':
                const {{ toCamelCase (getModuleNameFromPropertyRelationship this) }}Rows = await lastValueFrom(
                    this.{{ toCamelCase (getModuleNameFromPropertyRelationship this) }}Service
                        .get({
                            query     : action.meta.query,
                            constraint: { /**/ },
                        }),
                );

                const {{ toCamelCase (getModuleNameFromPropertyRelationship this) }}Columns: string[] = {{ toCamelCase (getModuleNameFromPropertyRelationship this) }}ColumnsConfig.map({{ toCamelCase (getModuleNameFromPropertyRelationship this) }}ColumnConfig => {{ toCamelCase (getModuleNameFromPropertyRelationship this) }}ColumnConfig.field);
                const {{ toCamelCase (getModuleNameFromPropertyRelationship this) }}Headers = {{ toCamelCase (getModuleNameFromPropertyRelationship this) }}Columns.map(column => this.translocoService.translate('{{ toCamelCase ../schema.boundedContextName }}.' + column.toPascalCase()));

                exportRows(
                    {{ toCamelCase (getModuleNameFromPropertyRelationship this) }}Rows.objects,
                    'order{{ toPascalCase (getModuleNamesFromPropertyRelationship this) }}.' + action.meta.format,
                    {{ toCamelCase (getModuleNameFromPropertyRelationship this) }}Columns,
                    {{ toCamelCase (getModuleNameFromPropertyRelationship this) }}Headers,
                    action.meta.format,
                );
                break;
                /* #endregion actions to manage {{ toCamelCase (getModuleNamesFromPropertyRelationship property) }} grid-select-element */
            {{/each}}
            {{#each (getGridElementsManagerWebComponentsProperties schema.aggregateProperties) }}

            /* #region actions to manage {{ toCamelCase (getModuleNamesFromPropertyRelationship this) }} grid-elements-manager */
            case '{{ toCamelCase ../schema.boundedContextName }}::{{ toCamelCase ../schema.moduleName }}.detail.{{ toCamelCase (getModuleNamesFromPropertyRelationship this) }}Pagination':
                await lastValueFrom(
                    this.{{ toCamelCase (getModuleNameFromPropertyRelationship this) }}Service
                        .pagination({
                            query: action.meta.query ?
                                action.meta.query :
                                QueryStatementHandler
                                    .init({ columnsConfig: {{ toCamelCase (getModuleNameFromPropertyRelationship this) }}ColumnsConfig })
                                    .setColumFilters(this.gridFiltersStorageService.getColumnFilterState(this.{{ toCamelCase (getModuleNamesFromPropertyRelationship this) }}GridId))
                                    .setSort(this.gridStateService.getSort(this.{{ toCamelCase (getModuleNamesFromPropertyRelationship this) }}GridId))
                                    .setPage(this.gridStateService.getPage(this.{{ toCamelCase (getModuleNamesFromPropertyRelationship this) }}GridId))
                                    .setSearch(this.gridStateService.getSearchState(this.{{ toCamelCase (getModuleNamesFromPropertyRelationship this) }}GridId))
                                    .getQueryStatement(),
                            constraint: {
                                where: {
                                    {{ getForeignKey (object relationship=relationship schema=../schema) }}: this.managedObject.id,
                                },
                            },
                        }),
                );
                break;

            case '{{ toCamelCase ../schema.boundedContextName }}::{{ toCamelCase ../schema.moduleName }}.detail.new{{ toPascalCase (getModuleNameFromPropertyRelationship this) }}':
                this.create{{ toPascalCase (getModuleNameFromPropertyRelationship this) }}DialogForm();
                this.{{ toCamelCase (getModuleNamesFromPropertyRelationship this) }}Component.handleElementDetailDialog(action.id);
                this.{{ toCamelCase (getModuleNameFromPropertyRelationship this) }}DialogFg.get('id').setValue(Utils.uuid());
                this.{{ toCamelCase (getModuleNameFromPropertyRelationship this) }}DialogFg.get('{{ getForeignKey (object relationship=relationship schema=../schema) }}').setValue(this.managedObject.id);
                break;

            case '{{ toCamelCase ../schema.boundedContextName }}::{{ toCamelCase ../schema.moduleName }}.detail.create{{ toPascalCase (getModuleNameFromPropertyRelationship this) }}':
                await lastValueFrom(
                    this.{{ toCamelCase (getModuleNameFromPropertyRelationship this) }}Service
                        .create<{{ (getAggregateNameFromPropertyRelationship this) }}>({
                            object: this.{{ toCamelCase (getModuleNameFromPropertyRelationship this) }}DialogFg.value,
                        }),
                );

                this.actionService.action({
                    id          : '{{ toCamelCase ../schema.boundedContextName }}::{{ toCamelCase ../schema.moduleName }}.detail.{{ toCamelCase (getModuleNamesFromPropertyRelationship this) }}Pagination',
                    isViewAction: false,
                });
                break;

            case '{{ toCamelCase ../schema.boundedContextName }}::{{ toCamelCase ../schema.moduleName }}.detail.edit{{ toPascalCase (getModuleNameFromPropertyRelationship this) }}':
                this.create{{ toPascalCase (getModuleNameFromPropertyRelationship this) }}DialogForm();
                await lastValueFrom(
                    this.{{ toCamelCase (getModuleNameFromPropertyRelationship this) }}Service
                        .findById({
                            id        : action.meta.row.id,
                            constraint: {
                                where: {
                                    {{ getForeignKey (object relationship=relationship schema=../schema) }}: this.managedObject.id,
                                },
                            },
                        }),
                );
                this.{{ toCamelCase (getModuleNamesFromPropertyRelationship this) }}Component.handleElementDetailDialog(action.id);
                break;

            case '{{ toCamelCase ../schema.boundedContextName }}::{{ toCamelCase ../schema.moduleName }}.detail.update{{ toPascalCase (getModuleNameFromPropertyRelationship this) }}':
                this.{{ toCamelCase (getModuleNameFromPropertyRelationship this) }}DialogFg.removeControl('{{ getForeignKey (object relationship=relationship schema=../schema) }}');

                await lastValueFrom(
                    this.{{ toCamelCase (getModuleNameFromPropertyRelationship this) }}Service
                        .updateById<{{ (getAggregateNameFromPropertyRelationship this) }}>({
                            object: this.{{ toCamelCase (getModuleNameFromPropertyRelationship this) }}DialogFg.value,
                        }),
                );
                this.actionService.action({
                    id          : '{{ toCamelCase ../schema.boundedContextName }}::{{ toCamelCase ../schema.moduleName }}.detail.{{ toCamelCase (getModuleNamesFromPropertyRelationship this) }}Pagination',
                    isViewAction: false,
                });
                break;

            case '{{ toCamelCase ../schema.boundedContextName }}::{{ toCamelCase ../schema.moduleName }}.detail.delete{{ toPascalCase (getModuleNameFromPropertyRelationship this) }}':
                const delete{{ toPascalCase (getModuleNameFromPropertyRelationship this) }}DialogRef = this.confirmationService.open({
                    title  : `${this.translocoService.translate('Delete')} ${this.translocoService.translate('{{ toCamelCase schema.boundedContextName }}.{{ toPascalCase (getModuleNameFromPropertyRelationship this) }}')}`,
                    message: this.translocoService.translate('DeletionWarning', { entity: this.translocoService.translate('{{ toCamelCase schema.boundedContextName }}.{{ toPascalCase (getModuleNameFromPropertyRelationship this) }}') }),
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

                delete{{ toPascalCase (getModuleNameFromPropertyRelationship this) }}DialogRef
                    .afterClosed()
                    .subscribe(async result =>
                    {
                        if (result === 'confirmed')
                        {
                            try
                            {
                                await lastValueFrom(
                                    this.{{ toCamelCase (getModuleNameFromPropertyRelationship this) }}Service
                                        .deleteById<{{ (getAggregateNameFromPropertyRelationship this) }}>({
                                            id: action.meta.row.id,
                                        }),
                                );

                                this.actionService.action({
                                    id          : '{{ toCamelCase ../schema.boundedContextName }}::{{ toCamelCase ../schema.moduleName }}.detail.{{ toCamelCase (getModuleNamesFromPropertyRelationship this) }}Pagination',
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

            case '{{ toCamelCase ../schema.boundedContextName }}::{{ toCamelCase ../schema.moduleName }}.detail.export{{ toPascalCase (getModuleNameFromPropertyRelationship this) }}s':
                const {{ toCamelCase (getModuleNameFromPropertyRelationship this) }}Rows = await lastValueFrom(
                    this.{{ toCamelCase (getModuleNameFromPropertyRelationship this) }}Service
                        .get({
                            query     : action.meta.query,
                            constraint: {
                                where: {
                                    {{ getForeignKey (object relationship=relationship schema=../schema) }}: this.managedObject.id,
                                },
                            },
                        }),
                );

                const {{ toCamelCase (getModuleNameFromPropertyRelationship this) }}Columns: string[] = {{ toCamelCase (getModuleNameFromPropertyRelationship this) }}ColumnsConfig.map({{ toCamelCase (getModuleNameFromPropertyRelationship this) }}ColumnConfig => {{ toCamelCase (getModuleNameFromPropertyRelationship this) }}ColumnConfig.field);
                const {{ toCamelCase (getModuleNameFromPropertyRelationship this) }}Headers = {{ toCamelCase (getModuleNameFromPropertyRelationship this) }}Columns.map(column => this.translocoService.translate('{{ toCamelCase ../schema.boundedContextName }}.' + column.toPascalCase()));

                exportRows(
                    {{ toCamelCase (getModuleNameFromPropertyRelationship this) }}Rows.objects,
                    '{{ toCamelCase (getModuleNamesFromPropertyRelationship this) }}.' + action.meta.format,
                    {{ toCamelCase (getModuleNameFromPropertyRelationship this) }}Columns,
                    {{ toCamelCase (getModuleNameFromPropertyRelationship this) }}Headers,
                    action.meta.format,
                );
                break;
                /* #endregion actions to manage {{ toCamelCase (getModuleNamesFromPropertyRelationship this) }} grid-elements-manager */
            {{/each}}
        }
    }
}
