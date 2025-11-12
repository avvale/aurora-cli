import {
    ChangeDetectionStrategy,
    Component,
    ViewEncapsulation,
} from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTooltipModule } from '@angular/material/tooltip';
import { accountColumnsConfig, AccountService } from '@apps/iam/account';
import { IamAccount, IamTag, IamTenant } from '@apps/iam/iam.types';
import { OAuthScope } from '@apps/o-auth';
import { ScopeService } from '@apps/o-auth/scope';
import {
    Action,
    AuthenticationService,
    AuthorizationService,
    ColumnConfig,
    ColumnDataType,
    Crumb,
    defaultListImports,
    exportRows,
    GridColumnsConfigStorageService,
    GridData,
    GridFiltersStorageService,
    GridState,
    GridStateService,
    initAsyncMatSelectSearch,
    initAsyncMatSelectSearchState,
    JoinPipe,
    log,
    manageAsyncMatSelectSearch,
    MapPipe,
    Operator,
    queryStatementHandler,
    uuid,
    ViewBaseComponent,
} from '@aurora';
import { lastValueFrom, Observable, takeUntil } from 'rxjs';
import { TagService } from '../tag';
import { TenantService } from '../tenant';

export const accountMainGridListId = 'iam::account.list.mainGridList';

@Component({
    selector: 'iam-account-list',
    templateUrl: './account-list.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        ...defaultListImports,
        JoinPipe,
        MapPipe,
        MatBadgeModule,
        MatTooltipModule,
    ],
})
export class AccountListComponent extends ViewBaseComponent {
    // ---- customizations ----
    /* #region variables to manage async-search-multiple-select account IamTenant[] */
    tenantAsyncMatSelectSearchState = initAsyncMatSelectSearchState<
        string,
        IamTenant
    >();
    tenantManageAsyncMatSelectSearch = manageAsyncMatSelectSearch({
        columnFilter: {
            id: uuid(),
            field: 'IamTenant.name::unaccent',
            type: ColumnDataType.STRING,
            operator: Operator.iLike,
            value: null,
        },
        paginationService: this.tenantService,
    });
    /* #endregion variables to manage async-search-multiple-select account IamTenant[] */

    /* #region variables to manage async-search-multiple-select account OAuthScope[] */
    scopeAsyncMatSelectSearchState = initAsyncMatSelectSearchState<
        string,
        OAuthScope
    >();
    scopeManageAsyncMatSelectSearch = manageAsyncMatSelectSearch({
        columnFilter: {
            id: uuid(),
            field: 'OAuthScope.name::unaccent',
            type: ColumnDataType.STRING,
            operator: Operator.iLike,
            value: null,
        },
        paginationService: this.scopeService,
    });
    /* #endregion variables to manage async-search-multiple-select account OAuthScope[] */

    /* #region variables to manage async-search-multiple-select account IamTag[] */
    tagAsyncMatSelectSearchState = initAsyncMatSelectSearchState<
        string,
        IamTag
    >();
    tagManageAsyncMatSelectSearch = manageAsyncMatSelectSearch({
        columnFilter: {
            id: uuid(),
            field: 'IamTag.name::unaccent',
            type: ColumnDataType.STRING,
            operator: Operator.iLike,
            value: null,
        },
        paginationService: this.tagService,
    });
    /* #endregion variables to manage async-search-multiple-select account IamTag[] */

    breadcrumb: Crumb[] = [
        { translation: 'App', routerLink: ['/'] },
        { translation: 'iam.Accounts' },
    ];
    gridId: string = accountMainGridListId;
    gridData$: Observable<GridData<IamAccount>>;
    gridState: GridState = {};
    columnsConfig$: Observable<ColumnConfig[]>;
    originColumnsConfig: ColumnConfig[] = [
        {
            type: ColumnDataType.ACTIONS,
            field: 'Actions',
            sticky: true,
            actions: (row) => {
                const actions = [];

                actions.push(
                    {
                        id: 'iam::account.list.edit',
                        translation: 'edit',
                        icon: 'mode_edit',
                    },
                    {
                        id: 'iam::account.list.delete',
                        translation: 'delete',
                        icon: 'delete',
                    },
                );

                if (
                    this.authorizationService.can(
                        'oAuth.credential.impersonalize',
                    )
                ) {
                    actions.push({
                        id: 'iam::account.list.impersonalize',
                        isViewAction: false,
                        translation: 'impersonalize',
                        iconFontSet: 'material-symbols-outlined',
                        icon: 'photo_auto_merge',
                    });
                }

                return actions;
            },
        },
        {
            type: ColumnDataType.CHECKBOX,
            field: 'select',
            translation: 'Selects',
            sticky: true,
        },
        ...accountColumnsConfig({
            translocoService: this.translocoService,
            tenantsAsyncMatSelectSearch: {
                asyncMatSelectSearchState: this.tenantAsyncMatSelectSearchState,
                manageAsyncMatSelectSearch:
                    this.tenantManageAsyncMatSelectSearch,
            },
            scopesAsyncMatSelectSearch: {
                asyncMatSelectSearchState: this.scopeAsyncMatSelectSearchState,
                manageAsyncMatSelectSearch:
                    this.scopeManageAsyncMatSelectSearch,
            },
            tagsAsyncMatSelectSearch: {
                asyncMatSelectSearchState: this.tagAsyncMatSelectSearchState,
                manageAsyncMatSelectSearch: this.tagManageAsyncMatSelectSearch,
            },
        }),
    ];

