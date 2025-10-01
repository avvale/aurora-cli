import { ChangeDetectionStrategy, Component, computed, Signal, signal, ViewChild, ViewEncapsulation, WritableSignal } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { IamAccount, IamTag, IamTenant } from '@apps/iam';
import { accountColumnsConfig, AccountService } from '@apps/iam/account';
import { paginateWithTenantConstraintTenantsQuery, TenantService } from '@apps/iam/tenant';
import { MessageMessage, MessageMessageStatus } from '@apps/message';
import { MessageService } from '@apps/message/message';
import { Action, AsyncMatSelectSearchModule, ChipComponent, ColumnConfig, ColumnDataType, Crumb, DatetimepickerSqlFormatDirective, defaultDetailImports, DownloadService, FileUploadComponent, FormatFileSizePipe, GridColumnsConfigStorageService, GridData, GridFiltersStorageService, GridSelectMultipleCellValueDialogTemplateDirective, GridSelectMultipleElementsComponent, GridSelectMultipleElementsModule, GridState, GridStateService, initAsyncMatSelectSearch, initAsyncMatSelectSearchState, JoinPipe, log, manageAsyncMatSelectSearch, mapActions, MapPipe, MatSelectAddSelectedDirective, Operator, queryStatementHandler, SelectionChange, SelectionModel, SelectSearchService, SetValueObjectPipe, SnackBarInvalidFormComponent, SplitButtonModule, uuid, ViewDetailComponent } from '@aurora';
import { MtxDatetimepickerModule } from '@ng-matero/extensions/datetimepicker';
import { EditorComponent, TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';
import { combineLatest, lastValueFrom, Observable, ReplaySubject, skip, startWith, takeUntil } from 'rxjs';
import { GetColorStatusMessagePipe } from '../shared';
import { MatBadgeModule } from '@angular/material/badge';
import { OAuthScope } from '@apps/o-auth';
import { ScopeService } from '@apps/o-auth/scope';
import { TagService } from '@apps/iam/tag';
import { GridSelectMultipleCellValueTemplateDirective } from '@aurora/components/grid-select-multiple-elements/directives/grid-select-multiple-cell-value-template.directive';

export const messageAccountsDialogGridId = 'message::message.detail.accountsDialogGridList';
export const messageAccountsGridId = 'message::message.detail.messageAccountsGridList';
export const messageSelectedAccountsScopePagination = 'message::messageSelectedAccounts';
export const messageAccountsScopeDialogPagination = 'message::messageDialogAccounts';

@Component({
    selector: 'message-message-detail',
    templateUrl: './message-detail.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        ...defaultDetailImports,
        GridSelectMultipleCellValueTemplateDirective,
        AsyncMatSelectSearchModule, ChipComponent, DatetimepickerSqlFormatDirective,
        EditorComponent, FileUploadComponent, FormatFileSizePipe, GetColorStatusMessagePipe,
        GridSelectMultipleCellValueDialogTemplateDirective, JoinPipe, MatBadgeModule,
        MatCheckboxModule, MatSelectAddSelectedDirective, MatSelectModule,
        MtxDatetimepickerModule, GridSelectMultipleElementsModule,
        MapPipe, MatTabsModule, MatTooltipModule, SetValueObjectPipe, SplitButtonModule,
    ],
    providers: [
        {
            provide: TINYMCE_SCRIPT_SRC,
            useValue: 'tinymce/tinymce.min.js',
        },
    ]
})
export class MessageDetailComponent extends ViewDetailComponent
{
    // ---- customizations ----
    scopeRecipientFilterCtrl: FormControl = new FormControl<string>('');
    filteredScopeRecipients$: ReplaySubject<OAuthScope[]> = new ReplaySubject<OAuthScope[]>(1);
    tagRecipientFilterCtrl: FormControl = new FormControl<string>('');
    filteredTagRecipients$: ReplaySubject<IamTag[]> = new ReplaySubject<IamTag[]>(1);
    showTenantsBelongsInput: WritableSignal<boolean> = signal(true);
    totalRecipients: WritableSignal<number> = signal(0);
    status: Signal<string> = computed(() => this.managedObject() ? this.managedObject().status : MessageMessageStatus.DRAFT);
    messageMessageStatus = MessageMessageStatus;

    tinymceLicenseKey: string = 'gpl';
    tinymceApiKey: string = '';

    initEditor: EditorComponent['init'] = {
        base_url: '/tinymce',
        suffix: '.min',
        menubar: false,
        plugins: 'lists link table code', // usa solo plugins OSS
        toolbar: 'undo redo | bold italic | bullist numlist | link table | alignleft aligncenter alignright alignjustify | blockquote | code | removeformat',
        branding: false,
        // placeholder: this.translocoService.translate('message.StartHereToWriteYourMessage'),
    };

    // Object retrieved from the database request,
    // it should only be used to obtain uninitialized
    // data in the form, such as relations, etc.
    // It should not be used habitually, since the source of truth is the form.
    managedObject: WritableSignal<MessageMessage> = signal(null);

