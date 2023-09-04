import { CommonAdministrativeAreaLevel2 } from '../common.types';
import { AdministrativeAreaLevel2Service } from './administrative-area-level-2.service';
import { ChangeDetectionStrategy, Component, Injector, ViewEncapsulation } from '@angular/core';
import { Validators } from '@angular/forms';
import { Action, Crumb, defaultDetailImports, log, mapActions, Utils, ViewDetailComponent } from '@aurora';
import { lastValueFrom, takeUntil } from 'rxjs';
import { MatSelectModule } from '@angular/material/select';

@Component({
    selector       : 'common-administrative-area-level-2-detail',
    templateUrl    : './administrative-area-level-2-detail.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone     : true,
    imports        : [
        ...defaultDetailImports,
        MatSelectModule,
    ],
})
export class AdministrativeAreaLevel2DetailComponent extends ViewDetailComponent
{
    // ---- customizations ----
    // ..

    // Object retrieved from the database request,
    // it should only be used to obtain uninitialized
    // data in the form, such as relations, etc.
    // It should not be used habitually, since the source of truth is the form.
    managedObject: CommonAdministrativeAreaLevel2;

    // breadcrumb component definition
    breadcrumb: Crumb[] = [
        { translation: 'App' },
        { translation: 'common.AdministrativeAreasLevel2', routerLink: ['/common/administrative-area-level-2']},
        { translation: 'common.AdministrativeAreaLevel2' },
    ];

    constructor(
        private readonly administrativeAreaLevel2Service: AdministrativeAreaLevel2Service,
        protected readonly injector: Injector,
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
                    'common::administrativeAreaLevel2.detail.new' : 'common::administrativeAreaLevel2.detail.create',
                    'common::administrativeAreaLevel2.detail.edit': 'common::administrativeAreaLevel2.detail.update',
                },
            ),
            isViewAction: false,
        });
    }

    createForm(): void
    {
        this.fg = this.fb.group({
            id: ['', [Validators.required, Validators.minLength(36), Validators.maxLength(36)]],
            countryId: ['', [Validators.required, Validators.minLength(36), Validators.maxLength(36)]],
            administrativeAreaLevel1Id: ['', [Validators.required, Validators.minLength(36), Validators.maxLength(36)]],
            code: ['', [Validators.required, Validators.maxLength(8)]],
            customCode: ['', [Validators.maxLength(10)]],
            name: ['', [Validators.required, Validators.maxLength(100)]],
            slug: ['', [Validators.required, Validators.maxLength(100)]],
            latitude: null,
            longitude: null,
            zoom: [null, [Validators.maxLength(2)]],
            mapType: [null, [Validators.required]],
        });
    }

    async handleAction(action: Action): Promise<void>
    {
        // add optional chaining (?.) to avoid first call where behaviour subject is undefined
        switch (action?.id)
        {
            /* #region common actions */
            case 'common::administrativeAreaLevel2.detail.new':
                this.fg.get('id').setValue(Utils.uuid());
                break;

            case 'common::administrativeAreaLevel2.detail.edit':
                this.administrativeAreaLevel2Service
                    .administrativeAreaLevel2$
                    .pipe(takeUntil(this.unsubscribeAll$))
                    .subscribe(item =>
                    {
                        this.managedObject = item;
                        this.fg.patchValue(item);
                    });
                break;

            case 'common::administrativeAreaLevel2.detail.create':
                try
                {
                    await lastValueFrom(
                        this.administrativeAreaLevel2Service
                            .create<CommonAdministrativeAreaLevel2>({
                                object: this.fg.value,
                            }),
                    );

                    this.snackBar.open(
                        `${this.translocoService.translate('common.AdministrativeAreaLevel2')} ${this.translocoService.translate('Created.M')}`,
                        undefined,
                        {
                            verticalPosition: 'top',
                            duration        : 3000,
                        },
                    );

                    this.router.navigate(['common/administrative-area-level-2']);
                }
                catch(error)
                {
                    log(`[DEBUG] Catch error in ${action.id} action: ${error}`);
                }
                break;

            case 'common::administrativeAreaLevel2.detail.update':
                try
                {
                    await lastValueFrom(
                        this.administrativeAreaLevel2Service
                            .updateById<CommonAdministrativeAreaLevel2>({
                                object: this.fg.value,
                            }),
                    );

                    this.snackBar.open(
                        `${this.translocoService.translate('common.AdministrativeAreaLevel2')} ${this.translocoService.translate('Saved.M')}`,
                        undefined,
                        {
                            verticalPosition: 'top',
                            duration        : 3000,
                        },
                    );

                    this.router.navigate(['common/administrative-area-level-2']);
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
