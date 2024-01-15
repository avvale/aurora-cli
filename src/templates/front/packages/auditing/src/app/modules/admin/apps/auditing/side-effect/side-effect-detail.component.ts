import { KeyValuePipe, NgForOf } from '@angular/common';
import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { Validators } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { AuditingSideEffect, AuditingSideEffectEvent} from '@apps/auditing/auditing.types';
import { SideEffectService } from '@apps/auditing/side-effect';
import { Action, CanPipe, Crumb, defaultDetailImports, IsObjectEmptyPipe, log, mapActions, MatFormFieldAppearanceComponent, Utils, ViewDetailComponent } from '@aurora';
import { lastValueFrom, takeUntil } from 'rxjs';
import { NgxJsonViewerModule } from 'ngx-json-viewer';

@Component({
    selector       : 'auditing-side-effect-detail',
    templateUrl    : './side-effect-detail.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone     : true,
    imports        : [
        ...defaultDetailImports,
        CanPipe, IsObjectEmptyPipe, KeyValuePipe, MatCheckboxModule, MatFormFieldAppearanceComponent, MatSelectModule, NgForOf, NgxJsonViewerModule,
    ],
})
export class SideEffectDetailComponent extends ViewDetailComponent
{
    // ---- customizations ----
    auditingSideEffectEvent = AuditingSideEffectEvent;

    // Object retrieved from the database request,
    // it should only be used to obtain uninitialized
    // data in the form, such as relations, etc.
    // It should not be used habitually, since the source of truth is the form.
    managedObject: AuditingSideEffect;

    // breadcrumb component definition
    breadcrumb: Crumb[] = [
        { translation: 'App' },
        { translation: 'auditing.SideEffects', routerLink: ['/auditing/side-effect']},
        { translation: 'auditing.SideEffect' },
    ];

    constructor(
        private readonly sideEffectService: SideEffectService,
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
                    'auditing::sideEffect.detail.new' : 'auditing::sideEffect.detail.create',
                    'auditing::sideEffect.detail.edit': 'auditing::sideEffect.detail.update',
                },
            ),
            isViewAction: false,
        });
    }

    createForm(): void
    {
        this.fg = this.fb.group({
            id: ['', [Validators.required, Validators.minLength(36), Validators.maxLength(36)]],
            tags: null,
            modelPath: ['', [Validators.required, Validators.maxLength(1022)]],
            modelName: ['', [Validators.required, Validators.maxLength(255)]],
            operationId: ['', [Validators.minLength(36), Validators.maxLength(36)]],
            operationSort: null,
            accountId: ['', [Validators.required, Validators.minLength(36), Validators.maxLength(36)]],
            email: ['', [Validators.required, Validators.maxLength(127)]],
            event: ['', [Validators.required]],
            auditableId: ['', [Validators.required, Validators.minLength(36), Validators.maxLength(36)]],
            oldValue: null,
            newValue: null,
            ip: ['', [Validators.maxLength(19)]],
            method: ['', [Validators.required]],
            baseUrl: ['', [Validators.maxLength(2046)]],
            params: null,
            query: null,
            body: null,
            userAgent: ['', [Validators.maxLength(1022)]],
            isRollback: false,
            rollbackSideEffectId: ['', [Validators.minLength(36), Validators.maxLength(36)]],
        });
    }

    async handleAction(action: Action): Promise<void>
    {
        // add optional chaining (?.) to avoid first call where behaviour subject is undefined
        switch (action?.id)
        {
            /* #region common actions */
            case 'auditing::sideEffect.detail.new':
                this.fg.get('id').setValue(Utils.uuid());
                break;

            case 'auditing::sideEffect.detail.edit':
                this.sideEffectService
                    .sideEffect$
                    .pipe(takeUntil(this.unsubscribeAll$))
                    .subscribe(item =>
                    {
                        this.managedObject = item;
                        this.fg.disable();
                        this.fg.patchValue(item);
                    });
                break;

            case 'auditing::sideEffect.detail.create':
                try
                {
                    await lastValueFrom(
                        this.sideEffectService
                            .create<AuditingSideEffect>({
                                object: this.fg.value,
                            }),
                    );

                    this.snackBar.open(
                        `${this.translocoService.translate('auditing.SideEffect')} ${this.translocoService.translate('Created.M')}`,
                        undefined,
                        {
                            verticalPosition: 'top',
                            duration        : 3000,
                        },
                    );

                    this.router.navigate(['auditing/side-effect']);
                }
                catch(error)
                {
                    log(`[DEBUG] Catch error in ${action.id} action: ${error}`);
                }
                break;

            case 'auditing::sideEffect.detail.update':
                try
                {
                    await lastValueFrom(
                        this.sideEffectService
                            .updateById<AuditingSideEffect>({
                                object: this.fg.value,
                            }),
                    );

                    this.snackBar.open(
                        `${this.translocoService.translate('auditing.SideEffect')} ${this.translocoService.translate('Saved.M')}`,
                        undefined,
                        {
                            verticalPosition: 'top',
                            duration        : 3000,
                        },
                    );

                    this.router.navigate(['auditing/side-effect']);
                }
                catch(error)
                {
                    log(`[DEBUG] Catch error in ${action.id} action: ${error}`);
                }
                break;
                /* #endregion common actions */

            // ---- customizations ----
            case 'auditing::sideEffect.detail.rollback':
                const closeAndSapCommunicationDialogRef = this.confirmationService.open({
                    title  : this.translocoService.translate('auditing.Rollback'),
                    message: this.translocoService.translate('auditing.RollbackAlertMessage'),
                    icon   : {
                        show : true,
                        name : 'heroicons_outline:exclamation-triangle',
                        color: 'warn',
                    },
                    actions: {
                        confirm: {
                            show : true,
                            label: this.translocoService.translate('auditing.Rollback'),
                            color: 'warn',
                        },
                        cancel: {
                            show : true,
                            label: this.translocoService.translate('Cancel'),
                        },
                    },
                    dismissible: true,
                });

                closeAndSapCommunicationDialogRef
                    .afterClosed()
                    .subscribe(async result =>
                    {
                        if (result === 'confirmed')
                        {
                            try
                            {
                                await lastValueFrom(
                                    this.sideEffectService
                                        .rollbackSideEffect<boolean>({
                                            object: {
                                                id: this.managedObject.id,
                                            },
                                        }),
                                );

                                this.snackBar.open(
                                    `${this.translocoService.translate('auditing.RollbackSuccessfully')}`,
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
                        }
                    });
                break;
        }
    }
}