    /* #region variables to manage async-search-multiple-select managers and recipients IamTenant[] */
    tenantManagersAsyncMatSelectSearchState = initAsyncMatSelectSearchState<string, IamTenant>();
    tenantRecipientsAsyncMatSelectSearchState = initAsyncMatSelectSearchState<string, IamTenant>();
    tenantAccountRecipientsAsyncMatSelectSearchState = initAsyncMatSelectSearchState<string, IamTenant>();
    tenantDialogAccountRecipientsAsyncMatSelectSearchState = initAsyncMatSelectSearchState<string, IamTenant>();
    tenantAsyncMatSelectSearch = manageAsyncMatSelectSearch({
        columnFilter: {
            id      : uuid(),
            field   : 'IamTenant.name::unaccent',
            type    : ColumnDataType.STRING,
            operator: Operator.iLike,
            value   : null,
        },
        paginationService   : this.tenantService,
        paginationGraphqlStatement: paginateWithTenantConstraintTenantsQuery,
        paginationConstraint: {
            include: [
                {
                    association: 'parent',
                },
            ],
        },
    });
    /* #endregion variables to manage async-search-multiple-select managers and recipients IamTenant[] */

    /* #region variables to manage async-search-multiple-select OAuthScope[] */
    scopeAccountRecipientsAsyncMatSelectSearchState = initAsyncMatSelectSearchState<string, OAuthScope>();
    scopeDialogAccountRecipientsAsyncMatSelectSearchState = initAsyncMatSelectSearchState<string, OAuthScope>();
    scopeManageAsyncMatSelectSearch = manageAsyncMatSelectSearch({
        columnFilter: {
            id      : uuid(),
            field   : 'OAuthScope.name::unaccent',
            type    : ColumnDataType.STRING,
            operator: Operator.iLike,
            value   : null,
        },
        paginationService: this.scopeService,
    });
    /* #endregion variables to manage async-search-multiple-select OAuthScope[] */

    /* #region variables to manage async-search-multiple-select senders account dialog IamTag[] */
    tagAccountRecipientsAsyncMatSelectSearchState = initAsyncMatSelectSearchState<string, IamTag>();
    tagDialogAccountRecipientsAsyncMatSelectSearchState = initAsyncMatSelectSearchState<string, IamTag>();
    tagManageAsyncMatSelectSearch = manageAsyncMatSelectSearch({
        columnFilter: {
            id      : uuid(),
            field   : 'IamTag.name::unaccent',
            type    : ColumnDataType.STRING,
            operator: Operator.iLike,
            value   : null,
        },
        paginationService: this.tagService,
    });
    /* #endregion variables to manage async-search-multiple-select senders account dialog IamTag[] */

    // relationships
    /* #region variables to manage grid-select-multiple-elements messageAccountsGridSelectMultipleElementsComponent */
    // start accounts dialog
    @ViewChild('messageAccountsGridSelectMultipleElements') messageAccountsGridSelectMultipleElementsComponent: GridSelectMultipleElementsComponent;
    accountsDialogSelectedRows: IamAccount[] = [];
    accountsDialogGridId: string = messageAccountsDialogGridId;
    accountsDialogGridData$: Observable<GridData<IamAccount>>;
    accountsDialogColumnsConfig$: Observable<ColumnConfig[]>;
    accountsDialogOriginColumnsConfig: ColumnConfig[] = [
        {
            type   : ColumnDataType.ACTIONS,
            field  : 'Actions',
            sticky : true,
            actions: row =>
            {
                const actions = [];

                if (this.fg.get('accountRecipientIds').value.includes(row.id))
                {
                    actions.push({
                        id          : 'message::message.detail.noAction',
                        isViewAction: false,
                        translation : 'select',
                        icon        : 'done',
                    });
                }
                else
                {
                    actions.push({
                        id          : 'message::message.detail.addMessageAccount',
                        isViewAction: false,
                        translation : 'select',
                        icon        : 'add_link',
                    });
                }

                return actions;
            },
        },
        {
            type       : ColumnDataType.CHECKBOX,
            field      : 'select',
            translation: 'Selects',
            sticky     : true,
        },
        ...accountColumnsConfig({
            translocoService: this.translocoService,
            tenantsAsyncMatSelectSearch: {
                asyncMatSelectSearchState : this.tenantDialogAccountRecipientsAsyncMatSelectSearchState,
                manageAsyncMatSelectSearch: this.tenantAsyncMatSelectSearch,
            },
            scopesAsyncMatSelectSearch: {
                asyncMatSelectSearchState : this.scopeDialogAccountRecipientsAsyncMatSelectSearchState,
                manageAsyncMatSelectSearch: this.scopeManageAsyncMatSelectSearch,
            },
            tagsAsyncMatSelectSearch: {
                asyncMatSelectSearchState : this.tagDialogAccountRecipientsAsyncMatSelectSearchState,
                manageAsyncMatSelectSearch: this.tagManageAsyncMatSelectSearch,
            },
        }),
    ];

