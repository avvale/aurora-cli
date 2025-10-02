import { ChangeDetectionStrategy, Component, signal, ViewEncapsulation, WritableSignal } from '@angular/core';
import { Validators } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { InboxService } from '@apps/message/inbox';
import { MessageInbox } from '@apps/message/message.types';
import { Action, Crumb, DatetimepickerSqlFormatDirective, defaultDetailImports, log, mapActions, SnackBarInvalidFormComponent, uuid, ViewDetailComponent } from '@aurora';
import { MtxDatetimepickerModule } from '@ng-matero/extensions/datetimepicker';
import { QuillEditorComponent } from 'ngx-quill';
import { lastValueFrom, takeUntil } from 'rxjs';

@Component({
    selector: 'message-inbox-detail',
    templateUrl: './inbox-detail.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        ...defaultDetailImports,
        DatetimepickerSqlFormatDirective, MatCheckboxModule, MtxDatetimepickerModule,
        QuillEditorComponent,
    ],
})
export class InboxDetailComponent extends ViewDetailComponent
{
    // ---- customizations ----
    // ..

    // Object retrieved from the database request,
    // it should only be used to obtain uninitialized
    // data in the form, such as relations, etc.
    // It should not be used habitually, since the source of truth is the form.
    managedObject: WritableSignal<MessageInbox> = signal(null);
    quillModules: any = {
        toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['link'],
            [{ align: []}, { list: 'ordered' }, { list: 'bullet' }],
            ['clean'],
        ],
    };

    // breadcrumb component definition
    breadcrumb: Crumb[] = [
        { translation: 'App' },
        { translation: 'message.Inboxes', routerLink: ['/message/inbox']},
        { translation: 'message.Inbox' },
    ];

    constructor(
        private readonly inboxService: InboxService,
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

            this.snackBar.openFromComponent(
                SnackBarInvalidFormComponent,
                {
                    data: {
                        message: `${this.translocoService.translate('InvalidForm')}`,
                        textButton: `${this.translocoService.translate('InvalidFormOk')}`,
                    },
                    panelClass: 'error-snackbar',
                    verticalPosition: 'top',
                    duration: 10000,
                },
            );
            return;
        }

        this.actionService.action({
            id: mapActions(
                this.currentViewAction.id,
                {
                    'message::inbox.detail.new' : 'message::inbox.detail.create',
                    'message::inbox.detail.edit': 'message::inbox.detail.update',
                },
            ),
            isViewAction: false,
        });
    }

    createForm(): void
    {
        /* eslint-disable key-spacing */
        this.fg = this.fb.group({
            id: ['', [Validators.required, Validators.minLength(36), Validators.maxLength(36)]],
            tenantIds: [],
            messageId: [null, [Validators.minLength(36), Validators.maxLength(36)]],
            sort: [null, [Validators.required]],
            accountId: ['', [Validators.required, Validators.minLength(36), Validators.maxLength(36)]],
            accountCode: ['', [Validators.maxLength(128)]],
            isImportant: [false, [Validators.required]],
            sentAt: ['', [Validators.required]],
            subject: ['', [Validators.required, Validators.maxLength(255)]],
            body: ['', [Validators.required]],
            link: ['', [Validators.maxLength(2046)]],
            isInternalLink: false,
            image: null,
            icon: ['', [Validators.maxLength(64)]],
            attachments: null,
            isRead: [false, [Validators.required]],
            isReadAtLeastOnce: [false, [Validators.required]],
        });
        /* eslint-enable key-spacing */
    }

    async handleAction(action: Action): Promise<void>
    {
        // add optional chaining (?.) to avoid first call where behaviour subject is undefined
        switch (action?.id)
        {
            /* #region common actions */
            case 'message::inbox.detail.new':
                this.fg.get('id').setValue(uuid());
                break;

            case 'message::inbox.detail.edit':
                this.inboxService
                    .inbox$
                    .pipe(takeUntil(this.unsubscribeAll$))
                    .subscribe(item =>
                    {
                        this.managedObject.set(item);
                        this.fg.patchValue(item);
                    });
                break;

            case 'message::inbox.detail.create':
                try
                {
                    await lastValueFrom(
                        this.inboxService
                            .create<MessageInbox>({
                                object: this.fg.value,
                            }),
                    );

                    this.snackBar.open(
                        `${this.translocoService.translate('message.Inbox')} ${this.translocoService.translate('Created.M')}`,
                        undefined,
                        {
                            verticalPosition: 'top',
                            duration: 3000,
                        },
                    );

                    this.router.navigate(['message/inbox']);
                }
                catch(error)
                {
                    log(`[DEBUG] Catch error in ${action.id} action: ${error}`);
                }
                break;

            case 'message::inbox.detail.update':
                try
                {
                    await lastValueFrom(
                        this.inboxService
                            .updateById<MessageInbox>({
                                object: this.fg.value,
                            }),
                    );

                    this.snackBar.open(
                        `${this.translocoService.translate('message.Inbox')} ${this.translocoService.translate('Saved.M')}`,
                        undefined,
                        {
                            verticalPosition: 'top',
                            duration: 3000,
                        },
                    );

                    this.router.navigate(['message/inbox']);
                }
                catch(error)
                {
                    log(`[DEBUG] Catch error in ${action.id} action: ${error}`);
                }
                break;
                /* #endregion common actions */
        }
    }
}
