import { ChangeDetectionStrategy, Component, Injector, ViewEncapsulation } from '@angular/core';
import { Validators } from '@angular/forms';
import { Action, Crumb, log, mapActions, Utils, ViewDetailComponent } from '@aurora';
import { lastValueFrom, takeUntil } from 'rxjs';
import { AuditingHttpCommunication } from '../auditing.types';
import { HttpCommunicationService } from './http-communication.service';

@Component({
    selector       : 'auditing-http-communication-detail',
    templateUrl    : './http-communication-detail.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HttpCommunicationDetailComponent extends ViewDetailComponent
{
    // ---- customizations ----
    // ..

    // Object retrieved from the database request,
    // it should only be used to obtain uninitialized
    // data in the form, such as relations, etc.
    // It should not be used habitually, since the source of truth is the form.
    managedObject: AuditingHttpCommunication;

    // breadcrumb component definition
    breadcrumb: Crumb[] = [
        { translation: 'App' },
        { translation: 'auditing.HttpCommunications', routerLink: ['/auditing/http-communication']},
        { translation: 'auditing.HttpCommunication' },
    ];

    constructor(
        protected readonly injector: Injector,
        private readonly httpCommunicationService: HttpCommunicationService,
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
                    'auditing::httpCommunication.detail.new' : 'auditing::httpCommunication.detail.create',
                    'auditing::httpCommunication.detail.edit': 'auditing::httpCommunication.detail.update',
                },
            ),
            isViewAction: false,
        });
    }

    createForm(): void
    {
        this.fg = this.fb.group({
            id                  : ['', [Validators.required, Validators.minLength(36), Validators.maxLength(36)]],
            code                : [{ value: '', disabled: true }],
            event               : [{ value: '', disabled: true }],
            status              : [{ value: '', disabled: true }, [Validators.maxLength(5)]],
            method              : [{ value: '', disabled: true }, [Validators.required, Validators.maxLength(25)]],
            url                 : [{ value: '', disabled: true }, [Validators.required, Validators.maxLength(2048)]],
            httpRequest         : null,
            httpRequestRejected : null,
            httpResponse        : null,
            httpResponseRejected: null,
        });
    }

    async handleAction(action: Action): Promise<void>
    {
        // add optional chaining (?.) to avoid first call where behaviour subject is undefined
        switch (action?.id)
        {
            case 'auditing::httpCommunication.detail.new':
                this.fg.get('id').setValue(Utils.uuid());
                break;

            case 'auditing::httpCommunication.detail.edit':
                this.httpCommunicationService
                    .httpCommunication$
                    .pipe(takeUntil(this.unsubscribeAll$))
                    .subscribe(item =>
                    {
                        this.managedObject = item;
                        this.fg.patchValue(item);
                    });
                break;

            case 'auditing::httpCommunication.detail.create':
                try
                {
                    await lastValueFrom(
                        this.httpCommunicationService
                            .create<AuditingHttpCommunication>({
                                object: this.fg.value,
                            }),
                    );

                    this.snackBar.open(
                        `${this.translocoService.translate('auditing.HttpCommunication')} ${this.translocoService.translate('Created.M')}`,
                        undefined,
                        {
                            verticalPosition: 'top',
                            duration        : 3000,
                        },
                    );

                    this.router.navigate(['auditing/http-communication']);
                }
                catch(error)
                {
                    log(`[DEBUG] Catch error in ${action.id} action: ${error}`);
                }
                break;

            case 'auditing::httpCommunication.detail.update':
                try
                {
                    await lastValueFrom(
                        this.httpCommunicationService
                            .updateById<AuditingHttpCommunication>({
                                object: this.fg.value,
                            }),
                    );

                    this.snackBar.open(
                        `${this.translocoService.translate('auditing.HttpCommunication')} ${this.translocoService.translate('Saved.M')}`,
                        undefined,
                        {
                            verticalPosition: 'top',
                            duration        : 3000,
                        },
                    );

                    this.router.navigate(['auditing/http-communication']);
                }
                catch(error)
                {
                    log(`[DEBUG] Catch error in ${action.id} action: ${error}`);
                }
                break;
        }
    }
}