    // start message accounts grid
    messageAccountsGridState: GridState = {};
    messageAccountsSelectedRows: IamAccount[] = [];
    messageAccountsGridId: string = messageAccountsGridId;
    messageAccountsGridData$: Observable<GridData<IamAccount>>;
    messageAccountsColumnsConfig$: Observable<ColumnConfig[]>;
    selectedCheckboxRowModel = new SelectionModel<IamAccount>(true, [], true, (a: IamAccount, b: IamAccount) => a.id === b.id);
    originMessageAccountsColumnsConfig: ColumnConfig[] = [
        {
            type   : ColumnDataType.ACTIONS,
            field  : 'actions',
            sticky : true,
            actions: row =>
            {
                const actions = [];

                if (this.managedObject()?.status !== this.messageMessageStatus.SENT)
                {
                    actions.push({
                        id          : 'message::message.detail.removeMessageAccount',
                        isViewAction: false,
                        translation : 'unlink',
                        icon        : 'link_off',
                    });
                }

                return actions;
            },
        },
        {
            type       : ColumnDataType.CHECKBOX,
            field      : 'select',
            translation: 'Selects',
            sticky     : true,
        },
        ...accountColumnsConfig({
            translocoService: this.translocoService,
            tenantsAsyncMatSelectSearch: {
                asyncMatSelectSearchState : this.tenantAccountRecipientsAsyncMatSelectSearchState,
                manageAsyncMatSelectSearch: this.tenantAsyncMatSelectSearch,
            },
            scopesAsyncMatSelectSearch: {
                asyncMatSelectSearchState : this.scopeAccountRecipientsAsyncMatSelectSearchState,
                manageAsyncMatSelectSearch: this.scopeManageAsyncMatSelectSearch,
            },
            tagsAsyncMatSelectSearch: {
                asyncMatSelectSearchState : this.tagAccountRecipientsAsyncMatSelectSearchState,
                manageAsyncMatSelectSearch: this.tagManageAsyncMatSelectSearch,
            },
        }),
    ];
    /* #endregion variables to manage grid-select-multiple-elements accountRecipientIds */

    // breadcrumb component definition
    breadcrumb: Crumb[] = [
        { translation: 'App' },
        { translation: 'message.Messages', routerLink: ['/message/message']},
        { translation: 'message.Message' },
    ];

