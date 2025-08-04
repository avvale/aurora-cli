import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { Validators } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { AdministrativeAreaLevel3Service } from '@apps/common/administrative-area-level-3';
import { CommonAdministrativeAreaLevel3 } from '@apps/common/common.types';
import { Action, Crumb, defaultDetailImports, log, mapActions, Utils, ViewDetailComponent } from '@aurora';
import { lastValueFrom, takeUntil } from 'rxjs';

@Component({
    selector: 'common-administrative-area-level-3-detail',
    templateUrl: './administrative-area-level-3-detail.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        ...defaultDetailImports,
        MatSelectModule,
    ],
})
export class AdministrativeAreaLevel3DetailComponent extends ViewDetailComponent
{
    // ---- customizations ----
    // ..

    // Object retrieved from the database request,
    // it should only be used to obtain uninitialized
    // data in the form, such as relations, etc.
    // It should not be used habitually, since the source of truth is the form.
    managedObject: CommonAdministrativeAreaLevel3;

    // breadcrumb component definition
    breadcrumb: Crumb[] = [
        { translation: 'App' },
        { translation: 'common.AdministrativeAreasLevel3', routerLink: ['/common/administrative-area-level-3']},
        { translation: 'common.AdministrativeAreaLevel3' },
    ];

    constructor(
        private readonly administrativeAreaLevel3Service: AdministrativeAreaLevel3Service,
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
                    'common::administrativeAreaLevel3.detail.new' : 'common::administrativeAreaLevel3.detail.create',
                    'common::administrativeAreaLevel3.detail.edit': 'common::administrativeAreaLevel3.detail.update',
                },
            ),
            isViewAction: false,
        });
    }

    createForm(): void
    {
        this.fg = this.fb.group({
            id: ['', [Validators.required, Validators.minLength(36), Validators.maxLength(36)]],
            countryId: [null, [Validators.required, Validators.minLength(36), Validators.maxLength(36)]],
            administrativeAreaLevel1Id: [null, [Validators.required, Validators.minLength(36), Validators.maxLength(36)]],
            administrativeAreaLevel2Id: [null, [Validators.required, Validators.minLength(36), Validators.maxLength(36)]],
            code: ['', [Validators.required, Validators.maxLength(8)]],
            customCode: ['', [Validators.maxLength(63)]],
            name: ['', [Validators.required, Validators.maxLength(127)]],
            slug: ['', [Validators.required, Validators.maxLength(127)]],
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
            case 'common::administrativeAreaLevel3.detail.new':
                this.fg.get('id').setValue(Utils.uuid());
                break;

            case 'common::administrativeAreaLevel3.detail.edit':
                this.administrativeAreaLevel3Service
                    .administrativeAreaLevel3$
                    .pipe(takeUntil(this.unsubscribeAll$))
                    .subscribe(item =>
                    {
                        this.managedObject = item;
                        this.fg.patchValue(item);
                    });
                break;

            case 'common::administrativeAreaLevel3.detail.create':
                try
                {
                    await lastValueFrom(
                        this.administrativeAreaLevel3Service
                            .create<CommonAdministrativeAreaLevel3>({
                                object: this.fg.value,
                            }),
                    );

                    this.snackBar.open(
                        `${this.translocoService.translate('common.AdministrativeAreaLevel3')} ${this.translocoService.translate('Created.M')}`,
                        undefined,
                        {
                            verticalPosition: 'top',
                            duration        : 3000,
                        },
                    );

                    this.router.navigate(['common/administrative-area-level-3']);
                }
                catch(error)
                {
                    log(`[DEBUG] Catch error in ${action.id} action: ${error}`);
                }
                break;

            case 'common::administrativeAreaLevel3.detail.update':
                try
                {
                    await lastValueFrom(
                        this.administrativeAreaLevel3Service
                            .updateById<CommonAdministrativeAreaLevel3>({
                                object: this.fg.value,
                            }),
                    );

                    this.snackBar.open(
                        `${this.translocoService.translate('common.AdministrativeAreaLevel3')} ${this.translocoService.translate('Saved.M')}`,
                        undefined,
                        {
                            verticalPosition: 'top',
                            duration        : 3000,
                        },
                    );

                    this.router.navigate(['common/administrative-area-level-3']);
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
