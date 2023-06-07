import { ChangeDetectionStrategy, Component, Injector, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { Action, ColumnConfig, ColumnDataType, Crumb, GridColumnsConfigStorageService, GridElementsManagerComponent, GridData, GridFiltersStorageService, GridState, log, mapActions, Utils, ViewDetailComponent, QueryStatementHandler, GridStateService, exportRows } from '@aurora';
import { lastValueFrom, Observable, takeUntil } from 'rxjs';
import { IamBoundedContext, IamPermission } from '../iam.types';
import { BoundedContextService } from './bounded-context.service';

// ---- customizations ----
import { PermissionService } from '../permission/permission.service';
import { permissionColumnsConfig } from '../permission/permission.columns-config';

@Component({
    selector       : 'iam-bounded-context-detail',
    templateUrl    : './bounded-context-detail.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoundedContextDetailComponent extends ViewDetailComponent
{
    // ---- customizations ----
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
                return [
                    {
                        id         : 'iam::boundedContext.detail.editPermission',
                        translation: 'edit',
                        icon       : 'mode_edit',
                    },
                    {
                        id         : 'iam::boundedContext.detail.deletePermission',
                        translation: 'delete',
                        icon       : 'delete',
                    },
                ];
            },
        },
        ...permissionColumnsConfig,
    ];

    // Object retrieved from the database request,
    // it should only be used to obtain uninitialized
    // data in the form, such as relations, etc.
    // It should not be used habitually, since the source of truth is the form.
    managedObject: IamBoundedContext;

    // breadcrumb component definition
    breadcrumb: Crumb[] = [
        { translation: 'App' },
        { translation: 'iam.BoundedContexts', routerLink: ['/iam/bounded-context']},
        { translation: 'iam.BoundedContext' },
    ];

    constructor(
        protected readonly injector: Injector,
        private readonly gridColumnsConfigStorageService: GridColumnsConfigStorageService,
        private readonly gridFiltersStorageService: GridFiltersStorageService,
        private readonly gridStateService: GridStateService,
        private readonly boundedContextService: BoundedContextService,
        private readonly permissionService: PermissionService,
    )
    {
        super(injector);
    }

    // this method will be called after the ngOnInit of
    // the parent class you can use instead of ngOnInit
    init(): void
    { /**/ }

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
            id      : ['', [Validators.required, Validators.minLength(36), Validators.maxLength(36)]],
            name    : ['', [Validators.required, Validators.maxLength(255)]],
            root    : ['', [Validators.required, Validators.maxLength(30)]],
            sort    : [null, [Validators.maxLength(6)]],
            isActive: false,
        });
    }

    /* #region methods to manage permissions */
    createPermissionDialogForm(): void
    {
        this.permissionDialogFg = this.fb.group({
            id              : '',
            boundedContextId: '',
            name            : ['', [Validators.required]],
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

        // depending on the dialog action we invoke a createCallLog or updateCallLog action
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
    /* #endregion methods to manage permissions */

    async handleAction(action: Action): Promise<void>
    {
        // add optional chaining (?.) to avoid first call where behaviour subject is undefined
        switch (action?.id)
        {
            /* #region default actions */
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

                // permissions grid
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

                // subscription to get permissions in edit editPermission action
                this.permissionService
                    .permission$
                    .pipe(takeUntil(this.unsubscribeAll$))
                    .subscribe((permission: IamPermission) =>
                    {
                        if (permission && this.currentAction.id === 'am::boundedContext.detail.editPermission')
                        {
                            this.permissionDialogFg.patchValue(permission);
                        }
                    });
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
                /* #endregion default actions */

            /* #region permissions actions */
            case 'iam::boundedContext.detail.permissionsPagination':
                await lastValueFrom(
                    this.permissionService
                        .pagination(
                            {
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
                                    }},
                            },
                        ),
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
                const loadOrdersDialogRef = this.confirmationService.open({
                    title  : `${this.translocoService.translate('Delete')} ${this.translocoService.translate('iam.Permission')}`,
                    message: this.translocoService.translate('DeletionWarning', { entity: this.translocoService.translate('iam.Permission') }),
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

                loadOrdersDialogRef
                    .afterClosed()
                    .subscribe(async result =>
                    {
                        if (result === 'confirmed')
                        {
                            try
                            {
                                await lastValueFrom(
                                    this.permissionService
                                        .deleteById<IamPermission>(action.meta.row.id),
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
                const rows = await lastValueFrom(
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

                const columns: string[] = permissionColumnsConfig.map(permissionColumnConfig => permissionColumnConfig.field);
                const headers = columns.map(column => this.translocoService.translate('iam.' + column.toPascalCase()));

                exportRows(
                    rows.objects,
                    'bondedContextPermissions.' + action.meta.format,
                    columns,
                    headers,
                    action.meta.format,
                );
                break;
                /* #endregion permissions actions */
        }
    }
}
