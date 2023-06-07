import { ChangeDetectionStrategy, Component, Injector, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { Action, ColumnConfig, ColumnDataType, Crumb, GridColumnsConfigStorageService, GridData, GridElementsManagerComponent, GridFiltersStorageService, GridState, GridStateService, log, mapActions, QueryStatementHandler, Utils, ViewDetailComponent } from '@aurora';
import { lastValueFrom, Observable, takeUntil } from 'rxjs';
import { jobColumnsConfig } from '../job/job.columns-config';
import { QueueJobType, QueueManagerJob, QueueManagerQueue } from '../queue-manager.types';
import { QueueService } from './queue.service';
import { JobService } from '../job/job.service';

@Component({
    selector       : 'queue-manager-queue-detail',
    templateUrl    : './queue-detail.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QueueDetailComponent extends ViewDetailComponent
{
    // ---- customizations ----
    currentJobType: QueueJobType  = 'failed';

    // Object retrieved from the database request,
    // it should only be used to obtain uninitialized
    // data in the form, such as relations, etc.
    // It should not be used habitually, since the source of truth is the form.
    managedObject: QueueManagerQueue;

    // relationships
    /* #region  variables to manage grid-elements-manager jobs */
    @ViewChild('jobsGridElementsManager') jobsComponent: GridElementsManagerComponent;
    managedJob: QueueManagerJob;
    jobDialogFg: FormGroup;
    jobsGridId: string = 'queueManager::queue.detail.jobsGridList';
    jobsGridData$: Observable<GridData<QueueManagerJob>>;
    jobsGridState: GridState = {};
    jobsColumnsConfig$: Observable<ColumnConfig[]>;
    jobsOriginColumnsConfig: ColumnConfig[] = [
        {
            type   : ColumnDataType.ACTIONS,
            field  : 'Actions',
            sticky : true,
            actions: row =>
            {
                return [
                    {
                        id         : 'queueManager::queue.detail.editJob',
                        translation: 'edit',
                        icon       : 'mode_edit',
                    },
                    {
                        id         : 'queueManager::queue.detail.removeJob',
                        translation: 'remove',
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
        ...jobColumnsConfig,
    ];

    // breadcrumb component definition
    breadcrumb: Crumb[] = [
        { translation: 'App' },
        { translation: 'queueManager.Queues', routerLink: ['/queue-manager/queue']},
        { translation: 'queueManager.Queue' },
    ];

    constructor(
        protected readonly injector: Injector,
        private readonly queueService: QueueService,
        private readonly jobService: JobService,
        private readonly gridColumnsConfigStorageService: GridColumnsConfigStorageService,
        private readonly gridFiltersStorageService: GridFiltersStorageService,
        private readonly gridStateService: GridStateService,
    )
    {
        super(injector);
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
                    'queueManager::queue.detail.new' : 'queueManager::queue.detail.create',
                    'queueManager::queue.detail.edit': 'queueManager::queue.detail.update',
                },
            ),
            isViewAction: false,
        });
    }

    createForm(): void
    {
        this.fg = this.fb.group({
            id    : [{ value: '', disabled: true }, [Validators.required, Validators.minLength(36), Validators.maxLength(36)]],
            prefix: [{ value: '', disabled: true }, [Validators.required, Validators.maxLength(50)]],
            name  : [{ value: '', disabled: true }, [Validators.required, Validators.maxLength(50)]],
        });
    }

    /* #region methods to manage Jobs */
    createJobDialogForm(): void
    {
        this.jobDialogFg = this.fb.group({
            id          : [{ value: '', disabled: true }],
            name        : [{ value: '', disabled: true }],
            delay       : [{ value: '', disabled: true }],
            failedReason: [{ value: '', disabled: true }],
        });
    }
    /* #endregion methods to manage Jobs */

    async handleAction(action: Action): Promise<void>
    {
        // add optional chaining (?.) to avoid first call where behaviour subject is undefined
        switch (action?.id)
        {
            /* #region common actions */
            case 'queueManager::queue.detail.new':
                this.fg.get('id').setValue(Utils.uuid());
                break;

            case 'queueManager::queue.detail.edit':
                this.queueService
                    .queue$
                    .pipe(takeUntil(this.unsubscribeAll$))
                    .subscribe(item =>
                    {
                        this.managedObject = item;
                        this.fg.patchValue(item);
                    });

                // jobs grid
                this.jobsColumnsConfig$ = this.gridColumnsConfigStorageService
                    .getColumnsConfig(this.jobsGridId, this.jobsOriginColumnsConfig)
                    .pipe(takeUntil(this.unsubscribeAll$));

                this.jobsGridState = {
                    columnFilters: this.gridFiltersStorageService.getColumnFilterState(this.jobsGridId),
                    page         : this.gridStateService.getPage(this.jobsGridId),
                    sort         : this.gridStateService.getSort(this.jobsGridId),
                    search       : this.gridStateService.getSearchState(this.jobsGridId),
                };

                this.jobsGridData$ = this.jobService.pagination$;

                // subscription to get job in edit author action
                this.jobService
                    .job$
                    .pipe(takeUntil(this.unsubscribeAll$))
                    .subscribe(job =>
                    {
                        if (job && this.currentAction.id === 'queueManager::queue.detail.editJob')
                        {
                            this.managedJob = job;
                            console.log(job.data);
                            this.jobDialogFg.patchValue(job);
                        }
                    });

                break;

            case 'queueManager::queue.detail.create':
                try
                {
                    await lastValueFrom(
                        this.queueService
                            .create<QueueManagerQueue>({
                                object: this.fg.value,
                            }),
                    );

                    this.snackBar.open(
                        `${this.translocoService.translate('queueManager.Queue')} ${this.translocoService.translate('Created.M')}`,
                        undefined,
                        {
                            verticalPosition: 'top',
                            duration        : 3000,
                        },
                    );

                    this.router.navigate(['queue-manager/queue']);
                }
                catch(error)
                {
                    log(`[DEBUG] Catch error in ${action.id} action: ${error}`);
                }
                break;

            case 'queueManager::queue.detail.update':
                try
                {
                    await lastValueFrom(
                        this.queueService
                            .updateById<QueueManagerQueue>({
                                object: this.fg.value,
                            }),
                    );

                    this.snackBar.open(
                        `${this.translocoService.translate('queueManager.Queue')} ${this.translocoService.translate('Saved.M')}`,
                        undefined,
                        {
                            verticalPosition: 'top',
                            duration        : 3000,
                        },
                    );

                    this.router.navigate(['queue-manager/queue']);
                }
                catch(error)
                {
                    log(`[DEBUG] Catch error in ${action.id} action: ${error}`);
                }
                break;
                /* #endregion common actions */

            /* #region actions to manage jobs grid-elements-manager */
            case 'queueManager::queue.detail.changeTypeJobsPagination':
                this.currentJobType = action.meta.jobType;

                // reset request pagination
                this.gridStateService.setPageState(this.jobsGridId, { pageIndex: 0, pageSize: 10 });
                // reset grid component pagination
                this.jobsGridState = { ...this.jobsGridState, page: { pageIndex: 0, pageSize: 10 }};

                this.actionService.action({
                    id          : 'queueManager::queue.detail.jobsPagination',
                    isViewAction: false,
                    noCache     : true,
                });
                break;

            case 'queueManager::queue.detail.jobsPagination':
                await lastValueFrom(
                    this.jobService
                        .pagination({
                            query: action.meta.query ?
                                action.meta.query :
                                QueryStatementHandler
                                    .init({ columnsConfig: jobColumnsConfig })
                                    .setColumFilters(this.gridFiltersStorageService.getColumnFilterState(this.jobsGridId))
                                    .setSort(this.gridStateService.getSort(this.jobsGridId))
                                    .setPage(this.gridStateService.getPage(this.jobsGridId))
                                    .setSearch(this.gridStateService.getSearchState(this.jobsGridId))
                                    .getQueryStatement(),
                            constraint: {
                                where: {
                                    queueId: this.managedObject.id,
                                    jobType: this.currentJobType,
                                },
                            },
                        }),
                );
                break;

            case 'queueManager::queue.detail.editJob':
                this.createJobDialogForm();
                await lastValueFrom(
                    this.jobService
                        .findById({
                            id  : action.meta.row.id,
                            name: this.managedObject.name,
                        }),
                );
                this.jobsComponent.handleElementDetailDialog(action.id);
                break;

            case 'queueManager::queue.detail.removeJob':
                const removeJobDialogRef = this.confirmationService.open({
                    title  : `${this.translocoService.translate('Delete')} ${this.translocoService.translate('queueManager.Job')} ${action.meta.row.id}`,
                    message: `${this.translocoService.translate('DeletionWarning', { entity: this.translocoService.translate('queueManager.Job') })} ${action.meta.row.id}`,
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

                removeJobDialogRef
                    .afterClosed()
                    .subscribe(async result =>
                    {
                        if (result === 'confirmed')
                        {
                            try
                            {
                                await lastValueFrom(
                                    this.jobService
                                        .deleteById<QueueManagerJob>(
                                            action.meta.row.id,
                                            this.managedObject.name,
                                        ),
                                );

                                this.actionService.action({
                                    id          : 'queueManager::queue.detail.jobsPagination',
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
            /* #endregion actions to manage jobs grid-elements-manager */

        }
    }
}
