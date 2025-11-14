import {
    ChangeDetectionStrategy,
    Component,
    signal,
    ViewEncapsulation,
    WritableSignal,
} from '@angular/core';
import {
    QueueManagerJob,
    QueueManagerJobRegistry,
    QueueManagerJobState,
} from '@apps/queue-manager';
import { JobRegistryService } from '@apps/queue-manager/job-registry';
import {
    Action,
    Crumb,
    defaultDetailImports,
    IsObjectEmptyPipe,
    log,
    mapActions,
    MatFormFieldAppearanceComponent,
    SnackBarInvalidFormComponent,
    uuid,
    ViewDetailComponent,
} from '@aurora';
import { NgxJsonViewerModule } from 'ngx-json-viewer';
import { lastValueFrom, takeUntil } from 'rxjs';
import { JobService } from '../job/job.service';

@Component({
    selector: 'queue-manager-job-registry-detail',
    templateUrl: './job-registry-detail.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        ...defaultDetailImports,
        IsObjectEmptyPipe,
        MatFormFieldAppearanceComponent,
        NgxJsonViewerModule,
    ],
})
export class JobRegistryDetailComponent extends ViewDetailComponent {
    // ---- customizations ----
    jobState = QueueManagerJobState;

    // Object retrieved from the database request,
    // it should only be used to obtain uninitialized
    // data in the form, such as relations, etc.
    // It should not be used habitually, since the source of truth is the form.
    managedObject: WritableSignal<QueueManagerJob> = signal(null);

    // breadcrumb component definition
    breadcrumb: Crumb[] = [
        { translation: 'App' },
        {
            translation: 'queueManager.JobsRegistry',
            routerLink: ['/queue-manager/job-registry'],
        },
        { translation: 'queueManager.JobRegistry' },
    ];

    constructor(
        private readonly jobRegistryService: JobRegistryService,
        private readonly jobService: JobService,
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
                'queueManager::jobRegistry.detail.new':
                    'queueManager::jobRegistry.detail.create',
                'queueManager::jobRegistry.detail.edit':
                    'queueManager::jobRegistry.detail.update',
            }),
            isViewAction: false,
        });
    }

    createForm(): void {
        /* eslint-disable key-spacing */
        this.fg = this.fb.group({
            id: [{ value: '', disabled: true }],
            name: [{ value: '', disabled: true }],
            state: [{ value: '', disabled: true }],
            delay: [{ value: '', disabled: true }],
            failedReason: [{ value: '', disabled: true }],
        });
        /* eslint-enable key-spacing */
    }

    async handleAction(action: Action): Promise<void> {
        // add optional chaining (?.) to avoid first call where behaviour subject is undefined
        switch (action?.id) {
            /* #region common actions */
            case 'queueManager::jobRegistry.detail.new':
                this.fg.get('id').setValue(uuid());
                break;

            case 'queueManager::jobRegistry.detail.edit':
                this.jobService.job$
                    .pipe(takeUntil(this.unsubscribeAll$))
                    .subscribe((item) => {
                        this.managedObject.set(item);
                        this.fg.patchValue(item);
                    });
                break;

            case 'queueManager::jobRegistry.detail.create':
                try {
                    await lastValueFrom(
                        this.jobRegistryService.create<QueueManagerJobRegistry>(
                            {
                                object: this.fg.value,
                            },
                        ),
                    );

                    this.snackBar.open(
                        `${this.translocoService.translate('queueManager.JobRegistry')} ${this.translocoService.translate('Created.M')}`,
                        undefined,
                        {
                            verticalPosition: 'top',
                            duration: 3000,
                        },
                    );

                    this.router.navigate(['queue-manager/job-registry']);
                } catch (error) {
                    log(`[DEBUG] Catch error in ${action.id} action: ${error}`);
                }
                break;

            case 'queueManager::jobRegistry.detail.update':
                try {
                    await lastValueFrom(
                        this.jobRegistryService.updateById<QueueManagerJobRegistry>(
                            {
                                object: this.fg.value,
                            },
                        ),
                    );

                    this.snackBar.open(
                        `${this.translocoService.translate('queueManager.JobRegistry')} ${this.translocoService.translate('Saved.M')}`,
                        undefined,
                        {
                            verticalPosition: 'top',
                            duration: 3000,
                        },
                    );

                    this.router.navigate(['queue-manager/job-registry']);
                } catch (error) {
                    log(`[DEBUG] Catch error in ${action.id} action: ${error}`);
                }
                break;
            /* #endregion common actions */
        }
    }
}
