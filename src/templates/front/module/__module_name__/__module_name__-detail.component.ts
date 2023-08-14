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
{{#unlessEq schema.aggregateProperties.lengthWebComponents 0 }}
{{ push importsArray
    (object items='Observable' path='rxjs')
~}}
{{#unlessEq schema.aggregateProperties.lengthGridSelectElementWebComponents 0 }}
{{ push importsArray
    (object items='ViewChild' path='@angular/core')
~}}
{{ push importsArray
    (object items=(array 'ColumnConfig' 'ColumnDataType' 'exportRows' 'GridColumnsConfigStorageService' 'GridData' 'GridFiltersStorageService' 'GridSelectElementComponent' 'GridStateService' 'QueryStatementHandler') path='@aurora')
~}}
{{/unlessEq}}
{{#unlessEq schema.aggregateProperties.lengthGridElementsManagerWebComponents 0 }}
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
{{#each schema.aggregateProperties.withWebComponents}}
{{#eq (toKebabCase getRelationshipSchema.boundedContextName) (toKebabCase ../schema.boundedContextName)}}
{{ push ../importsArray
    (object items=getRelationshipAggregateName path=(sumStrings '../' (toKebabCase getRelationshipSchema.boundedContextName) '.types'))
    (object items=(sumStrings (toPascalCase getRelationshipSchema.moduleName) 'Service') path=(sumStrings '../' (toKebabCase getRelationshipSchema.moduleName) '/' (toKebabCase getRelationshipSchema.moduleName) '.service'))
~}}
{{else}}
{{ push ../importsArray
    (object items=getRelationshipAggregateName path=(sumStrings '../../' (toKebabCase getRelationshipSchema.boundedContextName) '/' (toKebabCase getRelationshipSchema.boundedContextName) '.types'))
    (object items=(sumStrings (toPascalCase getRelationshipSchema.moduleName) 'Service') path=(sumStrings '../../' (toKebabCase getRelationshipSchema.boundedContextName) '/' (toKebabCase getRelationshipSchema.moduleName) '/' (toKebabCase getRelationshipSchema.moduleName) '.service'))
~}}
{{/eq}}
{{/each}}
{{#each schema.aggregateProperties.withGridSelectElementWebComponents}}
{{#eq (toKebabCase getRelationshipSchema.boundedContextName) (toKebabCase ../schema.boundedContextName)}}
{{ push ../importsArray
    (object items=(sumStrings (toCamelCase getRelationshipSchema.moduleName) 'ColumnsConfig') path=(sumStrings '../' (toKebabCase getRelationshipSchema.moduleName) '/' (toKebabCase getRelationshipSchema.moduleName) '.columns-config'))
~}}
{{else}}
{{ push ../importsArray
    (object items=(sumStrings (toCamelCase getRelationshipSchema.moduleName) 'ColumnsConfig') path=(sumStrings '../../' (toKebabCase getRelationshipSchema.boundedContextName) '/' (toKebabCase getRelationshipSchema.moduleName) '/' (toKebabCase getRelationshipSchema.moduleName) '.columns-config'))
~}}
{{/eq}}
{{/each}}
{{#each schema.aggregateProperties.withGridElementsManagerWebComponents}}
{{#eq (toKebabCase getRelationshipSchema.boundedContextName) (toKebabCase ../schema.boundedContextName)}}
{{ push ../importsArray
    (object items=(sumStrings (toCamelCase getRelationshipSchema.moduleName) 'ColumnsConfig') path=(sumStrings '../' (toKebabCase getRelationshipSchema.moduleName) '/' (toKebabCase getRelationshipSchema.moduleName) '.columns-config'))
~}}
{{else}}
{{ push ../importsArray
    (object items=(sumStrings (toCamelCase getRelationshipSchema.moduleName) 'ColumnsConfig') path=(sumStrings '../../' (toKebabCase getRelationshipSchema.boundedContextName) '/' (toKebabCase getRelationshipSchema.moduleName) '/' (toKebabCase getRelationshipSchema.moduleName) '.columns-config'))
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
{{#unlessEq schema.aggregateProperties.lengthWebComponents 0 }}

    // relationships
    {{#each schema.aggregateProperties.withWebComponents}}
    {{#eq webComponent.type 'select'}}
    {{ toCamelCase getRelationshipSchema.moduleNames }}$: Observable<{{ getRelationshipAggregateName }}[]>;
    {{/eq}}
    {{#eq webComponent.type 'grid-select-element'}}
    /* #region  variables to manage grid-select-element {{ toCamelCase getRelationshipSchema.moduleName }} */
    @ViewChild('{{ toCamelCase getRelationshipSchema.moduleName }}GridElementSelector') {{ toCamelCase getRelationshipSchema.moduleNames }}Component: GridSelectElementComponent;
    {{ toCamelCase getRelationshipSchema.moduleNames }}GridId: string = '{{ toCamelCase ../schema.boundedContextName }}::{{ toCamelCase ../schema.moduleName }}.detail.{{ toCamelCase getRelationshipSchema.moduleNames }}GridList';
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
{{#unlessEq schema.aggregateProperties.lengthGridSelectElementWebComponents 0 }}
{{ push injectionsArray
    (object variableName='gridColumnsConfigStorageService' className='GridColumnsConfigStorageService')
    (object variableName='gridFiltersStorageService' className='GridFiltersStorageService')
    (object variableName='gridStateService' className='GridStateService')
~}}
{{/unlessEq ~}}
{{#unlessEq schema.aggregateProperties.lengthGridElementsManagerWebComponents 0 }}
{{ push injectionsArray
    (object variableName='gridColumnsConfigStorageService' className='GridColumnsConfigStorageService')
    (object variableName='gridFiltersStorageService' className='GridFiltersStorageService')
    (object variableName='gridStateService' className='GridStateService')
~}}
{{/unlessEq ~}}
{{#each schema.aggregateProperties.withWebComponents}}
{{#eq webComponent.type 'select'}}
{{ push ../injectionsArray
    (object variableName=(sumStrings (toCamelCase getRelationshipSchema.moduleName) 'Service') className=(sumStrings (toPascalCase getRelationshipSchema.moduleName) 'Service'))
~}}
{{/eq ~}}
{{#eq webComponent.type 'grid-select-element'}}
{{ push ../injectionsArray
    (object variableName=(sumStrings (toCamelCase getRelationshipSchema.moduleName) 'Service') className=(sumStrings (toPascalCase getRelationshipSchema.moduleName) 'Service'))
~}}
{{/eq ~}}
{{#eq webComponent.type 'grid-elements-manager'}}
{{ push ../injectionsArray
    (object variableName=(sumStrings (toCamelCase getRelationshipSchema.moduleName) 'Service') className=(sumStrings (toPascalCase getRelationshipSchema.moduleName) 'Service'))
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
        {{#each schema.aggregateProperties.withWebComponents}}
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
            {{#each schema.aggregateProperties.formGroupFields}}
            {{#if (isAllowProperty ../schema.moduleName this) }}
            {{ toCamelCase (getNameProperty this) }}: {{#if (hasValidationFormControl .)}}[{{{initialFormGroupData .}}}, [{{#unless nullable }}Validators.required{{ hasCommaInValidationFormControl . 'nullable' }}{{/unless}}{{#if this.length}}Validators.minLength({{this.length }}), Validators.maxLength({{this.length}}){{ hasCommaInValidationFormControl . 'length' }}{{/if}}{{#if maxLength }}Validators.maxLength({{maxLength}}){{ hasCommaInValidationFormControl . 'maxLength' }}{{/if}}]]{{else}}{{{initialFormGroupData .}}}{{/if}},
            {{/if}}
            {{/each}}
        });
    }

    {{#if (hasI18nProperties schema.aggregateProperties) }}
    // disable fields when manage object
    // that language is not APP_FALLBACK_LANG
    disabledNotI18nFields(): void
    {
        {{#each schema.aggregateProperties.formGroupFieldsIsNotI18n}}
        this.fg.get('{{ toCamelCase (getNameProperty this) }}').disable();
        {{/each}}
    }

    {{/if}}
    {{#each schema.aggregateProperties.withGridElementsManagerWebComponents}}
    /* #region methods to manage {{ toPascalCase getRelationshipSchema.moduleNames }} */
    create{{ toPascalCase getRelationshipSchema.moduleName }}DialogForm(): void
    {
        this.{{ toCamelCase getRelationshipSchema.moduleName }}DialogFg = this.fb.group({
            {{#each getRelationshipSchema.properties.formGroupFields}}
            {{#if (isAllowProperty getRelationshipSchema.moduleName this) }}
            {{ toCamelCase (getNameProperty this) }}: {{#if (hasValidationFormControl .)}}[{{{initialFormGroupData .}}}, [{{#unless nullable }}Validators.required{{ hasCommaInValidationFormControl . 'nullable' }}{{/unless}}{{#if this.length}}Validators.minLength({{this.length }}), Validators.maxLength({{this.length}}){{ hasCommaInValidationFormControl . 'length' }}{{/if}}{{#if maxLength }}Validators.maxLength({{maxLength}}){{ hasCommaInValidationFormControl . 'maxLength' }}{{/if}}]]{{else}}{{{initialFormGroupData .}}}{{/if}},
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
                {{#each schema.aggregateProperties.withGridElementsManagerWebComponents}}

                /* #region init actions to manage {{ toCamelCase getRelationshipSchema.moduleNames }} grid-elements-manager */
                this.{{ toCamelCase getRelationshipSchema.moduleNames }}ColumnsConfig$ = this.gridColumnsConfigStorageService
                    .getColumnsConfig(this.{{ toCamelCase getRelationshipSchema.moduleNames }}GridId, this.origin{{ toPascalCase getRelationshipSchema.moduleNames }}ColumnsConfig)
                    .pipe(takeUntil(this.unsubscribeAll$));

                this.{{ toCamelCase getRelationshipSchema.moduleNames }}GridState = {
                    columnFilters: this.gridFiltersStorageService.getColumnFilterState(this.{{ toCamelCase getRelationshipSchema.moduleNames }}GridId),
                    page         : this.gridStateService.getPage(this.{{ toCamelCase getRelationshipSchema.moduleNames }}GridId),
                    sort         : this.gridStateService.getSort(this.{{ toCamelCase getRelationshipSchema.moduleNames }}GridId),
                    search       : this.gridStateService.getSearchState(this.{{ toCamelCase getRelationshipSchema.moduleNames }}GridId),
                };

                this.{{ toCamelCase getRelationshipSchema.moduleNames }}GridData$ = this.{{ toCamelCase getRelationshipSchema.moduleName }}Service.pagination$;

                // subscription to get {{ toCamelCase getRelationshipSchema.moduleName }} in edit {{ toCamelCase ../schema.moduleName }} action
                this.{{ toCamelCase getRelationshipSchema.moduleName }}Service
                    .{{ toCamelCase getRelationshipSchema.moduleName }}$
                    .pipe(takeUntil(this.unsubscribeAll$))
                    .subscribe(({{ toCamelCase getRelationshipSchema.moduleName }}: {{ getRelationshipSchema.aggregateName }}) =>
                    {
                        if ({{ toCamelCase getRelationshipSchema.moduleName }} && this.currentAction.id === '{{ toCamelCase schema.boundedContextName }}::{{ toCamelCase schema.moduleName }}.detail.edit{{ toPascalCase getRelationshipSchema.moduleName }}')
                        {
                            this.{{ toCamelCase getRelationshipSchema.moduleName }}DialogFg.patchValue({{ toCamelCase getRelationshipSchema.moduleName }});
                        }
                    });
                /* #endregion init actions to manage {{ toCamelCase getRelationshipSchema.moduleNames }} grid-elements-manager */
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
            {{#each schema.aggregateProperties.withGridSelectElementWebComponents}}

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
                            query: action.meta.query ?
                                action.meta.query :
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
                const {{ toCamelCase getRelationshipSchema.moduleName }} = action.meta.row as {{ getRelationshipAggregateName }};

                this.fg.get('{{ toCamelCase getRelationshipSchema.moduleName }}Id').setValue({{ toCamelCase getRelationshipSchema.moduleName }}.id);
                this.fg.get('{{ toCamelCase getRelationshipSchema.moduleName }}Name').setValue({{ toCamelCase getRelationshipSchema.moduleName }}.name);
                this.fg.markAsDirty();

                this.{{ toCamelCase getRelationshipSchema.moduleNames }}Component.closeDialog();
                break;

            case '{{ toCamelCase ../schema.boundedContextName }}::{{ toCamelCase ../schema.moduleName }}.detail.export{{ toPascalCase getRelationshipSchema.moduleNames }}':
                const {{ toCamelCase getRelationshipSchema.moduleName }}Rows = await lastValueFrom(
                    this.{{ toCamelCase getRelationshipSchema.moduleName }}Service
                        .get({
                            query     : action.meta.query,
                            constraint: { /**/ },
                        }),
                );

                const {{ toCamelCase getRelationshipSchema.moduleName }}Columns: string[] = {{ toCamelCase getRelationshipSchema.moduleName }}ColumnsConfig.map({{ toCamelCase getRelationshipSchema.moduleName }}ColumnConfig => {{ toCamelCase getRelationshipSchema.moduleName }}ColumnConfig.field);
                const {{ toCamelCase getRelationshipSchema.moduleName }}Headers = {{ toCamelCase getRelationshipSchema.moduleName }}Columns.map(column => this.translocoService.translate('{{ toCamelCase ../schema.boundedContextName }}.' + column.toPascalCase()));

                exportRows(
                    {{ toCamelCase getRelationshipSchema.moduleName }}Rows.objects,
                    'order{{ toPascalCase getRelationshipSchema.moduleNames }}.' + action.meta.format,
                    {{ toCamelCase getRelationshipSchema.moduleName }}Columns,
                    {{ toCamelCase getRelationshipSchema.moduleName }}Headers,
                    action.meta.format,
                );
                break;
                /* #endregion actions to manage {{ toCamelCase property.getRelationshipSchema.moduleNames }} grid-select-element */
            {{/each}}
            {{#each schema.aggregateProperties.withGridElementsManagerWebComponents}}

            /* #region actions to manage {{ toCamelCase getRelationshipSchema.moduleNames }} grid-elements-manager */
            case '{{ toCamelCase ../schema.boundedContextName }}::{{ toCamelCase ../schema.moduleName }}.detail.{{ toCamelCase getRelationshipSchema.moduleNames }}Pagination':
                await lastValueFrom(
                    this.{{ toCamelCase getRelationshipSchema.moduleName }}Service
                        .pagination({
                            query: action.meta.query ?
                                action.meta.query :
                                QueryStatementHandler
                                    .init({ columnsConfig: {{ toCamelCase getRelationshipSchema.moduleName }}ColumnsConfig })
                                    .setColumFilters(this.gridFiltersStorageService.getColumnFilterState(this.{{ toCamelCase getRelationshipSchema.moduleNames }}GridId))
                                    .setSort(this.gridStateService.getSort(this.{{ toCamelCase getRelationshipSchema.moduleNames }}GridId))
                                    .setPage(this.gridStateService.getPage(this.{{ toCamelCase getRelationshipSchema.moduleNames }}GridId))
                                    .setSearch(this.gridStateService.getSearchState(this.{{ toCamelCase getRelationshipSchema.moduleNames }}GridId))
                                    .getQueryStatement(),
                            constraint: {
                                where: {
                                    {{ getForeignKey (object relationship=relationship schema=../schema) }}: this.managedObject.id,
                                },
                            },
                        }),
                );
                break;

            case '{{ toCamelCase ../schema.boundedContextName }}::{{ toCamelCase ../schema.moduleName }}.detail.new{{ toPascalCase getRelationshipSchema.moduleName }}':
                this.create{{ toPascalCase getRelationshipSchema.moduleName }}DialogForm();
                this.{{ toCamelCase getRelationshipSchema.moduleNames }}Component.handleElementDetailDialog(action.id);
                this.{{ toCamelCase getRelationshipSchema.moduleName }}DialogFg.get('id').setValue(Utils.uuid());
                this.{{ toCamelCase getRelationshipSchema.moduleName }}DialogFg.get('{{ getForeignKey (object relationship=relationship schema=../schema) }}').setValue(this.managedObject.id);
                break;

            case '{{ toCamelCase ../schema.boundedContextName }}::{{ toCamelCase ../schema.moduleName }}.detail.create{{ toPascalCase getRelationshipSchema.moduleName }}':
                await lastValueFrom(
                    this.{{ toCamelCase getRelationshipSchema.moduleName }}Service
                        .create<{{ getRelationshipSchema.aggregateName }}>({
                            object: this.{{ toCamelCase getRelationshipSchema.moduleName }}DialogFg.value,
                        }),
                );

                this.actionService.action({
                    id          : '{{ toCamelCase ../schema.boundedContextName }}::{{ toCamelCase ../schema.moduleName }}.detail.{{ toCamelCase getRelationshipSchema.moduleNames }}Pagination',
                    isViewAction: false,
                });
                break;

            case '{{ toCamelCase ../schema.boundedContextName }}::{{ toCamelCase ../schema.moduleName }}.detail.edit{{ toPascalCase getRelationshipSchema.moduleName }}':
                this.create{{ toPascalCase getRelationshipSchema.moduleName }}DialogForm();
                await lastValueFrom(
                    this.{{ toCamelCase getRelationshipSchema.moduleName }}Service
                        .findById({
                            id        : action.meta.row.id,
                            constraint: {
                                where: {
                                    {{ getForeignKey (object relationship=relationship schema=../schema) }}: this.managedObject.id,
                                },
                            },
                        }),
                );
                this.{{ toCamelCase getRelationshipSchema.moduleNames }}Component.handleElementDetailDialog(action.id);
                break;

            case '{{ toCamelCase ../schema.boundedContextName }}::{{ toCamelCase ../schema.moduleName }}.detail.update{{ toPascalCase getRelationshipSchema.moduleName }}':
                this.{{ toCamelCase getRelationshipSchema.moduleName }}DialogFg.removeControl('{{ getForeignKey (object relationship=relationship schema=../schema) }}');

                await lastValueFrom(
                    this.{{ toCamelCase getRelationshipSchema.moduleName }}Service
                        .updateById<{{ getRelationshipSchema.aggregateName }}>({
                            object: this.{{ toCamelCase getRelationshipSchema.moduleName }}DialogFg.value,
                        }),
                );
                this.actionService.action({
                    id          : '{{ toCamelCase ../schema.boundedContextName }}::{{ toCamelCase ../schema.moduleName }}.detail.{{ toCamelCase getRelationshipSchema.moduleNames }}Pagination',
                    isViewAction: false,
                });
                break;

            case '{{ toCamelCase ../schema.boundedContextName }}::{{ toCamelCase ../schema.moduleName }}.detail.delete{{ toPascalCase getRelationshipSchema.moduleName }}':
                const delete{{ toPascalCase getRelationshipSchema.moduleName }}DialogRef = this.confirmationService.open({
                    title  : `${this.translocoService.translate('Delete')} ${this.translocoService.translate('{{ toCamelCase schema.boundedContextName }}.{{ toPascalCase getRelationshipSchema.moduleName }}')}`,
                    message: this.translocoService.translate('DeletionWarning', { entity: this.translocoService.translate('{{ toCamelCase schema.boundedContextName }}.{{ toPascalCase getRelationshipSchema.moduleName }}') }),
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

                delete{{ toPascalCase getRelationshipSchema.moduleName }}DialogRef
                    .afterClosed()
                    .subscribe(async result =>
                    {
                        if (result === 'confirmed')
                        {
                            try
                            {
                                await lastValueFrom(
                                    this.{{ toCamelCase getRelationshipSchema.moduleName }}Service
                                        .deleteById<{{ getRelationshipSchema.aggregateName }}>({
                                            id: action.meta.row.id,
                                        }),
                                );

                                this.actionService.action({
                                    id          : '{{ toCamelCase ../schema.boundedContextName }}::{{ toCamelCase ../schema.moduleName }}.detail.{{ toCamelCase getRelationshipSchema.moduleNames }}Pagination',
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

            case '{{ toCamelCase ../schema.boundedContextName }}::{{ toCamelCase ../schema.moduleName }}.detail.export{{ toPascalCase getRelationshipSchema.moduleName }}s':
                const {{ toCamelCase getRelationshipSchema.moduleName }}Rows = await lastValueFrom(
                    this.{{ toCamelCase getRelationshipSchema.moduleName }}Service
                        .get({
                            query     : action.meta.query,
                            constraint: {
                                where: {
                                    {{ getForeignKey (object relationship=relationship schema=../schema) }}: this.managedObject.id,
                                },
                            },
                        }),
                );

                const {{ toCamelCase getRelationshipSchema.moduleName }}Columns: string[] = {{ toCamelCase getRelationshipSchema.moduleName }}ColumnsConfig.map({{ toCamelCase getRelationshipSchema.moduleName }}ColumnConfig => {{ toCamelCase getRelationshipSchema.moduleName }}ColumnConfig.field);
                const {{ toCamelCase getRelationshipSchema.moduleName }}Headers = {{ toCamelCase getRelationshipSchema.moduleName }}Columns.map(column => this.translocoService.translate('{{ toCamelCase ../schema.boundedContextName }}.' + column.toPascalCase()));

                exportRows(
                    {{ toCamelCase getRelationshipSchema.moduleName }}Rows.objects,
                    '{{ toCamelCase getRelationshipSchema.moduleNames }}.' + action.meta.format,
                    {{ toCamelCase getRelationshipSchema.moduleName }}Columns,
                    {{ toCamelCase getRelationshipSchema.moduleName }}Headers,
                    action.meta.format,
                );
                break;
                /* #endregion actions to manage {{ toCamelCase getRelationshipSchema.moduleNames }} grid-elements-manager */
            {{/each}}
        }
    }
}
