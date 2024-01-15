import { CommonResource } from '../common.types';
import { ResourceService } from '../resource/resource.service';
import { NgForOf } from '@angular/common';
import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { Validators } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { AttachmentFamilyService } from '@apps/common/attachment-family';
import { CommonAttachmentFamily } from '@apps/common/common.types';
import { Action, Crumb, defaultDetailImports, log, mapActions, Utils, ViewDetailComponent } from '@aurora';
import { lastValueFrom, Observable, takeUntil } from 'rxjs';

@Component({
    selector       : 'common-attachment-family-detail',
    templateUrl    : './attachment-family-detail.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone     : true,
    imports        : [
        ...defaultDetailImports,
        MatSelectModule, NgForOf,
    ],
})
export class AttachmentFamilyDetailComponent extends ViewDetailComponent
{
    // ---- customizations ----
    // ..

    // Object retrieved from the database request,
    // it should only be used to obtain uninitialized
    // data in the form, such as relations, etc.
    // It should not be used habitually, since the source of truth is the form.
    managedObject: CommonAttachmentFamily;

    // relationships
    resources$: Observable<CommonResource[]>;

    // breadcrumb component definition
    breadcrumb: Crumb[] = [
        { translation: 'App' },
        { translation: 'common.AttachmentFamilies', routerLink: ['/common/attachment-family']},
        { translation: 'common.AttachmentFamily' },
    ];

    constructor(
        private readonly attachmentFamilyService: AttachmentFamilyService,
        private readonly resourceService: ResourceService,
    )
    {
        super();
    }

    // this method will be called after the ngOnInit of
    // the parent class you can use instead of ngOnInit
    init(): void
    {
        /**/
        this.resources$ = this.resourceService.resources$;
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
                    'common::attachmentFamily.detail.new' : 'common::attachmentFamily.detail.create',
                    'common::attachmentFamily.detail.edit': 'common::attachmentFamily.detail.update',
                },
            ),
            isViewAction: false,
        });
    }

    createForm(): void
    {
        this.fg = this.fb.group({
            id: ['', [Validators.required, Validators.minLength(36), Validators.maxLength(36)]],
            resourceId: [null, [Validators.required, Validators.minLength(36), Validators.maxLength(36)]],
            code: ['', [Validators.required, Validators.maxLength(63)]],
            name: ['', [Validators.required, Validators.maxLength(100)]],
            width: null,
            height: null,
            fitType: null,
            quality: null,
            sizes: null,
            format: null,
        });
    }

    async handleAction(action: Action): Promise<void>
    {
        // add optional chaining (?.) to avoid first call where behaviour subject is undefined
        switch (action?.id)
        {
            /* #region common actions */
            case 'common::attachmentFamily.detail.new':
                this.fg.get('id').setValue(Utils.uuid());
                break;

            case 'common::attachmentFamily.detail.edit':
                this.attachmentFamilyService
                    .attachmentFamily$
                    .pipe(takeUntil(this.unsubscribeAll$))
                    .subscribe(item =>
                    {
                        this.managedObject = item;
                        this.fg.patchValue(item);
                    });
                break;

            case 'common::attachmentFamily.detail.create':
                try
                {
                    await lastValueFrom(
                        this.attachmentFamilyService
                            .create<CommonAttachmentFamily>({
                                object: this.fg.value,
                            }),
                    );

                    this.snackBar.open(
                        `${this.translocoService.translate('common.AttachmentFamily')} ${this.translocoService.translate('Created.M')}`,
                        undefined,
                        {
                            verticalPosition: 'top',
                            duration        : 3000,
                        },
                    );

                    this.router.navigate(['common/attachment-family']);
                }
                catch(error)
                {
                    log(`[DEBUG] Catch error in ${action.id} action: ${error}`);
                }
                break;

            case 'common::attachmentFamily.detail.update':
                try
                {
                    await lastValueFrom(
                        this.attachmentFamilyService
                            .updateById<CommonAttachmentFamily>({
                                object: this.fg.value,
                            }),
                    );

                    this.snackBar.open(
                        `${this.translocoService.translate('common.AttachmentFamily')} ${this.translocoService.translate('Saved.M')}`,
                        undefined,
                        {
                            verticalPosition: 'top',
                            duration        : 3000,
                        },
                    );

                    this.router.navigate(['common/attachment-family']);
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
