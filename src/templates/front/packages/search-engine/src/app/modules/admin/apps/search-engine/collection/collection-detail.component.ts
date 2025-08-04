import { fieldColumnsConfig } from '../field/field.columns-config';
import { FieldService } from '../field/field.service';
import { SearchEngineField } from '../search-engine.types';
import { NgForOf } from '@angular/common';
import { ChangeDetectionStrategy, Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { CollectionService } from '@apps/search-engine/collection';
import { SearchEngineCollection } from '@apps/search-engine/search-engine.types';
import { Action, ColumnConfig, ColumnDataType, Crumb, defaultDetailImports, exportRows, GridColumnsConfigStorageService, GridData, GridElementsManagerComponent, GridFiltersStorageService, GridState, GridStateService, log, mapActions, QueryStatementHandler, Utils, ViewDetailComponent } from '@aurora';
import { lastValueFrom, Observable, takeUntil } from 'rxjs';

@Component({
    selector: 'search-engine-collection-detail',
    templateUrl: './collection-detail.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        ...defaultDetailImports,
        MatCheckboxModule, MatSelectModule, NgForOf,
    ],
})
export class CollectionDetailComponent extends ViewDetailComponent
{
    // ---- customizations ----
    // ..

    // Object retrieved from the database request,
    // it should only be used to obtain uninitialized
    // data in the form, such as relations, etc.
    // It should not be used habitually, since the source of truth is the form.
    managedObject: SearchEngineCollection;

    // relationships
    /* #region variables to manage grid-elements-manager fields */
    @ViewChild('fieldsGridElementsManager') fieldsComponent: GridElementsManagerComponent;
    fieldDialogFg: FormGroup;
    fieldsGridId: string = 'searchEngine::collection.detail.fieldsGridList';
    fieldsGridData$: Observable<GridData<SearchEngineField>>;
    fieldsGridState: GridState = {};
    fieldsColumnsConfig$: Observable<ColumnConfig[]>;
    originFieldsColumnsConfig: ColumnConfig[] = [
        {
            type   : ColumnDataType.ACTIONS,
            field  : 'Actions',
            sticky : true,
            actions: row =>
            {
                const actions = [
                    {
                        id          : 'searchEngine::collection.detail.editField',
                        isViewAction: false,
                        translation : 'edit',
                        icon        : 'mode_edit',
                    },
                    {
                        id          : 'searchEngine::collection.detail.deleteField',
                        isViewAction: false,
                        translation : 'delete',
                        icon        : 'delete',
                    },
                ];

                return actions;
            },
        },
        ...fieldColumnsConfig,
    ];
    /* #endregion variables to manage grid-elements-manager fields */

    // breadcrumb component definition
    breadcrumb: Crumb[] = [
        { translation: 'App' },
        { translation: 'searchEngine.Collections', routerLink: ['/search-engine/collection']},
        { translation: 'searchEngine.Collection' },
    ];