    constructor(
        private readonly gridColumnsConfigStorageService: GridColumnsConfigStorageService,
        private readonly gridFiltersStorageService: GridFiltersStorageService,
        private readonly gridStateService: GridStateService,
        private readonly messageService: MessageService,
        private readonly selectSearchService: SelectSearchService,
        private readonly accountService: AccountService,
        private readonly downloadService: DownloadService,
        private readonly tenantService: TenantService,
        private readonly scopeService: ScopeService,
        private readonly tagService: TagService,
    )
    {
        super();

        /* #region variables to manage async-search-multiple-select managers IamTenant[] */
        initAsyncMatSelectSearch<string, IamTenant>({
            asyncMatSelectSearchState : this.tenantManagersAsyncMatSelectSearchState,
            manageAsyncMatSelectSearch: this.tenantAsyncMatSelectSearch,
            itemPagination            : this.activatedRoute.snapshot.data.data.iamGetTenants,
            initSelectedItems         : this.activatedRoute.snapshot.data.data.iamGetSelectedTenantManagers,
        });
        /* #endregion variables to manage async-search-multiple-select managers IamTenant[] */

        /* #region variables to manage async-search-multiple-select recipients IamTenant[] */
        initAsyncMatSelectSearch<string, IamTenant>({
            asyncMatSelectSearchState : this.tenantRecipientsAsyncMatSelectSearchState,
            manageAsyncMatSelectSearch: this.tenantAsyncMatSelectSearch,
            itemPagination            : this.activatedRoute.snapshot.data.data.iamGetTenants,
            initSelectedItems         : this.activatedRoute.snapshot.data.data.iamGetSelectedTenantRecipients,
        });
        /* #endregion variables to manage async-search-multiple-select recipients IamTenant[] */

        /* #region variables to manage async-search-multiple-select account recipients IamTenant[] */
        initAsyncMatSelectSearch<string, IamTenant>({
            asyncMatSelectSearchState : this.tenantAccountRecipientsAsyncMatSelectSearchState,
            manageAsyncMatSelectSearch: this.tenantAsyncMatSelectSearch,
            itemPagination            : this.activatedRoute.snapshot.data.data.iamGetTenants,
            initSelectedItems         : this.activatedRoute.snapshot.data.data.iamGetSelectedTenantsAccount,
        });
        /* #endregion variables to manage async-search-multiple-select account recipients IamTenant[] */

        /* #region variables to manage async-search-multiple-select dialog account recipients IamTenant[] */
        initAsyncMatSelectSearch<string, IamTenant>({
            asyncMatSelectSearchState : this.tenantDialogAccountRecipientsAsyncMatSelectSearchState,
            manageAsyncMatSelectSearch: this.tenantAsyncMatSelectSearch,
            itemPagination            : this.activatedRoute.snapshot.data.data.iamGetTenants,
            initSelectedItems         : this.activatedRoute.snapshot.data.data.iamGetSelectedTenantsDialogAccount,
        });
        /* #endregion variables to manage async-search-multiple-select dialog account recipients IamTenant[] */

        /* #region variables to manage async-search-multiple-select account recipients oAuthScope[] */
        initAsyncMatSelectSearch<string, OAuthScope>({
            asyncMatSelectSearchState : this.scopeAccountRecipientsAsyncMatSelectSearchState,
            manageAsyncMatSelectSearch: this.scopeManageAsyncMatSelectSearch,
            itemPagination            : this.activatedRoute.snapshot.data.data.oAuthGetScopes,
            initSelectedItems         : this.activatedRoute.snapshot.data.data.oAuthGetSelectedScopesAccount,
            indexKey                  : 'code',
            valueKey                  : 'code',
        });
        /* #endregion variables to manage async-search-multiple-select account recipients oAuthScope[] */

         /* #region variables to manage async-search-multiple-select dialog account recipients oAuthScope[] */
        initAsyncMatSelectSearch<string, OAuthScope>({
            asyncMatSelectSearchState : this.scopeDialogAccountRecipientsAsyncMatSelectSearchState,
            manageAsyncMatSelectSearch: this.scopeManageAsyncMatSelectSearch,
            itemPagination            : this.activatedRoute.snapshot.data.data.oAuthGetScopes,
            initSelectedItems         : this.activatedRoute.snapshot.data.data.oAuthGetSelectedScopesDialogAccount,
            indexKey                  : 'code',
            valueKey                  : 'code',
        });
        /* #endregion variables to manage async-search-multiple-select dialog account recipients oAuthScope[] */

        /* #region variables to manage async-search-multiple-select account recipients IamTag[] */
        initAsyncMatSelectSearch<string, IamTag>({
            asyncMatSelectSearchState : this.tagAccountRecipientsAsyncMatSelectSearchState,
            manageAsyncMatSelectSearch: this.tagManageAsyncMatSelectSearch,
            itemPagination            : this.activatedRoute.snapshot.data.data.iamGetTags,
            initSelectedItems         : this.activatedRoute.snapshot.data.data.iamGetSelectedTagsAccount,
            indexKey                  : 'name',
            valueKey                  : 'name',
        });
        /* #endregion variables to manage async-search-multiple-select account recipients IamTag[] */

        /* #region variables to manage async-search-multiple-select dialog account recipients IamTag[] */
        initAsyncMatSelectSearch<string, IamTag>({
            asyncMatSelectSearchState : this.tagDialogAccountRecipientsAsyncMatSelectSearchState,
            manageAsyncMatSelectSearch: this.tagManageAsyncMatSelectSearch,
            itemPagination            : this.activatedRoute.snapshot.data.data.iamGetTags,
            initSelectedItems         : this.activatedRoute.snapshot.data.data.iamGetSelectedTagsDialogAccount,
            indexKey                  : 'name',
            valueKey                  : 'name',
        });
        /* #endregion variables to manage async-search-multiple-select dialog account recipients IamTag[] */
    }

    // this method will be called after the ngOnInit of
    // the parent class you can use instead of ngOnInit
    init(): void
    {
        // tenants
        this.initScopeRecipientsFilter(this.activatedRoute.snapshot.data.data.oAuthGetScopes);
        this.initTagRecipientsFilter(this.activatedRoute.snapshot.data.data.iamGetTags);

        combineLatest([
            this.fg.get('tenantRecipientIds').valueChanges.pipe(startWith([])),
            this.fg.get('scopeRecipients').valueChanges.pipe(startWith([])),
            this.fg.get('tagRecipients').valueChanges.pipe(startWith([])),
            this.fg.get('accountRecipientIds').valueChanges.pipe(startWith([])),
        ])
            .pipe(
                takeUntil(this.unsubscribeAll$),
                skip(1),
            )
            .subscribe(([tenantRecipientIds, scopeRecipients, tagRecipients, accountRecipientIds]) =>
            {
                this.actionService
                    .action({
                        id          : 'message::message.detail.countTotalRecipients',
                        isViewAction: false,
                        meta        : {
                            tenantRecipientIds,
                            scopeRecipients,
                            tagRecipients,
                            accountRecipientIds,
                        },
                    });
            });
    }

    initScopeRecipientsFilter(scopes: OAuthScope[]): void
    {
        // init select filter with all items
        this.filteredScopeRecipients$.next(scopes);

        // listen for scope search field value changes
        this.scopeRecipientFilterCtrl
            .valueChanges
            .pipe(takeUntil(this.unsubscribeAll$))
            .subscribe(async () =>
            {
                this.selectSearchService
                    .filterSelect<OAuthScope>(
                        this.scopeRecipientFilterCtrl,
                        scopes,
                        this.filteredScopeRecipients$,
                    );
            });
    }

