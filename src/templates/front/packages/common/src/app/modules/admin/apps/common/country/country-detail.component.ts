import { KeyValuePipe, NgForOf } from '@angular/common';
import { ChangeDetectionStrategy, Component, Injector, ViewEncapsulation } from '@angular/core';
import { Validators } from '@angular/forms';
import { Action, CoreCurrentLangService, CoreLang, Crumb, FlagLangComponent, Utils, ViewDetailComponent, defaultDetailImports, log, mapActions } from '@aurora';
import { lastValueFrom, takeUntil } from 'rxjs';
import { CommonCountry, CommonCountryMapType } from '../common.types';
import { CountryService } from './country.service';
import { MatSelectModule } from '@angular/material/select';

@Component({
    selector       : 'common-country-detail',
    templateUrl    : './country-detail.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone     : true,
    imports        : [
        ...defaultDetailImports,
        FlagLangComponent, KeyValuePipe, MatSelectModule, NgForOf,
    ],
})
export class CountryDetailComponent extends ViewDetailComponent
{
    // ---- customizations ----
    commonCountryMapType = CommonCountryMapType;

    // Object retrieved from the database request,
    // it should only be used to obtain uninitialized
    // data in the form, such as relations, etc.
    // It should not be used habitually, since the source of truth is the form.
    managedObject: CommonCountry;
    currentLang: CoreLang;
    fallbackLang: CoreLang;

    // breadcrumb component definition
    breadcrumb: Crumb[] = [
        { translation: 'App' },
        { translation: 'common.Countries', routerLink: ['/common/country']},
        { translation: 'common.Country' },
    ];

    constructor(
		private readonly coreCurrentLangService: CoreCurrentLangService,
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
            langId: ['', [Validators.required, Validators.minLength(36), Validators.maxLength(36)]],
            name: ['', [Validators.required]],
            slug: ['', [Validators.required, Validators.maxLength(1024)]],
            administrativeAreaLevel1: ['', [Validators.maxLength(50)]],
            administrativeAreaLevel2: ['', [Validators.maxLength(50)]],
            administrativeAreaLevel3: ['', [Validators.maxLength(50)]],
        });
    }

    // disable fields when manage object
    // that language is not APP_FALLBACK_LANG
    disabledNotI18nFields(): void
    {
        this.fg.get('id').disable();
        this.fg.get('iso3166Alpha2').disable();
        this.fg.get('iso3166Alpha3').disable();
        this.fg.get('iso3166Numeric').disable();
        this.fg.get('customCode').disable();
        this.fg.get('prefix').disable();
        this.fg.get('image').disable();
        this.fg.get('sort').disable();
        this.fg.get('administrativeAreas').disable();
        this.fg.get('latitude').disable();
        this.fg.get('longitude').disable();
        this.fg.get('zoom').disable();
        this.fg.get('mapType').disable();
    }

    async handleAction(action: Action): Promise<void>
    {
        // add optional chaining (?.) to avoid first call where behaviour subject is undefined
        switch (action?.id)
        {
            /* #region common actions */
            case 'common::country.detail.new':
                this.currentLang = this.coreCurrentLangService.currentLang;

                // only when hasta id param, we are creating
                // a record with an alternative language
                if (this.activatedRoute.snapshot.paramMap.get('id'))
                {
                    this.countryService
                        .country$
                        .pipe(takeUntil(this.unsubscribeAll$))
                        .subscribe(item =>
                        {
                            this.managedObject = item;
                            this.fg.patchValue(item);
                            this.disabledNotI18nFields();
                        });
                }
                else
                {
                    // only when we create a record
                    // with default language
                    this.fg.get('id').setValue(Utils.uuid());
                }

                this.fg.get('langId').setValue(this.currentLang.id);
                break;

            case 'common::country.detail.edit':
                this.currentLang = this.coreCurrentLangService.currentLang;
                this.fallbackLang = this.sessionService.get('fallbackLang');

                this.countryService
                    .country$
                    .pipe(takeUntil(this.unsubscribeAll$))
                    .subscribe(item =>
                    {
                        this.managedObject = item;
                        this.fg.patchValue(item);
                        if (this.fallbackLang.id !== this.currentLang.id) this.disabledNotI18nFields();
                    });
                break;

            case 'common::country.detail.create':
                try
                {
                    await lastValueFrom(
                        this.countryService
                            .create<CommonCountry>({
                                // getRawValue to send disabled values
                                object : this.fg.getRawValue(),
                                headers: {
                                    'Content-Language': this.currentLang[this.sessionService.get('searchKeyLang')],
                                },
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
                                // getRawValue to send disabled values
                                object : this.fg.getRawValue(),
                                headers: {
                                    'Content-Language': this.currentLang[this.sessionService.get('searchKeyLang')],
                                },
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

            case 'common::country.detail.delete':
                const deleteDialogRef = this.confirmationService.open({
                    title  : `${this.translocoService.translate('DeleteTranslation')} ${this.translocoService.translate('Of').toLowerCase()} ${this.translocoService.translate('common.Country').toLowerCase()}`,
                    message: this.translocoService.translate('DeletionWarning', { entity: this.translocoService.translate('common.Country') }),
                    icon   : {
                        show : true,
                        name : 'heroicons_outline:exclamation-triangle',
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

                deleteDialogRef.afterClosed()
                    .subscribe(async result =>
                    {
                        if (result === 'confirmed')
                        {
                            try
                            {
                                await lastValueFrom(
                                    this.countryService
                                        .deleteById<CommonCountry>({
                                            id     : this.managedObject.id,
                                            headers: {
                                                'Content-Language': this.currentLang[this.sessionService.get('searchKeyLang')],
                                            },
                                        }),
                                );

                                this.router.navigate(['common/country']);
                            }
                            catch(error)
                            {
                                log(`[DEBUG] Catch error in ${action.id} action: ${error}`);
                            }
                        }
                    });
                break;
                /* #endregion common actions */
        }
    }
}
