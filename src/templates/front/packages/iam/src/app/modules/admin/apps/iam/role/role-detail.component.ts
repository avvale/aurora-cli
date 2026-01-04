import {
    ChangeDetectionStrategy,
    Component,
    signal,
    ViewChild,
    ViewEncapsulation,
    WritableSignal,
} from '@angular/core';
import { Validators } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { IamPermission, IamPermissionRole, IamRole } from '@apps/iam';
import {
    permissionColumnsConfig,
    PermissionService,
} from '@apps/iam/permission';
import {
    getQuery as getQueryExportPermissionsRoles,
    permissionRoleColumnsConfig,
    PermissionRoleService,
} from '@apps/iam/permission-role';
import { RoleService } from '@apps/iam/role';
import {
    Action,
    ActionScope,
    ColumnConfig,
    ColumnDataType,
    Crumb,
    defaultDetailImports,
    exportRows,
    GridColumnsConfigStorageService,
    GridData,
    GridFiltersStorageService,
    GridSelectMultipleElementsComponent,
    GridSelectMultipleElementsModule,
    GridState,
    GridStateService,
    log,
    mapActions,
    Operator,
    queryStatementHandler,
    SelectionChange,
    SelectionModel,
    SnackBarInvalidFormComponent,
    uuid,
    ViewDetailComponent,
} from '@aurora';
import { lastValueFrom, Observable, takeUntil } from 'rxjs';

export const permissionRoleGridId = 'iam::role.detail.permissionRoleGridList';
export const permissionsGridId = 'iam::role.detail.permissionsGridList';

@Component({
    selector: 'iam-role-detail',
    templateUrl: './role-detail.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        ...defaultDetailImports,
        GridSelectMultipleElementsModule,
        MatCheckboxModule,
    ],
})
@ActionScope('iam::role.detail')
export class RoleDetailComponent extends ViewDetailComponent {
    // ---- customizations ----
    // ..

    // Object retrieved from the database request,
    // it should only be used to obtain uninitialized
    // data in the form, such as relations, etc.
    // It should not be used habitually, since the source of truth is the form.
    managedObject: WritableSignal<IamRole> = signal(null);

    // relationships
    /* #region variables to manage grid-select-multiple-elements roles-permissions */
    // roles-permissions grid-select-multiple-elements
    @ViewChild('permissionsGridSelectMultipleElements')
    permissionsComponent: GridSelectMultipleElementsComponent;
    permissionsRolesIds: string[];
    permissionRoleGridState: GridState = {};
    permissionRoleSelectedRows: IamPermissionRole[] = [];
    permissionRoleGridId = permissionRoleGridId;
    permissionRoleGridData$: Observable<GridData<IamPermissionRole>>;
    permissionRoleColumnsConfig$: Observable<ColumnConfig[]>;
    selectedCheckboxRowModel = new SelectionModel<any>(
        true,
        [],
        true,
        (a: IamPermissionRole, b: IamPermissionRole) =>
            a.permissionId === b.permissionId,
    );
    originPermissionRoleColumnsConfig: ColumnConfig[] = [
        {
            type: ColumnDataType.ACTIONS,
            field: 'actions',
            sticky: true,
            actions: (row) => {
                const actions = [];

                actions.push({
                    id: 'iam::role.detail.removePermissionRole',
                    isViewAction: false,
                    translation: 'unlink',
                    icon: 'link_off',
                });

                return actions;
            },
        },
        {
            type: ColumnDataType.CHECKBOX,
            field: 'select',
            translation: 'Selects',
            sticky: true,
        },
        ...permissionRoleColumnsConfig({
            translator: this.translocoService,
        }),
    ];

