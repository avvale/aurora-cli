import { NgForOf } from '@angular/common';
import { IamPermission } from '../iam.types';
import { permissionColumnsConfig } from '../permission/permission.columns-config';
import { PermissionService } from '../permission/permission.service';
import { ChangeDetectionStrategy, Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { BoundedContextService } from '@apps/iam/bounded-context';
import { IamBoundedContext } from '@apps/iam/iam.types';
import { Action, ColumnConfig, ColumnDataType, Crumb, defaultDetailImports, exportRows, GridColumnsConfigStorageService, GridColumnTranslationComponent, GridCustomButtonsHeaderDialogTemplateDirective, GridData, GridElementsManagerComponent, GridFiltersStorageService, GridFormElementDetailDialogTemplateDirective, GridState, GridStateService, GridTranslationsComponent, log, mapActions, QueryStatementHandler, Utils, ViewDetailComponent } from '@aurora';
import { lastValueFrom, Observable, takeUntil } from 'rxjs';

@Component({
    selector       : 'iam-bounded-context-detail',
    templateUrl    : './bounded-context-detail.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone     : true,
    imports        : [
        ...defaultDetailImports,
        GridColumnTranslationComponent, GridCustomButtonsHeaderDialogTemplateDirective, GridElementsManagerComponent, GridFormElementDetailDialogTemplateDirective,
        GridTranslationsComponent, MatCheckboxModule, NgForOf,
    ],
})
export class BoundedContextDetailComponent extends ViewDetailComponent
{
    // ---- customizations ----
    // ..

    // Object retrieved from the database request,
    // it should only be used to obtain uninitialized
    // data in the form, such as relations, etc.
    // It should not be used habitually, since the source of truth is the form.
    managedObject: IamBoundedContext;

    // relationships
    /* #region variables to manage grid-elements-manager permissions */
    @ViewChild('permissionsGridElementsManager') permissionsComponent: GridElementsManagerComponent;
    permissionDialogFg: FormGroup;
    permissionsGridId: string = 'iam::boundedContext.detail.permissionsGridList';
    permissionsGridData$: Observable<GridData<IamPermission>>;
    permissionsGridState: GridState = {};
    permissionsColumnsConfig$: Observable<ColumnConfig[]>;
    originPermissionsColumnsConfig: ColumnConfig[] = [
        {
            type   : ColumnDataType.ACTIONS,
            field  : 'Actions',
            sticky : true,
            actions: row =>
            {
                const actions = [
                    {
                        id          : 'iam::boundedContext.detail.editPermission',
                        isViewAction: false,
                        translation : 'edit',
                        icon        : 'mode_edit',
                    },
                    {
                        id          : 'iam::boundedContext.detail.deletePermission',
                        isViewAction: false,
                        translation : 'delete',
                        icon        : 'delete',
                    },
                ];

                return actions;
            },
        },
        ...permissionColumnsConfig,
    ];
    /* #endregion variables to manage grid-elements-manager permissions */

    // breadcrumb component definition
    breadcrumb: Crumb[] = [
        { translation: 'App' },
        { translation: 'iam.BoundedContexts', routerLink: ['/iam/bounded-context']},
        { translation: 'iam.BoundedContext' },
    ];

    constructor(
        private readonly boundedContextService: BoundedContextService,
        private readonly gridColumnsConfigStorageService: GridColumnsConfigStorageService,
        private readonly gridFiltersStorageService: GridFiltersStorageService,
        private readonly gridStateService: GridStateService,
        private readonly permissionService: PermissionService,
    )
    {
        super();
    }

    // this method will be called after the ngOnInit of
    // the parent class you can use instead of ngOnInit
    init(): void
    {
        /**/
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
                    'iam::boundedContext.detail.new' : 'iam::boundedContext.detail.create',
                    'iam::boundedContext.detail.edit': 'iam::boundedContext.detail.update',
                },
            ),
            isViewAction: false,
        });
    }

    createForm(): void
    {
        this.fg = this.fb.group({
            id: ['', [Validators.required, Validators.minLength(36), Validators.maxLength(36)]],
            name: ['', [Validators.required, Validators.maxLength(127)]],
            root: ['', [Validators.required, Validators.maxLength(63)]],
            sort: [null, [Validators.maxLength(6)]],
            isActive: false,
        });
    }

    /* #region methods to manage Permissions */
    createPermissionDialogForm(): void
    {
        this.permissionDialogFg = this.fb.group({
            id: ['', [Validators.required, Validators.minLength(36), Validators.maxLength(36)]],
            name: ['', [Validators.required, Validators.maxLength(127)]],
            boundedContextId: [null, [Validators.required, Validators.minLength(36), Validators.maxLength(36)]],
        });
    }

    handleSubmitPermissionForm($event, dialog): void
    {
        // manage validations before execute actions
        if (this.permissionDialogFg.invalid)
        {
            log('[DEBUG] Error to validate form: ', this.permissionDialogFg);
            this.validationMessagesService.validate();
            return;
        }

        // depending on the dialog action we invoke a createPermission or updatePermission action
        this.actionService.action({
            id: mapActions(
                dialog.componentInstance.data.currentActionId,
                {
                    'iam::boundedContext.detail.newPermission' : 'iam::boundedContext.detail.createPermission',
                    'iam::boundedContext.detail.editPermission': 'iam::boundedContext.detail.updatePermission',
                },
            ),
            isViewAction: false,
        });

        dialog.close();
    }
    /* #endregion methods to manage Permissions */

    async handleAction(action: Action): Promise<void>
    {
        // add optional chaining (?.) to avoid first call where behaviour subject is undefined
        switch (action?.id)
        {
            /* #region common actions */
            case 'iam::boundedContext.detail.new':
                this.fg.get('id').setValue(Utils.uuid());
                break;

            case 'iam::boundedContext.detail.edit':
                this.boundedContextService
                    .boundedContext$
                    .pipe(takeUntil(this.unsubscribeAll$))
                    .subscribe(item =>
                    {
                        this.managedObject = item;
                        this.fg.patchValue(item);
                    });

                /* #region init actions to manage permissions grid-elements-manager */
                this.permissionsColumnsConfig$ = this.gridColumnsConfigStorageService
                    .getColumnsConfig(this.permissionsGridId, this.originPermissionsColumnsConfig)
                    .pipe(takeUntil(this.unsubscribeAll$));

                this.permissionsGridState = {
                    columnFilters: this.gridFiltersStorageService.getColumnFilterState(this.permissionsGridId),
                    page         : this.gridStateService.getPage(this.permissionsGridId),
                    sort         : this.gridStateService.getSort(this.permissionsGridId),
                    search       : this.gridStateService.getSearchState(this.permissionsGridId),
                };

                this.permissionsGridData$ = this.permissionService.pagination$;

                // subscription to get permission in edit boundedContext action
                this.permissionService
                    .permission$
                    .pipe(takeUntil(this.unsubscribeAll$))
                    .subscribe((permission: IamPermission) =>
                    {
                        if (permission && this.currentAction.id === 'iam::boundedContext.detail.editPermission')
                        {
                            this.permissionDialogFg.patchValue(permission);
                        }
                    });
                /* #endregion edit action to manage permissions grid-elements-manager */
                break;

            case 'iam::boundedContext.detail.create':
                try
                {
                    await lastValueFrom(
                        this.boundedContextService
                            .create<IamBoundedContext>({
                                object: this.fg.value,
                            }),
                    );

                    this.snackBar.open(
                        `${this.translocoService.translate('iam.BoundedContext')} ${this.translocoService.translate('Created.M')}`,
                        undefined,
                        {
                            verticalPosition: 'top',
                            duration        : 3000,
                        },
                    );

                    this.router.navigate(['iam/bounded-context']);
                }
                catch(error)
                {
                    log(`[DEBUG] Catch error in ${action.id} action: ${error}`);
                }
                break;

            case 'iam::boundedContext.detail.update':
                try
                {
                    await lastValueFrom(
                        this.boundedContextService
                            .updateById<IamBoundedContext>({
                                object: this.fg.value,
                            }),
                    );

                    this.snackBar.open(
                        `${this.translocoService.translate('iam.BoundedContext')} ${this.translocoService.translate('Saved.M')}`,
                        undefined,
                        {
                            verticalPosition: 'top',
                            duration        : 3000,
                        },
                    );

                    this.router.navigate(['iam/bounded-context']);
                }
                catch(error)
                {
                    log(`[DEBUG] Catch error in ${action.id} action: ${error}`);
                }
                break;
                /* #endregion common actions */

            /* #region actions to manage permissions grid-elements-manager */
            case 'iam::boundedContext.detail.permissionsPagination':
                await lastValueFrom(
                    this.permissionService
                        .pagination({
                            query: action.meta.query ?
                                action.meta.query :
                                QueryStatementHandler
                                    .init({ columnsConfig: permissionColumnsConfig })
                                    .setColumFilters(this.gridFiltersStorageService.getColumnFilterState(this.permissionsGridId))
                                    .setSort(this.gridStateService.getSort(this.permissionsGridId))
                                    .setPage(this.gridStateService.getPage(this.permissionsGridId))
                                    .setSearch(this.gridStateService.getSearchState(this.permissionsGridId))
                                    .getQueryStatement(),
                            constraint: {
                                where: {
                                    boundedContextId: this.managedObject.id,
                                },
                            },
                        }),
                );
                break;

            case 'iam::boundedContext.detail.newPermission':
                this.createPermissionDialogForm();
                this.permissionsComponent.handleElementDetailDialog(action.id);
                this.permissionDialogFg.get('id').setValue(Utils.uuid());
                this.permissionDialogFg.get('boundedContextId').setValue(this.managedObject.id);
                break;

            case 'iam::boundedContext.detail.createPermission':
                await lastValueFrom(
                    this.permissionService
                        .create<IamPermission>({
                            object: this.permissionDialogFg.value,
                        }),
                );

                this.actionService.action({
                    id          : 'iam::boundedContext.detail.permissionsPagination',
                    isViewAction: false,
                });
                break;

            case 'iam::boundedContext.detail.editPermission':
                this.createPermissionDialogForm();
                await lastValueFrom(
                    this.permissionService
                        .findById({
                            id        : action.meta.row.id,
                            constraint: {
                                where: {
                                    boundedContextId: this.managedObject.id,
                                },
                            },
                        }),
                );
                this.permissionsComponent.handleElementDetailDialog(action.id);
                break;

            case 'iam::boundedContext.detail.updatePermission':
                this.permissionDialogFg.removeControl('boundedContextId');

                await lastValueFrom(
                    this.permissionService
                        .updateById<IamPermission>({
                            object: this.permissionDialogFg.value,
                        }),
                );
                this.actionService.action({
                    id          : 'iam::boundedContext.detail.permissionsPagination',
                    isViewAction: false,
                });
                break;

            case 'iam::boundedContext.detail.deletePermission':
                const deletePermissionDialogRef = this.confirmationService.open({
                    title  : `${this.translocoService.translate('Delete')} ${this.translocoService.translate('iam.Permission')}`,
                    message: this.translocoService.translate('DeletionWarning', { entity: this.translocoService.translate('iam.Permission') }),
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

                deletePermissionDialogRef
                    .afterClosed()
                    .subscribe(async result =>
                    {
                        if (result === 'confirmed')
                        {
                            try
                            {
                                await lastValueFrom(
                                    this.permissionService
                                        .deleteById<IamPermission>({
                                            id: action.meta.row.id,
                                        }),
                                );

                                this.actionService.action({
                                    id          : 'iam::boundedContext.detail.permissionsPagination',
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

            case 'iam::boundedContext.detail.exportPermissions':
                const permissionRows = await lastValueFrom(
                    this.permissionService
                        .get({
                            query     : action.meta.query,
                            constraint: {
                                where: {
                                    boundedContextId: this.managedObject.id,
                                },
                            },
                        }),
                );

                const permissionColumns: string[] = permissionColumnsConfig.map(permissionColumnConfig => permissionColumnConfig.field);
                const permissionHeaders = permissionColumns.map(column => this.translocoService.translate('iam.' + column.toPascalCase()));

                exportRows(
                    permissionRows.objects,
                    'permissions.' + action.meta.format,
                    permissionColumns,
                    permissionHeaders,
                    action.meta.format,
                );
                break;
                /* #endregion actions to manage permissions grid-elements-manager */
        }
    }
}
