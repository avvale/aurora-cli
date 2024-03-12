import { inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CommonAdministrativeArea, CommonAdministrativeAreaLevel1, CommonAdministrativeAreaLevel2, CommonAdministrativeAreaLevel3, CommonCountry } from '@apps/common/common.types';
import { Observable, ReplaySubject, lastValueFrom } from 'rxjs';
import { CoreCurrentLangService, SelectSearchService, SessionService } from '@aurora';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AdministrativeAreaLevel3Service } from '@apps/common/administrative-area-level-3';
import { AdministrativeAreaLevel2Service } from '@apps/common/administrative-area-level-2';
import { AdministrativeAreaLevel1Service } from '@apps/common/administrative-area-level-1';
import { CountryService } from '@apps/common/country/country.service';
import { AdministrativeAreasService } from './administrative-areas.service';

type GConstructor<T> = new (...args: any[]) => T;
type GConstructorBase = GConstructor<{
    sessionService: SessionService;
 }>;

export const AdministrativeAreasMixin = <TBase extends GConstructorBase>(Base: TBase): any =>
{
    return class extends Base
    {
        coreCurrentLangService: CoreCurrentLangService = inject(CoreCurrentLangService);
        selectSearchService: SelectSearchService = inject(SelectSearchService);

        countryService: CountryService = inject(CountryService);
        administrativeAreaLevel1Service: AdministrativeAreaLevel1Service = inject(AdministrativeAreaLevel1Service);
        administrativeAreaLevel2Service: AdministrativeAreaLevel2Service = inject(AdministrativeAreaLevel2Service);
        administrativeAreaLevel3Service: AdministrativeAreaLevel3Service = inject(AdministrativeAreaLevel3Service);
        administrativeAreasService: AdministrativeAreasService = inject(AdministrativeAreasService);

        countryFilterCtrl: FormControl = new FormControl<string>('');
        administrativeAreaLevel1FilterCtrl: FormControl = new FormControl<string>('');
        administrativeAreaLevel2FilterCtrl: FormControl = new FormControl<string>('');
        administrativeAreaLevel3FilterCtrl: FormControl = new FormControl<string>('');

        filteredCountries$: ReplaySubject<CommonCountry[]> = new ReplaySubject<CommonCountry[]>(1);
        filteredAdministrativeAreasLevel1$: ReplaySubject<CommonAdministrativeAreaLevel1[]> = new ReplaySubject<CommonAdministrativeAreaLevel1[]>(1);
        filteredAdministrativeAreasLevel2$: ReplaySubject<CommonAdministrativeAreaLevel2[]> = new ReplaySubject<CommonAdministrativeAreaLevel2[]>(1);
        filteredAdministrativeAreasLevel3$: ReplaySubject<CommonAdministrativeAreaLevel3[]> = new ReplaySubject<CommonAdministrativeAreaLevel3[]>(1);

        country$: Observable<CommonCountry>;
        administrativeAreasLevel1$: Observable<CommonAdministrativeAreaLevel1[]>;
        administrativeAreasLevel2$: Observable<CommonAdministrativeAreaLevel2[]>;
        administrativeAreasLevel3$: Observable<CommonAdministrativeAreaLevel3[]>;

        currentAdministrativeAreasLevel1: CommonAdministrativeAreaLevel1[];
        currentAdministrativeAreasLevel2: CommonAdministrativeAreaLevel2[];
        currentAdministrativeAreasLevel3: CommonAdministrativeAreaLevel3[];

        // init country filter
        initCountriesFilter(countries: CommonCountry[]): void
        {
            // init select filter with all items
            this.filteredCountries$.next(countries);

            // listen for country search field value changes
            this.countryFilterCtrl
                .valueChanges
                .pipe(takeUntilDestroyed())
                .subscribe(async () =>
                {
                    this.selectSearchService
                        .filterSelect<CommonCountry>(
                            this.countryFilterCtrl,
                            countries,
                            this.filteredCountries$,
                        );
                });
        }

        // init filter and current AdministrativeAreasLevel1
        initAdministrativeAreasLevel1Filter(administrativeAreasLevel1: CommonAdministrativeAreaLevel1[]): void
        {
            this.currentAdministrativeAreasLevel1 = administrativeAreasLevel1;

            // init select filter with all items
            this.filteredAdministrativeAreasLevel1$.next(this.currentAdministrativeAreasLevel1);

            // listen for administrative area level 1 search field value changes
            this.administrativeAreaLevel1FilterCtrl
                .valueChanges
                .pipe(takeUntilDestroyed())
                .subscribe(async () =>
                {
                    this.selectSearchService
                        .filterSelect<CommonAdministrativeAreaLevel1>(
                            this.administrativeAreaLevel1FilterCtrl,
                            this.currentAdministrativeAreasLevel1,
                            this.filteredAdministrativeAreasLevel1$,
                        );
                });
        }

        // init filter and current AdministrativeAreasLevel2
        initAdministrativeAreasLevel2Filter(administrativeAreasLevel2: CommonAdministrativeAreaLevel2[]): void
        {
            this.currentAdministrativeAreasLevel2 = administrativeAreasLevel2;

            // init select filter with all items
            this.filteredAdministrativeAreasLevel2$.next(this.currentAdministrativeAreasLevel2);

            // listen for administrative area level 2 search field value changes
            this.administrativeAreaLevel2FilterCtrl
                .valueChanges
                .pipe(takeUntilDestroyed())
                .subscribe(async () =>
                {
                    this.selectSearchService
                        .filterSelect<CommonAdministrativeAreaLevel2>(
                            this.administrativeAreaLevel2FilterCtrl,
                            this.currentAdministrativeAreasLevel2,
                            this.filteredAdministrativeAreasLevel2$,
                        );
                });
        }

        // init filter and current AdministrativeAreasLevel3
        initAdministrativeAreasLevel3Filter(administrativeAreasLevel3: CommonAdministrativeAreaLevel3[]): void
        {
            this.currentAdministrativeAreasLevel3 = administrativeAreasLevel3;

            // init select filter with all items
            this.filteredAdministrativeAreasLevel3$.next(this.currentAdministrativeAreasLevel3);

            // listen for administrative area level 3 search field value changes
            this.administrativeAreaLevel3FilterCtrl
                .valueChanges
                .pipe(takeUntilDestroyed())
                .subscribe(async () =>
                {
                    this.selectSearchService
                        .filterSelect<CommonAdministrativeAreaLevel3>(
                            this.administrativeAreaLevel3FilterCtrl,
                            this.currentAdministrativeAreasLevel3,
                            this.filteredAdministrativeAreasLevel3$,
                        );
                });
        }

        initAdministrativeAreas(): void
        {
            // get administrative areas observable to expose to mixed components
            this.country$ = this.countryService.country$;
            this.administrativeAreasLevel1$ = this.administrativeAreaLevel1Service.administrativeAreasLevel1$;
            this.administrativeAreasLevel2$ = this.administrativeAreaLevel2Service.administrativeAreasLevel2$;
            this.administrativeAreasLevel3$ = this.administrativeAreaLevel3Service.administrativeAreasLevel3$;

            // listen for administrative areas changes to update current administrative
            //  areas and filtered administrative areas this allows to change
            // the administrative areas according country changes
            this.administrativeAreasLevel1$
                .pipe(takeUntilDestroyed())
                .subscribe((administrativeAreasLevel1: CommonAdministrativeAreaLevel1[]) =>
                {
                    this.currentAdministrativeAreasLevel1 = administrativeAreasLevel1;
                    this.filteredAdministrativeAreasLevel1$.next(administrativeAreasLevel1);
                });

            this.administrativeAreasLevel2$
                .pipe(takeUntilDestroyed())
                .subscribe((administrativeAreasLevel2: CommonAdministrativeAreaLevel2[]) =>
                {
                    this.currentAdministrativeAreasLevel2 = administrativeAreasLevel2;
                    this.filteredAdministrativeAreasLevel2$.next(administrativeAreasLevel2);
                });

            this.administrativeAreasLevel3$
                .pipe(takeUntilDestroyed())
                .subscribe((administrativeAreasLevel3: CommonAdministrativeAreaLevel3[]) =>
                {
                    this.currentAdministrativeAreasLevel3 = administrativeAreasLevel3;
                    this.filteredAdministrativeAreasLevel3$.next(administrativeAreasLevel3);
                });
        }

        async handleChangeCountry(
            $event,
            country: CommonCountry,
        ): Promise<void>
        {
            if (!$event.isUserInput) return;

            // reset observable administrative areas, to avoid showing
            // previous data from other editions or creations
            this.administrativeAreasService.resetAdministrativeAreas();

            // set country to set labels in select from administrative areas
            this.countryService.countrySubject$.next(country);

            if (!country.administrativeAreas || country.administrativeAreas.length === 0)
            {
                await this.loadAdministrativeAreaLevel1({ country });
            }
            else if (country.administrativeAreas.includes(CommonAdministrativeArea.ADMINISTRATIVE_AREA_LEVEL_1))
            {
                await this.loadAdministrativeAreaLevel1({ country });
            }
            else if (country.administrativeAreas.includes(CommonAdministrativeArea.ADMINISTRATIVE_AREA_LEVEL_2))
            {
                await this.loadAdministrativeAreaLevel2({ country });
            }
            else if (country.administrativeAreas.includes(CommonAdministrativeArea.ADMINISTRATIVE_AREA_LEVEL_3))
            {
                await this.loadAdministrativeAreaLevel3({ country });
            }
        }

        async handleChangeAdministrativeArea1(
            $event,
            administrativeAreaLevel1: CommonAdministrativeAreaLevel1,
        ): Promise<void>
        {
            if (!$event.isUserInput) return;
            await this.loadAdministrativeAreaLevel2({ administrativeAreaLevel1 });
        }

        async handleChangeAdministrativeArea2(
            $event,
            administrativeAreaLevel2: CommonAdministrativeAreaLevel2,
        ): Promise<void>
        {
            if (!$event.isUserInput) return;
            this.loadAdministrativeAreaLevel3({ administrativeAreaLevel2 });
        }

        async loadAdministrativeAreaLevel1({
            country = null,
        } : {
            country?: CommonCountry;
        }): Promise<void>
        {
            await lastValueFrom(
                this.administrativeAreaLevel1Service.get({
                    query: {
                        where: {
                            countryId: country.id,
                        },
                    },
                    headers: {
                        'Content-Language': this.coreCurrentLangService.currentLang[this.sessionService.get('searchKeyLang')],
                    },
                }),
            );
        }

        async loadAdministrativeAreaLevel2({
            country = null,
            administrativeAreaLevel1 = null,
        } : {
            country?: CommonCountry;
            administrativeAreaLevel1?: CommonAdministrativeAreaLevel1;
        }): Promise<void>
        {
            await lastValueFrom(
                this.administrativeAreaLevel2Service.get({
                    query: {
                        where: {
                            countryId                 : country ? country.id : undefined,
                            administrativeAreaLevel1Id: administrativeAreaLevel1 ? administrativeAreaLevel1.id : undefined,
                        },
                        order: [
                            ['name', 'asc'],
                        ],
                    },
                    headers: {
                        'Content-Language': this.coreCurrentLangService.currentLang[this.sessionService.get('searchKeyLang')],
                    },
                }),
            );
        }

        async loadAdministrativeAreaLevel3({
            country = null,
            administrativeAreaLevel1 = null,
            administrativeAreaLevel2 = null,
        } : {
            country?: CommonCountry;
            administrativeAreaLevel1?: CommonAdministrativeAreaLevel1;
            administrativeAreaLevel2?: CommonAdministrativeAreaLevel2;
        }): Promise<void>
        {
            await lastValueFrom(
                this.administrativeAreaLevel3Service.get({
                    query: {
                        where: {
                            countryId                 : country ? country.id : undefined,
                            administrativeAreaLevel1Id: administrativeAreaLevel1 ? administrativeAreaLevel1.id : undefined,
                            administrativeAreaLevel2Id: administrativeAreaLevel2 ? administrativeAreaLevel2.id : undefined,
                        },
                        order: [
                            ['name', 'asc'],
                        ],
                    },
                    headers: {
                        'Content-Language': this.coreCurrentLangService.currentLang[this.sessionService.get('searchKeyLang')],
                    },
                }),
            );
        }
    };
};