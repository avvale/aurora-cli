import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { Validators } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { CommonLang } from '@apps/common/common.types';
import { LangService } from '@apps/common/lang';
import { Action, Crumb, defaultDetailImports, log, mapActions, Utils, ViewDetailComponent } from '@aurora';
import { lastValueFrom, takeUntil } from 'rxjs';

@Component({
    selector       : 'common-lang-detail',
    templateUrl    : './lang-detail.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone     : true,
    imports        : [
        ...defaultDetailImports,
        MatCheckboxModule, MatSelectModule,
    ],
})
export class LangDetailComponent extends ViewDetailComponent
{
    // ---- customizations ----
    // ..

    // Object retrieved from the database request,
    // it should only be used to obtain uninitialized
    // data in the form, such as relations, etc.
    // It should not be used habitually, since the source of truth is the form.
    managedObject: CommonLang;

    // breadcrumb component definition
    breadcrumb: Crumb[] = [
        { translation: 'App' },
        { translation: 'common.Langs', routerLink: ['/common/lang']},
        { translation: 'common.Lang' },
    ];

    constructor(
        private readonly langService: LangService,
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
                    'common::lang.detail.new' : 'common::lang.detail.create',
                    'common::lang.detail.edit': 'common::lang.detail.update',
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
            image: ['', [Validators.maxLength(1022)]],
            iso6392: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(2)]],
            iso6393: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(3)]],
            ietf: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(5)]],
            customCode: ['', [Validators.maxLength(63)]],
            dir: [null, [Validators.required]],
            sort: null,
            isActive: [false, [Validators.required]],
        });
    }

    async handleAction(action: Action): Promise<void>
    {
        // add optional chaining (?.) to avoid first call where behaviour subject is undefined
        switch (action?.id)
        {
            /* #region common actions */
            case 'common::lang.detail.new':
                this.fg.get('id').setValue(Utils.uuid());
                break;

            case 'common::lang.detail.edit':
                this.langService
                    .lang$
                    .pipe(takeUntil(this.unsubscribeAll$))
                    .subscribe(item =>
                    {
                        this.managedObject = item;
                        this.fg.patchValue(item);
                    });
                break;

            case 'common::lang.detail.create':
                try
                {
                    await lastValueFrom(
                        this.langService
                            .create<CommonLang>({
                                object: this.fg.value,
                            }),
                    );

                    this.snackBar.open(
                        `${this.translocoService.translate('common.Lang')} ${this.translocoService.translate('Created.M')}`,
                        undefined,
                        {
                            verticalPosition: 'top',
                            duration        : 3000,
                        },
                    );

                    this.router.navigate(['common/lang']);
                }
                catch(error)
                {
                    log(`[DEBUG] Catch error in ${action.id} action: ${error}`);
                }
                break;

            case 'common::lang.detail.update':
                try
                {
                    await lastValueFrom(
                        this.langService
                            .updateById<CommonLang>({
                                object: this.fg.value,
                            }),
                    );

                    this.snackBar.open(
                        `${this.translocoService.translate('common.Lang')} ${this.translocoService.translate('Saved.M')}`,
                        undefined,
                        {
                            verticalPosition: 'top',
                            duration        : 3000,
                        },
                    );

                    this.router.navigate(['common/lang']);
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
