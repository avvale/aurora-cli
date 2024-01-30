import { ChangeDetectionStrategy, Component, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { IamRole } from '@apps/iam/iam.types';
import { roleColumnsConfig, RoleService } from '@apps/iam/role';
import { Action, ColumnConfig, ColumnDataType, ContentDialogTemplateDirective, Crumb, defaultListImports, DialogComponent, exportRows, GridColumnsConfigStorageService, GridData, GridFiltersStorageService, GridState, GridStateService, log, QueryStatementHandler, ValidationMessagesService, ViewBaseComponent } from '@aurora';
import { lastValueFrom, Observable, takeUntil } from 'rxjs';

@Component({
    selector       : 'iam-role-list',
    templateUrl    : './role-list.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone     : true,
    imports        : [
        ...defaultListImports,
        ContentDialogTemplateDirective, FormsModule, MatDialogModule, MatSelectModule, ReactiveFormsModule,
    ],
})
export class RoleListComponent extends ViewBaseComponent
{
    // ---- customizations ----
    @ViewChild('roleSelectorContentFormDialog') roleSelectorContentFormDialog?: TemplateRef<any>;
    roleSelectorDialogFg: FormGroup;
    roles$: Observable<IamRole[]>;
    contactFamilyUnitDialog: MatDialogRef<DialogComponent>;

    breadcrumb: Crumb[] = [
        { translation: 'App', routerLink: ['/']},
        { translation: 'iam.Roles' },
    ];
    gridId: string = 'iam::role.list.mainGridList';
    gridData$: Observable<GridData<IamRole>>;
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
                        id         : 'iam::role.list.edit',
                        translation: 'edit',
                        icon       : 'mode_edit',
                    },
                    {
                        id         : 'iam::role.list.openRoleSelectorFormDialog',
                        translation: 'inherit',
                        icon       : 'layers',
                    },
                    {
                        id         : 'iam::role.list.delete',
                        translation: 'delete',
                        icon       : 'delete',
                    },
                ];
            },
        },
        {
            type       : ColumnDataType.CHECKBOX,
            field      : 'select',
            translation: 'Selects',
            sticky     : true,
        },
        ...roleColumnsConfig,
    ];

    constructor(
        private readonly gridColumnsConfigStorageService: GridColumnsConfigStorageService,
        private readonly gridFiltersStorageService: GridFiltersStorageService,
        private readonly gridStateService: GridStateService,
        private readonly roleService: RoleService,
        private readonly validationMessagesService: ValidationMessagesService,
        private readonly fb: FormBuilder,
        private readonly dialog: MatDialog,
    )
    {
        super();
    }

    // this method will be called after the ngOnInit of
    // the parent class you can use instead of ngOnInit
    init(): void
    { /**/ }

    /* #region methods to role */
    createContactFamilyUnitDialogForm(role: IamRole): void
    {
        this.roleSelectorDialogFg = this.fb.group({
            parentRoleId: ['', [Validators.required]],
            childRoleId : [role.id, [Validators.required]],
        });
    }

    handleSubmitInheritRoleForm(): void
    {
        // manage validations before execute actions
        if (this.roleSelectorDialogFg.invalid)
        {
            log('[DEBUG] Error to validate form: ', this.roleSelectorDialogFg);
            this.validationMessagesService.validate();
            return;
        }

        this.actionService.action({
            id          : 'iam::role.list.inheritPermissionsRole',
            isViewAction: false,
        });

        this.contactFamilyUnitDialog.close();
    }
    /* #endregion methods to manage role */

    async handleAction(action: Action): Promise<void>
    {
        // add optional chaining (?.) to avoid first call where behaviour subject is undefined
        switch (action?.id)
        {
            case 'iam::role.list.view':
                this.columnsConfig$ = this.gridColumnsConfigStorageService
                    .getColumnsConfig(this.gridId, this.originColumnsConfig)
                    .pipe(takeUntil(this.unsubscribeAll$));

                this.gridState = {
                    columnFilters: this.gridFiltersStorageService.getColumnFilterState(this.gridId),
                    page         : this.gridStateService.getPage(this.gridId),
                    sort         : this.gridStateService.getSort(this.gridId),
                    search       : this.gridStateService.getSearchState(this.gridId),
                };

                this.gridData$ = this.roleService.pagination$;
                this.roles$ = this.roleService.roles$;
                break;

            case 'iam::role.list.pagination':
                await lastValueFrom(
                    this.roleService.pagination({
                        query: action.meta.query ?
                            action.meta.query :
                            QueryStatementHandler
                                .init({ columnsConfig: roleColumnsConfig })
                                .setColumFilters(this.gridFiltersStorageService.getColumnFilterState(this.gridId))
                                .setSort(this.gridStateService.getSort(this.gridId))
                                .setPage(this.gridStateService.getPage(this.gridId))
                                .setSearch(this.gridStateService.getSearchState(this.gridId))
                                .getQueryStatement(),
                    }),
                );
                break;

            case 'iam::role.list.edit':
                this.router
                    .navigate([
                        'iam/role/edit',
                        action.meta.row.id,
                    ]);
                break;

            case 'iam::role.list.delete':
                const deleteDialogRef = this.confirmationService.open({
                    title  : `${this.translocoService.translate('Delete')} ${this.translocoService.translate('iam.Role')}`,
                    message: this.translocoService.translate('DeletionWarning', { entity: this.translocoService.translate('iam.Role') }),
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
                                    this.roleService
                                        .deleteById<IamRole>({
                                            id: action.meta.row.id,
                                        }),
                                );

                                this.actionService.action({
                                    id          : 'iam::role.list.pagination',
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

            case 'iam::role.list.export':
                const rows = await lastValueFrom(
                    this.roleService
                        .get({
                            query: action.meta.query,
                        }),
                );

                // format export rows
                (rows.objects as any[]).forEach(row =>
                {
                    // row.id = row.id;
                });

                const columns: string[] = roleColumnsConfig.map(roleColumnConfig => roleColumnConfig.field);
                const headers: string[] = columns.map(column => this.translocoService.translate('iam.' + column.toPascalCase()));

                exportRows(
                    rows.objects,
                    'roles.' + action.meta.format,
                    columns,
                    headers,
                    action.meta.format,
                );
                break;

            /* #region custom actions */
            case 'iam::role.list.openRoleSelectorFormDialog':
                this.createContactFamilyUnitDialogForm(action.meta.row);
                this.contactFamilyUnitDialog = this.dialog
                    .open(
                        DialogComponent,
                        {
                            panelClass: 'au-dialog',
                            width     : '60vw',
                            maxWidth  : '2048px',
                            minWidth  : '240px',
                            height    : 'auto',
                            data      : {
                                icon   : 'layers',
                                title  : `${this.translocoService.translate('iam.Roles')} ${this.translocoService.translate('For').toLowerCase()} ${action.meta.row.name}`,
                                content: new ContentDialogTemplateDirective(this.roleSelectorContentFormDialog),
                            },
                        },
                    );

                break;

            case 'iam::role.list.inheritPermissionsRole':
                try
                {
                    await lastValueFrom(
                        this.roleService
                            .inheritPermissionsRoleRole({
                                object: this.roleSelectorDialogFg.value,
                            }),
                    );

                    this.snackBar.open(
                        `${this.translocoService.translate('iam.Permissions')} ${this.translocoService.translate('iam.Inherited')}`,
                        undefined,
                        {
                            verticalPosition: 'top',
                            duration        : 3000,
                        },
                    );
                }
                catch(error)
                {
                    log(`[DEBUG] Catch error in ${action.id} action: ${error}`);
                }
                break;
                /* #endregion custom actions */
        }
    }
}