    initTagRecipientsFilter(tags: IamTag[]): void
    {
        // init select filter with all items
        this.filteredTagRecipients$.next(tags);

        // listen for tag search field value changes
        this.tagRecipientFilterCtrl
            .valueChanges
            .pipe(takeUntil(this.unsubscribeAll$))
            .subscribe(async () =>
            {
                this.selectSearchService
                    .filterSelect<IamTag>(
                        this.tagRecipientFilterCtrl,
                        tags,
                        this.filteredTagRecipients$,
                    );
            });
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

            this.snackBar.openFromComponent(
                SnackBarInvalidFormComponent,
                {
                    data: {
                        message   : `${this.translocoService.translate('InvalidForm')}`,
                        textButton: `${this.translocoService.translate('InvalidFormOk')}`,
                    },
                    panelClass      : 'error-snackbar',
                    verticalPosition: 'top',
                    duration        : 10000,
                },
            );
            return;
        }

        this.actionService.action({
            id: mapActions(
                this.currentViewAction.id,
                {
                    'message::message.detail.new' : 'message::message.detail.create',
                    'message::message.detail.edit': 'message::message.detail.update',
                },
            ),
            isViewAction: false,
        });
    }

    createForm(): void
    {
        /* eslint-disable key-spacing */
        this.fg = this.fb.group({
            id: ['', [Validators.required, Validators.minLength(36), Validators.maxLength(36)]],
            tenantIds: [[], [Validators.required]],
            accountRecipientIds: [[]],
            tenantRecipientIds: [[]],
            scopeRecipients: [[]],
            tagRecipients: [[]],
            sendAt: null,
            isImportant: [false, [Validators.required]],
            subject: ['', [Validators.required, Validators.maxLength(255)]],
            body: ['', [Validators.required]],
            link: ['', [Validators.maxLength(2046)]],
            isInternalLink: false,
            image: null,
            icon: ['', [Validators.maxLength(64)]],
            attachmentsInputFile: [[]],
        });
        /* eslint-enable key-spacing */
    }

    /* #region methods to manage Message Accounts grid */
    handleAccountsRowsSectionChange($event: SelectionChange<IamAccount>): void
    {
        this.messageAccountsSelectedRows = $event.source.selected;
    }

    handleRemoveMessageAccountsSelected(): void
    {
        if (this.messageAccountsSelectedRows.length > 0)
        {
            this.actionService.action({
                id          : 'message::message.detail.removeMessageAccounts',
                isViewAction: false,
                meta        : {
                    rows: this.messageAccountsSelectedRows,
                },
            });
        }
    }
    /* #endregion methods to manage Message Accounts  grid */

    /* #region methods to manage Accounts dialog */
    handleOpenAccountsDialog(): void
    {
        this.actionService.action({
            id          : 'message::message.detail.messageAccountsDialogPagination',
            isViewAction: false,
            meta        : {
                query: queryStatementHandler({ columnsConfig: accountColumnsConfig() })
                    .setColumFilters(this.gridFiltersStorageService.getColumnFilterState(this.accountsDialogGridId))
                    .setSort(this.gridStateService.getSort(this.accountsDialogGridId))
                    .setPage(this.gridStateService.getPage(this.accountsDialogGridId))
                    .setSearch(this.gridStateService.getSearchState(this.accountsDialogGridId))
                    .getQueryStatement(),
            },
            afterRunAction: (action: Action) =>
            {
                this.gridStateService.setPaginationActionId(this.accountsDialogGridId, 'message::message.detail.messageAccountsDialogPagination');
                this.gridStateService.setExportActionId(this.accountsDialogGridId, 'message::message.detail.exportMessageAccountsDialog');
                this.messageAccountsGridSelectMultipleElementsComponent.handleElementsDialog({
                    data: {
                        gridId   : this.accountsDialogGridId,
                        gridState: {
                            columnFilters: this.gridFiltersStorageService.getColumnFilterState(this.accountsDialogGridId),
                            page         : this.gridStateService.getPage(this.accountsDialogGridId),
                            sort         : this.gridStateService.getSort(this.accountsDialogGridId),
                            search       : this.gridStateService.getSearchState(this.accountsDialogGridId),
                        },
                    },
                });
            },
        });
    }

    handleAccountsDialogRowsSectionChange($event: SelectionChange<IamAccount>): void
    {
        this.accountsDialogSelectedRows = $event.source.selected;
    }

    handleAddAccountsSelected(): void
    {
        if (this.accountsDialogSelectedRows.length > 0)
        {
            this.actionService.action({
                id          : 'message::message.detail.addMessageAccounts',
                isViewAction: false,
                meta        : {
                    rows: this.accountsDialogSelectedRows,
                },
            });

            this.messageAccountsGridSelectMultipleElementsComponent.elementsDialogRef.close();
        }
    }
    /* #endregion methods to manage Accounts dialog */

    async handleAction(action: Action): Promise<void>
    {
        // add optional chaining (?.) to avoid first call where behaviour subject is undefined
        switch (action?.id)
        {
            /* #region common actions */
            case 'message::message.detail.new':
                this.fg.get('id').setValue(uuid());

                /* #region new action to manage MessagesAccounts grid-select-multiple-elements */
                // permissions grid
                this.messageAccountsColumnsConfig$ = this.gridColumnsConfigStorageService
                    .getColumnsConfig(this.messageAccountsGridId, this.originMessageAccountsColumnsConfig)
                    .pipe(takeUntil(this.unsubscribeAll$));

                this.messageAccountsGridState = {
                    columnFilters: this.gridFiltersStorageService.getColumnFilterState(this.messageAccountsGridId),
                    page         : this.gridStateService.getPage(this.messageAccountsGridId),
                    sort         : this.gridStateService.getSort(this.messageAccountsGridId),
                    search       : this.gridStateService.getSearchState(this.messageAccountsGridId),
                };

                this.messageAccountsGridData$ = this.accountService.getScopePagination(messageSelectedAccountsScopePagination);

                // account dialog grid
                this.accountsDialogColumnsConfig$ = this.gridColumnsConfigStorageService
                    .getColumnsConfig(this.accountsDialogGridId, this.accountsDialogOriginColumnsConfig)
                    .pipe(takeUntil(this.unsubscribeAll$));
                this.accountsDialogGridData$ = this.accountService.getScopePagination(messageAccountsScopeDialogPagination);
                /* #endregion edit action to manage MessagesAccounts grid-select-multiple-elements */
                break;

            case 'message::message.detail.edit':
                this.messageService
                    .message$
                    .pipe(takeUntil(this.unsubscribeAll$))
                    .subscribe(item =>
                    {
                        this.fg.patchValue(item);
                        this.managedObject.set(item);
                        this.totalRecipients.set(item.totalRecipients);

                        if (item.status === this.messageMessageStatus.SENT)
                        {
                            this.fg.disable();
                        }
                    });

                /* #region edit action to manage MessagesAccounts grid-select-multiple-elements */
                // permissions grid
                this.messageAccountsColumnsConfig$ = this.gridColumnsConfigStorageService
                    .getColumnsConfig(this.messageAccountsGridId, this.originMessageAccountsColumnsConfig)
                    .pipe(takeUntil(this.unsubscribeAll$));

                this.messageAccountsGridState = {
                    columnFilters: this.gridFiltersStorageService.getColumnFilterState(this.messageAccountsGridId),
                    page         : this.gridStateService.getPage(this.messageAccountsGridId),
                    sort         : this.gridStateService.getSort(this.messageAccountsGridId),
                    search       : this.gridStateService.getSearchState(this.messageAccountsGridId),
                };

                this.messageAccountsGridData$ = this.accountService.getScopePagination(messageSelectedAccountsScopePagination);

                // account dialog grid
                this.accountsDialogColumnsConfig$ = this.gridColumnsConfigStorageService
                    .getColumnsConfig(this.accountsDialogGridId, this.accountsDialogOriginColumnsConfig)
                    .pipe(takeUntil(this.unsubscribeAll$));
                this.accountsDialogGridData$ = this.accountService.getScopePagination(messageAccountsScopeDialogPagination);
                /* #endregion edit action to manage MessagesAccounts grid-select-multiple-elements */
                break;

            case 'message::message.detail.create':
                try
                {
                    await lastValueFrom(
                        this.messageService
                            .create<MessageMessage>({
                                object: {
                                    ...this.fg.value,
                                    totalRecipients: undefined,
                                    reads          : undefined,
                                },
                                headers: {
                                    'Apollo-Require-Preflight': 'true',
                                },
                            }),
                    );

                    this.snackBar.open(
                        `${this.translocoService.translate('message.Message')} ${this.translocoService.translate('Created.M')}`,
                        undefined,
                        {
                            verticalPosition: 'top',
                            duration        : 3000,
                        },
                    );

                    this.unsubscribeAll$.next();
                    this.router.navigate(['message/message/edit', this.fg.value.id]);
                }
                catch(error)
                {
                    log(`[DEBUG] Catch error in ${action.id} action: ${error}`);
                }
                break;

            case 'message::message.detail.update':
                try
                {
                    await lastValueFrom(
                        this.messageService
                            .updateById<MessageMessage>({
                                object: {
                                    ...this.fg.value,
                                    totalRecipients: undefined,
                                    reads          : undefined,
                                },
                                headers: {
                                    'Apollo-Require-Preflight': 'true',
                                },
                            }),
                    );

                    this.snackBar.open(
                        `${this.translocoService.translate('message.Message')} ${this.translocoService.translate('Saved.M')}`,
                        undefined,
                        {
                            verticalPosition: 'top',
                            duration        : 3000,
                        },
                    );

                    this.unsubscribeAll$.next();
                    this.fg.markAsPristine();
                    this.router.navigate(['message/message/edit', this.fg.value.id], { onSameUrlNavigation: 'reload' });
                }
                catch(error)
                {
                    log(`[DEBUG] Catch error in ${action.id} action: ${error}`);
                }
                break;
                /* #endregion common actions */

            /* #region actions to manage Message Accounts grid-select-multiple-elements */
            case 'message::message.detail.messageAccountsPagination':
                await lastValueFrom(
                    this.accountService
                        .pagination({
                            query: action.meta.query ?
                                action.meta.query :
                                queryStatementHandler({ columnsConfig: accountColumnsConfig() })
                                    .setColumFilters(this.gridFiltersStorageService.getColumnFilterState(this.messageAccountsGridId))
                                    .setSort(this.gridStateService.getSort(this.messageAccountsGridId))
                                    .setPage(this.gridStateService.getPage(this.messageAccountsGridId))
                                    .setSearch(this.gridStateService.getSearchState(this.messageAccountsGridId))
                                    .getQueryStatement(),
                            constraint: {
                                where: {
                                    id: this.fg.get('accountRecipientIds').value,
                                },
                                include: [
                                    {
                                        association: 'user',
                                        required   : true,
                                    },
                                    {
                                        association: 'tenants',
                                    },
                                ],
                                distinct: true,
                            },
                            scope: messageSelectedAccountsScopePagination,
                        }),
                );
                break;

            case 'message::message.detail.addMessageAccount':
                const accountRecipientIdAdded = new Set<string>([...this.fg.get('accountRecipientIds').value, action.meta.row.id]);
                this.fg.get('accountRecipientIds').setValue([...accountRecipientIdAdded]);
                this.fg.markAsDirty();

                this.actionService.action({
                    id          : 'message::message.detail.messageAccountsPagination',
                    isViewAction: false,
                });

                this.actionService.action({
                    id          : 'message::message.detail.messageAccountsDialogPagination',
                    isViewAction: false,
                });

                this.snackBar.open(
                    `${this.translocoService.translate('message.Account')} ${this.translocoService.translate('Saved.F')}`,
                    undefined,
                    {
                        verticalPosition: 'top',
                        duration        : 3000,
                    },
                );
                break;

            case 'message::message.detail.addMessageAccounts':
                const rowIds = action.meta.rows.map(row => row.id);
                const accountRecipientIdsAdded = new Set<string>([...this.fg.get('accountRecipientIds').value, ...rowIds]);
                this.fg.get('accountRecipientIds').setValue([...accountRecipientIdsAdded]);
                this.fg.markAsDirty();

                this.actionService.action({
                    id          : 'message::message.detail.messageAccountsPagination',
                    isViewAction: false,
                });

                this.actionService.action({
                    id          : 'message::message.detail.messageAccountsDialogPagination',
                    isViewAction: false,
                });

                this.snackBar.open(
                    `${this.translocoService.translate('message.Accounts')} ${this.translocoService.translate('Saved.F.P')}`,
                    undefined,
                    {
                        verticalPosition: 'top',
                        duration        : 3000,
                    },
                );
                break;

            case 'message::message.detail.removeMessageAccount':
                const accountRecipientIdRemoved = new Set<string>(this.fg.get('accountRecipientIds').value);
                accountRecipientIdRemoved.delete(action.meta.row.id);
                this.fg.get('accountRecipientIds').setValue([...accountRecipientIdRemoved]);
                this.fg.markAsDirty();

                this.actionService.action({
                    id          : 'message::message.detail.messageAccountsPagination',
                    isViewAction: false,
                });

                this.actionService.action({
                    id          : 'message::message.detail.messageAccountsDialogPagination',
                    isViewAction: false,
                });

                this.snackBar.open(
                    `${this.translocoService.translate('message.Account')} ${this.translocoService.translate('Deleted.F')}`,
                    undefined,
                    {
                        verticalPosition: 'top',
                        duration        : 3000,
                    },
                );
                break;

            case 'message::message.detail.removeMessageAccounts':
                const accountRecipientIdsRemoved = new Set<string>(this.fg.get('accountRecipientIds').value);
                action.meta.rows.forEach(row => accountRecipientIdsRemoved.delete(row.id));
                this.fg.get('accountRecipientIds').setValue([...accountRecipientIdsRemoved]);
                this.fg.markAsDirty();

                this.selectedCheckboxRowModel.clear();

                this.actionService.action({
                    id          : 'message::message.detail.messageAccountsPagination',
                    isViewAction: false,
                });

                this.actionService.action({
                    id          : 'message::message.detail.messageAccountsDialogPagination',
                    isViewAction: false,
                });

                this.snackBar.open(
                    `${this.translocoService.translate('iam.Permissions')} ${this.translocoService.translate('Deleted.M.P')}`,
                    undefined,
                    {
                        verticalPosition: 'top',
                        duration        : 3000,
                    },
                );
                break;
                /* #endregion actions to manage Message Accounts grid-select-multiple-elements */

            /* #region actions to manage Accounts grid-select-multiple-elements dialog */
            case 'message::message.detail.messageAccountsDialogPagination':
                await lastValueFrom(
                    this.accountService
                        .paginationWithRelations({
                            query: action.meta.query ?
                                action.meta.query :
                                queryStatementHandler({ columnsConfig: accountColumnsConfig() })
                                    .setColumFilters(this.gridFiltersStorageService.getColumnFilterState(this.accountsDialogGridId))
                                    .setSort(this.gridStateService.getSort(this.accountsDialogGridId))
                                    .setPage(this.gridStateService.getPage(this.accountsDialogGridId))
                                    .setSearch(this.gridStateService.getSearchState(this.accountsDialogGridId))
                                    .getQueryStatement(),
                            constraint: {
                                include: [
                                    {
                                        association: 'user',
                                        required   : true,
                                    },
                                    {
                                        association: 'tenants',
                                    },
                                ],
                                distinct: true,
                            },
                            queryGetTenants: queryStatementHandler()
                                .setPage({ pageIndex: 0, pageSize: 10 })
                                .getQueryStatement(),
                            queryGetSelectedTenants: {
                                where: {
                                    id: this.gridFiltersStorageService
                                        .getColumnFilter(this.accountsDialogGridId, 'tenants')?.value
                                        || [],
                                },
                            },
                            queryGetScopes: queryStatementHandler()
                                .setPage({ pageIndex: 0, pageSize: 10 })
                                .getQueryStatement(),
                            queryGetSelectedScopes: {
                                where: {
                                    code: this.gridFiltersStorageService
                                        .getColumnFilter(this.accountsDialogGridId, 'scopes')?.value
                                        || [],
                                },
                            },
                            queryGetTags: queryStatementHandler()
                                .setPage({ pageIndex: 0, pageSize: 10 })
                                .getQueryStatement(),
                            queryGetSelectedTags: {
                                where: {
                                    name: this.gridFiltersStorageService
                                        .getColumnFilter(this.accountsDialogGridId, 'tags')?.value
                                        || [],
                                },
                            },
                            scope: messageAccountsScopeDialogPagination,
                        }),
                );
                break;
                /* #endregion actions to manage Accounts grid-select-multiple-elements dialog */

            /* #region actions to manage attachments */
            case 'message::message.detail.addAttachment':
                if (action.meta.files.length === 0) return;

                for (const file of action.meta.files)
                {
                    const fileEntry = file.fileEntry as FileSystemFileEntry;
                    fileEntry.file((file: File) =>
                    {
                        this.fg
                            .get('attachmentsInputFile')
                            .setValue([
                                ...this.fg.get('attachmentsInputFile').value,
                                file,
                            ]);
                    });
                }

                this.fg.markAsDirty();
                break;

            case 'message::message.detail.removeAttachment':
                if (action.meta.message)
                {
                    await lastValueFrom(
                        this.messageService
                            .removeAttachmentMessage<MessageMessage>({
                                message: {
                                    id       : action.meta.message.id,
                                    tenantIds: action.meta.message.tenantIds,
                                },
                                attachmentId: action.meta.attachment.id,
                            }),
                    );

                    this.actionService.action({
                        id          : 'message::message.detail.refresh',
                        isViewAction: false,
                        meta        : {
                            message: action.meta.message,
                        },
                    });

                }
                else
                {
                    this.fg
                        .get('attachmentsInputFile')
                        .setValue(this.fg.get('attachmentsInputFile').value.filter((attachment, index) => index !== action.meta.index));
                }
                break;

            case 'message::message.detail.downloadAttachment':
                if (action.meta.attachment instanceof File)
                {
                    this.downloadService.downloadTempFile(action.meta.attachment);
                }
                else
                {
                    this.downloadService
                        .download({
                            relativePathSegments: action.meta.attachment.relativePathSegments,
                            filename            : action.meta.attachment.filename,
                            originFilename      : action.meta.attachment.originFilename,
                        });
                }
                break;

            case 'message::message.detail.refresh':
                await lastValueFrom(
                    this.messageService
                        .findById({
                            id: action.meta.message.id,
                        }),
                );
                break;
                /* #endregion actions to manage attachments */

            case 'message::message.detail.countTotalRecipients':
                const response = await lastValueFrom(
                    this.messageService
                        .countTotalRecipientsMessage({
                            tenantRecipientIds : action.meta.tenantRecipientIds.length === 0 ? undefined : action.meta.tenantRecipientIds,
                            scopeRecipients    : action.meta.scopeRecipients.length === 0 ? undefined : action.meta.scopeRecipients,
                            tagRecipients      : action.meta.tagRecipients.length === 0 ? undefined : action.meta.tagRecipients,
                            accountRecipientIds: action.meta.accountRecipientIds.length === 0 ? undefined : action.meta.accountRecipientIds,
                        }),
                );
                this.totalRecipients.set(response.messageCountTotalRecipientsMessage);
                break;

            case 'message::message.detail.sendMessage':
                await lastValueFrom(
                    this.messageService
                        .sendMessageMessage({
                            message: {
                                id       : action.meta.message.id,
                                tenantIds: action.meta.message.tenantIds,
                            },
                        }),
                );
                this.managedObject.set({ ...this.managedObject(), status: MessageMessageStatus.PENDING });
                break;

            case 'message::message.detail.draftMessage':
                await lastValueFrom(
                    this.messageService
                        .draftMessageMessage({
                            message: {
                                id       : action.meta.message.id,
                                tenantIds: action.meta.message.tenantIds,
                            },
                        }),
                );
                this.managedObject.set({ ...this.managedObject(), status: MessageMessageStatus.DRAFT });
                break;
        }
    }
}