    constructor(
        private readonly collectionService: CollectionService,
        private readonly fieldService: FieldService,
        private readonly gridColumnsConfigStorageService: GridColumnsConfigStorageService,
        private readonly gridFiltersStorageService: GridFiltersStorageService,
        private readonly gridStateService: GridStateService,
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
                    'searchEngine::collection.detail.new' : 'searchEngine::collection.detail.create',
                    'searchEngine::collection.detail.edit': 'searchEngine::collection.detail.update',
                },
            ),
            isViewAction: false,
        });
    }

    createForm(): void
    {
        this.fg = this.fb.group({
            id: ['', [Validators.required, Validators.minLength(36), Validators.maxLength(36)]],
            name: ['', [Validators.required, Validators.maxLength(255)]],
            alias: ['', [Validators.maxLength(255)]],
            status: [null, [Validators.required]],
            documentsNumber: [null, [Validators.maxLength(10)]],
            defaultSortingField: ['', [Validators.maxLength(255)]],
            numMemoryShards: [null, [Validators.maxLength(5)]],
            timestampCreatedAt: [null, [Validators.maxLength(10)]],
            isEnableNestedFields: false,
        });
    }

    /* #region methods to manage Fields */
    createFieldDialogForm(): void
    {
        this.fieldDialogFg = this.fb.group({
            id: ['', [Validators.required, Validators.minLength(36), Validators.maxLength(36)]],
            collectionId: [null, [Validators.required, Validators.minLength(36), Validators.maxLength(36)]],
            name: ['', [Validators.required, Validators.maxLength(255)]],
            type: ['', [Validators.required, Validators.maxLength(63)]],
            isNullable: [false, [Validators.required]],
        });
    }

    handleSubmitFieldForm($event, dialog): void
    {
        // manage validations before execute actions
        if (this.fieldDialogFg.invalid)
        {
            log('[DEBUG] Error to validate form: ', this.fieldDialogFg);
            this.validationMessagesService.validate();
            return;
        }

        // depending on the dialog action we invoke a createField or updateField action
        this.actionService.action({
            id: mapActions(
                dialog.componentInstance.data.currentActionId,
                {
                    'searchEngine::collection.detail.newField' : 'searchEngine::collection.detail.createField',
                    'searchEngine::collection.detail.editField': 'searchEngine::collection.detail.updateField',
                },
            ),
            isViewAction: false,
        });

        dialog.close();
    }
    /* #endregion methods to manage Fields */

    async handleAction(action: Action): Promise<void>
    {
        // add optional chaining (?.) to avoid first call where behaviour subject is undefined
        switch (action?.id)
        {
            /* #region common actions */
            case 'searchEngine::collection.detail.new':
                this.fg.get('id').setValue(Utils.uuid());
                break;

            case 'searchEngine::collection.detail.edit':
                this.collectionService
                    .collection$
                    .pipe(takeUntil(this.unsubscribeAll$))
                    .subscribe(item =>
                    {
                        this.managedObject = item;
                        this.fg.patchValue(item);
                    });

                /* #region edit action to manage fields grid-elements-manager */
                this.fieldsColumnsConfig$ = this.gridColumnsConfigStorageService
                    .getColumnsConfig(this.fieldsGridId, this.originFieldsColumnsConfig)
                    .pipe(takeUntil(this.unsubscribeAll$));

                this.fieldsGridState = {
                    columnFilters: this.gridFiltersStorageService.getColumnFilterState(this.fieldsGridId),
                    page         : this.gridStateService.getPage(this.fieldsGridId),
                    sort         : this.gridStateService.getSort(this.fieldsGridId),
                    search       : this.gridStateService.getSearchState(this.fieldsGridId),
                };

                this.fieldsGridData$ = this.fieldService.pagination$;

                // subscription to get field in edit collection action
                this.fieldService
                    .field$
                    .pipe(takeUntil(this.unsubscribeAll$))
                    .subscribe((field: SearchEngineField) =>
                    {
                        if (field && this.currentAction.id === 'searchEngine::collection.detail.editField')
                        {
                            this.fieldDialogFg.patchValue(field);
                        }
                    });
                /* #endregion edit action to manage fields grid-elements-manager */
                break;

            case 'searchEngine::collection.detail.create':
                try
                {
                    await lastValueFrom(
                        this.collectionService
                            .create<SearchEngineCollection>({
                                object: this.fg.value,
                            }),
                    );

                    this.snackBar.open(
                        `${this.translocoService.translate('searchEngine.Collection')} ${this.translocoService.translate('Created.M')}`,
                        undefined,
                        {
                            verticalPosition: 'top',
                            duration        : 3000,
                        },
                    );

                    this.router.navigate(['search-engine/collection']);
                }
                catch(error)
                {
                    log(`[DEBUG] Catch error in ${action.id} action: ${error}`);
                }
                break;

            case 'searchEngine::collection.detail.update':
                try
                {
                    await lastValueFrom(
                        this.collectionService
                            .updateById<SearchEngineCollection>({
                                object: this.fg.value,
                            }),
                    );

                    this.snackBar.open(
                        `${this.translocoService.translate('searchEngine.Collection')} ${this.translocoService.translate('Saved.M')}`,
                        undefined,
                        {
                            verticalPosition: 'top',
                            duration        : 3000,
                        },
                    );

                    this.router.navigate(['search-engine/collection']);
                }
                catch(error)
                {
                    log(`[DEBUG] Catch error in ${action.id} action: ${error}`);
                }
                break;
                /* #endregion common actions */

            /* #region actions to manage fields grid-elements-manager */
            case 'searchEngine::collection.detail.fieldsPagination':
                await lastValueFrom(
                    this.fieldService
                        .pagination({
                            query: action.meta.query ?
                                action.meta.query :
                                QueryStatementHandler
                                    .init({ columnsConfig: fieldColumnsConfig })
                                    .setColumFilters(this.gridFiltersStorageService.getColumnFilterState(this.fieldsGridId))
                                    .setSort(this.gridStateService.getSort(this.fieldsGridId))
                                    .setPage(this.gridStateService.getPage(this.fieldsGridId))
                                    .setSearch(this.gridStateService.getSearchState(this.fieldsGridId))
                                    .getQueryStatement(),
                            constraint: {
                                where: {
                                    collectionId: this.managedObject.id,
                                },
                            },
                        }),
                );
                break;

            case 'searchEngine::collection.detail.newField':
                this.createFieldDialogForm();
                this.fieldsComponent.handleElementDetailDialog(action.id);
                this.fieldDialogFg.get('id').setValue(Utils.uuid());
                this.fieldDialogFg.get('collectionId').setValue(this.managedObject.id);
                break;

            case 'searchEngine::collection.detail.createField':
                await lastValueFrom(
                    this.fieldService
                        .create<SearchEngineField>({
                            object: this.fieldDialogFg.value,
                        }),
                );

                this.actionService.action({
                    id          : 'searchEngine::collection.detail.fieldsPagination',
                    isViewAction: false,
                });
                break;

            case 'searchEngine::collection.detail.editField':
                this.createFieldDialogForm();
                await lastValueFrom(
                    this.fieldService
                        .findById({
                            id        : action.meta.row.id,
                            constraint: {
                                where: {
                                    collectionId: this.managedObject.id,
                                },
                            },
                        }),
                );
                this.fieldsComponent.handleElementDetailDialog(action.id);
                break;

            case 'searchEngine::collection.detail.updateField':
                this.fieldDialogFg.removeControl('collectionId');

                await lastValueFrom(
                    this.fieldService
                        .updateById<SearchEngineField>({
                            object: this.fieldDialogFg.value,
                        }),
                );
                this.actionService.action({
                    id          : 'searchEngine::collection.detail.fieldsPagination',
                    isViewAction: false,
                });
                break;

            case 'searchEngine::collection.detail.deleteField':
                const deleteFieldDialogRef = this.confirmationService.open({
                    title  : `${this.translocoService.translate('Delete')} ${this.translocoService.translate('searchEngine.Field')}`,
                    message: this.translocoService.translate('DeletionWarning', { entity: this.translocoService.translate('searchEngine.Field') }),
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

                deleteFieldDialogRef
                    .afterClosed()
                    .subscribe(async result =>
                    {
                        if (result === 'confirmed')
                        {
                            try
                            {
                                await lastValueFrom(
                                    this.fieldService
                                        .deleteById<SearchEngineField>({
                                            id: action.meta.row.id,
                                        }),
                                );

                                this.actionService.action({
                                    id          : 'searchEngine::collection.detail.fieldsPagination',
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

            case 'searchEngine::collection.detail.exportFields':
                const fieldRows = await lastValueFrom(
                    this.fieldService
                        .get({
                            query     : action.meta.query,
                            constraint: {
                                where: {
                                    collectionId: this.managedObject.id,
                                },
                            },
                        }),
                );

                const fieldColumns: string[] = fieldColumnsConfig.map(fieldColumnConfig => fieldColumnConfig.field);
                const fieldHeaders = fieldColumns.map(column => this.translocoService.translate('searchEngine.' + column.toPascalCase()));

                exportRows(
                    fieldRows.objects,
                    'fields.' + action.meta.format,
                    fieldColumns,
                    fieldHeaders,
                    action.meta.format,
                );
                break;
                /* #endregion actions to manage fields grid-elements-manager */
        }
    }
}