    constructor(
        private readonly gridColumnsConfigStorageService: GridColumnsConfigStorageService,
        private readonly gridFiltersStorageService: GridFiltersStorageService,
        private readonly gridStateService: GridStateService,
        private readonly accountService: AccountService,
        private readonly authenticationService: AuthenticationService,
        private readonly authorizationService: AuthorizationService,
        private readonly tenantService: TenantService,
        private readonly scopeService: ScopeService,
        private readonly tagService: TagService,
    ) {
        super();

        /* #region variables to manage async-search-multiple-select IamTenant[] */
        initAsyncMatSelectSearch<string, IamTenant>({
            asyncMatSelectSearchState: this.tenantAsyncMatSelectSearchState,
            manageAsyncMatSelectSearch: this.tenantManageAsyncMatSelectSearch,
            itemPagination:
                this.activatedRoute.snapshot.data.data.iamGetTenants,
            initSelectedItems:
                this.activatedRoute.snapshot.data.data.iamGetSelectedTenants,
        });
        /* #endregion variables to manage async-search-multiple-select IamTenant[] */

        /* #region variables to manage async-search-multiple-select OAuthScope[] */
        initAsyncMatSelectSearch<string, OAuthScope>({
            asyncMatSelectSearchState: this.scopeAsyncMatSelectSearchState,
            manageAsyncMatSelectSearch: this.scopeManageAsyncMatSelectSearch,
            itemPagination:
                this.activatedRoute.snapshot.data.data.oAuthGetScopes,
            initSelectedItems:
                this.activatedRoute.snapshot.data.data.oAuthGetSelectedScopes,
            valueKey: 'code',
        });
        /* #endregion variables to manage async-search-multiple-select OAuthScope[] */

        /* #region variables to manage async-search-multiple-select IamTag[] */
        initAsyncMatSelectSearch<string, IamTag>({
            asyncMatSelectSearchState: this.tagAsyncMatSelectSearchState,
            manageAsyncMatSelectSearch: this.tagManageAsyncMatSelectSearch,
            itemPagination: this.activatedRoute.snapshot.data.data.iamGetTags,
            initSelectedItems:
                this.activatedRoute.snapshot.data.data.iamGetSelectedTags,
            valueKey: 'name',
        });
        /* #endregion variables to manage async-search-multiple-select IamTag[] */
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
            case 'iam::account.list.view':
                this.columnsConfig$ = this.gridColumnsConfigStorageService
                    .getColumnsConfig(this.gridId, this.originColumnsConfig)
                    .pipe(takeUntil(this.unsubscribeAll$));

                this.gridState = {
                    columnFilters:
                        this.gridFiltersStorageService.getColumnFilterState(
                            this.gridId,
                        ),
                    page: this.gridStateService.getPage(this.gridId),
                    sort: this.gridStateService.getSort(this.gridId),
                    search: this.gridStateService.getSearchState(this.gridId),
                };

                this.gridData$ = this.accountService.pagination$;
                break;

            case 'iam::account.list.pagination':
                await lastValueFrom(
                    this.accountService.pagination({
                        query: action.meta.query
                            ? action.meta.query
                            : queryStatementHandler({
                                  columnsConfig: accountColumnsConfig(),
                              })
                                  .setColumFilters(
                                      this.gridFiltersStorageService.getColumnFilterState(
                                          this.gridId,
                                      ),
                                  )
                                  .setSort(
                                      this.gridStateService.getSort(
                                          this.gridId,
                                      ),
                                  )
                                  .setPage(
                                      this.gridStateService.getPage(
                                          this.gridId,
                                      ),
                                  )
                                  .setSearch(
                                      this.gridStateService.getSearchState(
                                          this.gridId,
                                      ),
                                  )
                                  .getQueryStatement(),
                        constraint: {
                            include: [
                                {
                                    association: 'user',
                                    required: true,
                                },
                                {
                                    association: 'tenants',
                                },
                            ],
                        },
                    }),
                );
                break;

            case 'iam::account.list.edit':
                this.router.navigate(['iam/account/edit', action.meta.row.id]);
                break;

            case 'iam::account.list.delete':
                const deleteDialogRef = this.confirmationService.open({
                    title: `${this.translocoService.translate('Delete')} ${this.translocoService.translate('iam.Account')}`,
                    message: this.translocoService.translate(
                        'DeletionWarning',
                        {
                            entity: this.translocoService.translate(
                                'iam.Account',
                            ),
                        },
                    ),
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
                                this.accountService.deleteById<IamAccount>({
                                    id: action.meta.row.id,
                                }),
                            );

                            this.actionService.action({
                                id: 'iam::account.list.pagination',
                                isViewAction: false,
                            });
                        } catch (error) {
                            log(
                                `[DEBUG] Catch error in ${action.id} action: ${error}`,
                            );
                        }
                    }
                });
                break;

            case 'iam::account.list.export':
                const rows = await lastValueFrom(
                    this.accountService.get({
                        query: action.meta.query,
                    }),
                );

                const columns: string[] = accountColumnsConfig().map(
                    (accountColumnConfig) => accountColumnConfig.field,
                );
                const headers: string[] = accountColumnsConfig().map(
                    (accountColumnConfig) =>
                        this.translocoService.translate(
                            accountColumnConfig.translation,
                        ),
                );

                exportRows(
                    rows.objects,
                    'accounts.' + action.meta.format,
                    columns,
                    headers,
                    action.meta.format,
                );
                break;
            /* #endregion common actions */

            case 'iam::account.list.impersonalize':
                await lastValueFrom(
                    this.authenticationService.impersonalize(
                        action.meta.row.id,
                    ),
                );
                await this.router.navigate(['/']);
                window.location.reload();
                break;
        }
    }
}