    // permissions dialog
    permissionsSelectedRows: IamPermission[] = [];
    permissionsGridId = permissionsGridId;
    permissionsGridData$: Observable<GridData<IamPermission>>;
    permissionsColumnsConfig$: Observable<ColumnConfig[]>;
    originPermissionsColumnsConfig: ColumnConfig[] = [
        {
            type: ColumnDataType.ACTIONS,
            field: 'Actions',
            sticky: true,
            actions: (row) => {
                const actions = [];

                if (this.permissionsRolesIds.includes(row.id)) {
                    actions.push({
                        id: 'iam::role.detail.noAction',
                        isViewAction: false,
                        translation: 'select',
                        icon: 'done',
                    });
                } else {
                    actions.push({
                        id: 'iam::role.detail.addPermission',
                        isViewAction: false,
                        translation: 'select',
                        icon: 'add_link',
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
        ...permissionColumnsConfig({ translator: this.translocoService }),
    ];
    /* #endregion variables to manage grid-select-multiple-elements permissions }} */

    // breadcrumb component definition
    breadcrumb: Crumb[] = [
        { translation: 'App' },
        { translation: 'iam.Roles', routerLink: ['/iam/role'] },
        { translation: 'iam.Role' },
    ];

    constructor(
        private readonly gridColumnsConfigStorageService: GridColumnsConfigStorageService,
        private readonly gridFiltersStorageService: GridFiltersStorageService,
        private readonly gridStateService: GridStateService,
        private readonly permissionRoleService: PermissionRoleService,
        private readonly permissionService: PermissionService,
        private readonly roleService: RoleService,
    ) {
        super();
    }

    // this method will be called after the ngOnInit of
    // the parent class you can use instead of ngOnInit
    init(): void {
        /**/
    }

    onSubmit($event): void {
        // we have two nested forms, we check that the submit comes from the button
        // that corresponds to the main form to the main form
        if (
            $event.submitter.getAttribute('form') !==
            $event.submitter.form.getAttribute('id')
        ) {
            $event.preventDefault();
            $event.stopPropagation();
            return;
        }

        // manage validations before execute actions
        if (this.fg.invalid) {
            log('[DEBUG] Error to validate form: ', this.fg);
            this.validationMessagesService.validate();

            this.snackBar.openFromComponent(SnackBarInvalidFormComponent, {
                data: {
                    message: `${this.translocoService.translate('InvalidForm')}`,
                    textButton: `${this.translocoService.translate('InvalidFormOk')}`,
                },
                panelClass: 'error-snackbar',
                verticalPosition: 'top',
                duration: 10000,
            });
            return;
        }

        this.actionService.action({
            id: mapActions(this.currentViewAction.id, {
                'iam::role.detail.new': 'iam::role.detail.create',
                'iam::role.detail.edit': 'iam::role.detail.update',
            }),
            isViewAction: false,
        });
    }

    createForm(): void {
        /* eslint-disable key-spacing */
        this.fg = this.fb.group({
            id: [
                '',
                [
                    Validators.required,
                    Validators.minLength(36),
                    Validators.maxLength(36),
                ],
            ],
            name: ['', [Validators.required, Validators.maxLength(128)]],
            defaultRedirection: ['', [Validators.maxLength(2046)]],
            hasHiddenVerticalNavigation: false,
            isMaster: false,
            permissionIds: [],
        });
        /* eslint-enable key-spacing */
    }

    /* #region methods to manage PermissionsRoles grid */
    handlePermissionsRowsSectionChange(
        $event: SelectionChange<IamPermissionRole>,
    ): void {
        this.permissionRoleSelectedRows = $event.source.selected;
    }

    handleRemovePermissionsSelected(): void {
        if (this.permissionRoleSelectedRows.length > 0) {
            this.actionService.action({
                id: 'iam::role.detail.removePermissionsRoles',
                isViewAction: false,
                meta: {
                    rows: this.permissionRoleSelectedRows,
                },
            });
        }
    }
    /* #endregion methods to manage PermissionsRoles grid */

    /* #region methods to manage Permissions dialog */
    handleOpenPermissionsDialog(): void {
        this.actionService.action({
            id: 'iam::role.detail.permissionsPagination',
            isViewAction: false,
            meta: {
                query: queryStatementHandler({
                    columnsConfig: permissionColumnsConfig(),
                })
                    .setColumFilters(
                        this.gridFiltersStorageService.getColumnFilterState(
                            this.permissionsGridId,
                        ),
                    )
                    .setSort(
                        this.gridStateService.getSort(this.permissionsGridId),
                    )
                    .setPage(
                        this.gridStateService.getPage(this.permissionsGridId),
                    )
                    .setSearch(
                        this.gridStateService.getSearchState(
                            this.permissionsGridId,
                        ),
                    )
                    .getQueryStatement(),
            },
            afterRunAction: () => {
                this.gridStateService.setPaginationActionId(
                    this.permissionsGridId,
                    'iam::role.detail.permissionsPagination',
                );
                this.gridStateService.setExportActionId(
                    this.permissionsGridId,
                    'iam::role.detail.exportPermissions',
                );
                this.permissionsComponent.handleElementsDialog({
                    data: {
                        gridId: this.permissionsGridId,
                        gridState: {
                            columnFilters:
                                this.gridFiltersStorageService.getColumnFilterState(
                                    this.permissionsGridId,
                                ),
                            page: this.gridStateService.getPage(
                                this.permissionsGridId,
                            ),
                            sort: this.gridStateService.getSort(
                                this.permissionsGridId,
                            ),
                            search: this.gridStateService.getSearchState(
                                this.permissionsGridId,
                            ),
                        },
                    },
                });
            },
        });
    }

    handleDialogPermissionsRowsSectionChange(
        $event: SelectionChange<IamPermission>,
    ): void {
        this.permissionsSelectedRows = $event.source.selected;
    }

    handleAddPermissionsSelected(): void {
        if (this.permissionsSelectedRows.length > 0) {
            this.actionService.action({
                id: 'iam::role.detail.addPermissionsRoles',
                isViewAction: false,
                meta: {
                    rows: this.permissionsSelectedRows,
                },
            });

            this.permissionsComponent.elementsDialogRef.close();
        }
    }
    /* #endregion methods to manage Permissions dialog */

    async handleAction(action: Action): Promise<void> {
        // add optional chaining (?.) to avoid first call where behaviour subject is undefined
        switch (action?.id) {
            /* #region common actions */
            case 'iam::role.detail.new':
                this.fg.get('id').setValue(uuid());
                break;

            case 'iam::role.detail.edit':
                this.roleService.role$
                    .pipe(takeUntil(this.unsubscribeAll$))
                    .subscribe((item) => {
                        this.managedObject.set(item);
                        this.fg.patchValue(item);
                    });

                /* #region edit action to manage PermissionsRoles grid-select-multiple-elements */
                // we need to get the permissions of the role to be able to
                // marked permissions as selected in the dialog
                this.permissionRoleService.permissionsRoles$
                    .pipe(takeUntil(this.unsubscribeAll$))
                    .subscribe((permissionsRoles) => {
                        this.permissionsRolesIds = permissionsRoles.map(
                            (permissionRole) => permissionRole.permissionId,
                        );
                    });

                // permissions grid
                this.permissionRoleColumnsConfig$ =
                    this.gridColumnsConfigStorageService
                        .getColumnsConfig(
                            this.permissionRoleGridId,
                            this.originPermissionRoleColumnsConfig,
                        )
                        .pipe(takeUntil(this.unsubscribeAll$));

                this.permissionRoleGridState = {
                    columnFilters:
                        this.gridFiltersStorageService.getColumnFilterState(
                            this.permissionRoleGridId,
                        ),
                    page: this.gridStateService.getPage(
                        this.permissionRoleGridId,
                    ),
                    sort: this.gridStateService.getSort(
                        this.permissionRoleGridId,
                    ),
                    search: this.gridStateService.getSearchState(
                        this.permissionRoleGridId,
                    ),
                };

                this.permissionRoleGridData$ =
                    this.permissionRoleService.pagination$;

                // permissions grid
                this.permissionsColumnsConfig$ =
                    this.gridColumnsConfigStorageService
                        .getColumnsConfig(
                            this.permissionsGridId,
                            this.originPermissionsColumnsConfig,
                        )
                        .pipe(takeUntil(this.unsubscribeAll$));
                this.permissionsGridData$ = this.permissionService.pagination$;
                /* #endregion edit action to manage PermissionsRoles grid-select-multiple-elements */
                break;

            case 'iam::role.detail.create':
                try {
                    await lastValueFrom(
                        this.roleService.create<IamRole>({
                            object: this.fg.value,
                        }),
                    );

                    this.snackBar.open(
                        `${this.translocoService.translate('iam.Role')} ${this.translocoService.translate('Created.M')}`,
                        undefined,
                        {
                            verticalPosition: 'top',
                            duration: 3000,
                        },
                    );

                    this.router.navigate(['iam/role']);
                } catch (error) {
                    log(`[DEBUG] Catch error in ${action.id} action: ${error}`);
                }
                break;

            case 'iam::role.detail.update':
                try {
                    await lastValueFrom(
                        this.roleService.updateById<IamRole>({
                            object: this.fg.value,
                        }),
                    );

                    this.snackBar.open(
                        `${this.translocoService.translate('iam.Role')} ${this.translocoService.translate('Saved.M')}`,
                        undefined,
                        {
                            verticalPosition: 'top',
                            duration: 3000,
                        },
                    );

                    this.router.navigate(['iam/role']);
                } catch (error) {
                    log(`[DEBUG] Catch error in ${action.id} action: ${error}`);
                }
                break;
            /* #endregion common actions */

            /* #region actions to manage PermissionsRoles grid-select-multiple-elements grid */
            case 'iam::role.detail.addPermission':
                await lastValueFrom(
                    this.permissionRoleService.create({
                        object: {
                            roleId: this.managedObject().id,
                            permissionId: action.meta.row.id,
                        },
                    }),
                );

                this.actionService.action({
                    id: 'iam::role.detail.permissionsRolesPagination',
                    isViewAction: false,
                });

                // get all PermissionsRoles from the role, to mark the permissions as selected when open permissions dialog
                this.actionService.action({
                    id: 'iam::role.detail.getPermissionsRoles',
                    isViewAction: false,
                    afterRunAction: () => {
                        this.actionService.action({
                            id: 'iam::role.detail.permissionsPagination',
                            isViewAction: false,
                        });
                    },
                });

                this.snackBar.open(
                    `${this.translocoService.translate('iam.Permission')} ${this.translocoService.translate('Saved.M')}`,
                    undefined,
                    {
                        verticalPosition: 'top',
                        duration: 3000,
                    },
                );
                break;

            case 'iam::role.detail.addPermissionsRoles':
                try {
                    await lastValueFrom(
                        this.permissionRoleService.insert({
                            objects: action.meta.rows
                                // avoid insert rows already inserted
                                .filter(
                                    (row) =>
                                        this.permissionsRolesIds.indexOf(
                                            row.id,
                                        ) === -1,
                                )
                                .map((row) => ({
                                    roleId: this.managedObject().id,
                                    permissionId: row.id,
                                })),
                        }),
                    );

                    this.actionService.action({
                        id: 'iam::role.detail.permissionsRolesPagination',
                        isViewAction: false,
                    });

                    // get all PermissionsRoles from the role, to mark the permissions as selected when open permissions dialog
                    this.actionService.action({
                        id: 'iam::role.detail.getPermissionsRoles',
                        isViewAction: false,
                    });

                    this.snackBar.open(
                        `${this.translocoService.translate('iam.Permissions')} ${this.translocoService.translate('Saved.M.P')}`,
                        undefined,
                        {
                            verticalPosition: 'top',
                            duration: 3000,
                        },
                    );
                } catch (error) {
                    log(`[DEBUG] Catch error in ${action.id} action: ${error}`);
                }
                break;

            case 'iam::role.detail.removePermissionRole':
                await lastValueFrom(
                    this.permissionRoleService.deleteById({
                        roleId: this.managedObject().id,
                        permissionId: action.meta.row.permissionId,
                    }),
                );

                this.actionService.action({
                    id: 'iam::role.detail.permissionsRolesPagination',
                    isViewAction: false,
                });

                this.actionService.action({
                    id: 'iam::role.detail.getPermissionsRoles',
                    isViewAction: false,
                });

                this.snackBar.open(
                    `${this.translocoService.translate('iam.Permission')} ${this.translocoService.translate('Deleted.M')}`,
                    undefined,
                    {
                        verticalPosition: 'top',
                        duration: 3000,
                    },
                );
                break;

            case 'iam::role.detail.permissionsRolesPagination':
                await lastValueFrom(
                    this.permissionRoleService.pagination({
                        query: action.meta.query
                            ? action.meta.query
                            : queryStatementHandler({
                                  columnsConfig: permissionRoleColumnsConfig(),
                              })
                                  .setColumFilters(
                                      this.gridFiltersStorageService.getColumnFilterState(
                                          this.permissionRoleGridId,
                                      ),
                                  )
                                  .setSort(
                                      this.gridStateService.getSort(
                                          this.permissionRoleGridId,
                                      ),
                                  )
                                  .setPage(
                                      this.gridStateService.getPage(
                                          this.permissionRoleGridId,
                                      ),
                                  )
                                  .setSearch(
                                      this.gridStateService.getSearchState(
                                          this.permissionRoleGridId,
                                      ),
                                  )
                                  .getQueryStatement(),
                        constraint: {
                            where: {
                                roleId: this.managedObject().id,
                            },
                            include: [
                                {
                                    association: 'permission',
                                },
                            ],
                        },
                    }),
                );
                break;

            case 'iam::role.detail.getPermissionsRoles':
                await lastValueFrom(
                    this.permissionRoleService.get({
                        query: {
                            where: {
                                roleId: this.managedObject().id,
                            },
                        },
                    }),
                );
                break;

            case 'iam::role.detail.exportPermissionsRoles':
                const permissionRoleRows = await lastValueFrom(
                    this.permissionRoleService.get({
                        graphqlStatement: getQueryExportPermissionsRoles,
                        query: action.meta.query,
                        constraint: {
                            where: {
                                roleId: this.managedObject().id,
                            },
                            include: [
                                {
                                    association: 'permission',
                                },
                            ],
                        },
                    }),
                );

                const permissionRoleColumns: string[] = ['name'];
                const permissionRoleHeaders: string[] = [
                    this.translocoService.translate('iam.permission'),
                ];

                exportRows(
                    permissionRoleRows.objects.map((row) => ({
                        ...row.permission,
                    })),
                    'permissionsRoles.' + action.meta.format,
                    permissionRoleColumns,
                    permissionRoleHeaders,
                    action.meta.format,
                );
                break;
            /* #endregion actions to manage PermissionsRoles grid-select-multiple-elements grid */

            /* #region actions to manage PermissionsRoles grid-select-multiple-elements dialog */
            case 'iam::role.detail.permissionsPagination':
                await lastValueFrom(
                    this.permissionService.pagination({
                        query: action.meta.query
                            ? action.meta.query
                            : queryStatementHandler({
                                  columnsConfig: permissionColumnsConfig(),
                              })
                                  .setColumFilters(
                                      this.gridFiltersStorageService.getColumnFilterState(
                                          this.permissionsGridId,
                                      ),
                                  )
                                  .setSort(
                                      this.gridStateService.getSort(
                                          this.permissionsGridId,
                                      ),
                                  )
                                  .setPage(
                                      this.gridStateService.getPage(
                                          this.permissionsGridId,
                                      ),
                                  )
                                  .setSearch(
                                      this.gridStateService.getSearchState(
                                          this.permissionsGridId,
                                      ),
                                  )
                                  .getQueryStatement(),
                    }),
                );
                break;

            case 'iam::role.detail.removePermissionsRoles':
                try {
                    await lastValueFrom(
                        this.permissionRoleService.delete({
                            query: {
                                where: {
                                    [Operator.or]: action.meta.rows.map(
                                        (row) => ({
                                            roleId: this.managedObject().id,
                                            permissionId: row.permissionId,
                                        }),
                                    ),
                                },
                            },
                        }),
                    );

                    this.selectedCheckboxRowModel.clear();

                    this.actionService.action({
                        id: 'iam::role.detail.permissionsRolesPagination',
                        isViewAction: false,
                    });

                    // get all PermissionsRoles from the role, to mark the permissions as selected when open permissions dialog
                    this.actionService.action({
                        id: 'iam::role.detail.getPermissionsRoles',
                        isViewAction: false,
                    });

                    this.snackBar.open(
                        `${this.translocoService.translate('iam.Permissions')} ${this.translocoService.translate('Deleted.M.P')}`,
                        undefined,
                        {
                            verticalPosition: 'top',
                            duration: 3000,
                        },
                    );
                } catch (error) {
                    log(`[DEBUG] Catch error in ${action.id} action: ${error}`);
                }
                break;

            case 'iam::role.detail.exportPermissions':
                const permissionRows = await lastValueFrom(
                    this.permissionService.get({
                        query: action.meta.query,
                    }),
                );

                const permissionColumns: string[] =
                    permissionColumnsConfig().map(
                        (permissionColumnConfig) =>
                            permissionColumnConfig.field,
                    );
                const permissionHeaders = permissionColumns.map((column) =>
                    this.translocoService.translate(
                        'iam.' + column.toPascalCase(),
                    ),
                );

                exportRows(
                    permissionRows.objects,
                    'permissions.' + action.meta.format,
                    permissionColumns,
                    permissionHeaders,
                    action.meta.format,
                );
                break;
            /* #endregion actions to manage PermissionsRoles grid-select-multiple-elements dialog */
        }
    }
}
