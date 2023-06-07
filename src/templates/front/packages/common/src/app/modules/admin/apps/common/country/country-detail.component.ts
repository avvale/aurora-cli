import { ChangeDetectionStrategy, Component, Injector, ViewEncapsulation } from '@angular/core';
import { Validators } from '@angular/forms';
import { Action, Crumb, log, mapActions, Utils, ViewDetailComponent } from '@aurora';
import { lastValueFrom, takeUntil } from 'rxjs';
import { CommonCountry } from '../common.types';
import { CountryService } from './country.service';

@Component({
    selector       : 'common-country-detail',
    templateUrl    : './country-detail.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountryDetailComponent extends ViewDetailComponent
{
    // ---- customizations ----
    // ..

    // Object retrieved from the database request,
    // it should only be used to obtain uninitialized
    // data in the form, such as relations, etc.
    // It should not be used habitually, since the source of truth is the form.
    managedObject: CommonCountry;

    // breadcrumb component definition
    breadcrumb: Crumb[] = [
        { translation: 'App' },
        { translation: 'common.Countries', routerLink: ['/common/country']},
        { translation: 'common.Country' },
    ];

    constructor(
		private readonly countryService: CountryService,
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
                    'common::country.detail.new' : 'common::country.detail.create',
                    'common::country.detail.edit': 'common::country.detail.update',
                },
            ),
            isViewAction: false,
        });
    }

    createForm(): void
    {
        this.fg = this.fb.group({
            id: ['', [Validators.required, Validators.minLength(36), Validators.maxLength(36)]],
            iso3166Alpha2: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(2)]],
            iso3166Alpha3: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(3)]],
            iso3166Numeric: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(3)]],
            customCode: ['', [Validators.maxLength(10)]],
            prefix: ['', [Validators.maxLength(5)]],
            image: ['', [Validators.maxLength(1024)]],
            sort: [null, [Validators.maxLength(6)]],
            administrativeAreas: null,
            latitude: null,
            longitude: null,
            zoom: [null, [Validators.maxLength(2)]],
            mapType: ['', [Validators.required]],
            availableLangs: null,
            langId: ['', [Validators.required, Validators.minLength(36), Validators.maxLength(36)]],
            name: ['', [Validators.required]],
            slug: ['', [Validators.required, Validators.maxLength(1024)]],
            administrativeAreaLevel1: ['', [Validators.maxLength(50)]],
            administrativeAreaLevel2: ['', [Validators.maxLength(50)]],
            administrativeAreaLevel3: ['', [Validators.maxLength(50)]],
        });
    }

    async handleAction(action: Action): Promise<void>
    {
        // add optional chaining (?.) to avoid first call where behaviour subject is undefined
        switch (action?.id)
        {
            /* #region common actions */
            case 'common::country.detail.new':
                this.fg.get('id').setValue(Utils.uuid());
                break;

            case 'common::country.detail.edit':
                this.countryService
                    .country$
                    .pipe(takeUntil(this.unsubscribeAll$))
                    .subscribe(item =>
                    {
                        this.managedObject = item;
                        this.fg.patchValue(item);
                    });
                break;

            case 'common::country.detail.create':
                try
                {
                    await lastValueFrom(
                        this.countryService
                            .create<CommonCountry>({
                                object: this.fg.value,
                            }),
                    );

                    this.snackBar.open(
                        `${this.translocoService.translate('common.Country')} ${this.translocoService.translate('Created.M')}`,
                        undefined,
                        {
                            verticalPosition: 'top',
                            duration        : 3000,
                        },
                    );

                    this.router.navigate(['common/country']);
                }
                catch(error)
                {
                    log(`[DEBUG] Catch error in ${action.id} action: ${error}`);
                }
                break;

            case 'common::country.detail.update':
                try
                {
                    await lastValueFrom(
                        this.countryService
                            .updateById<CommonCountry>({
                                object: this.fg.value,
                            }),
                    );

                    this.snackBar.open(
                        `${this.translocoService.translate('common.Country')} ${this.translocoService.translate('Saved.M')}`,
                        undefined,
                        {
                            verticalPosition: 'top',
                            duration        : 3000,
                        },
                    );

                    this.router.navigate(['common/country']);
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
