import { Injectable } from '@nestjs/common';
import { MockSeeder } from 'aurora-ts-core';
import {
    CountryId,
    CountryIso3166Alpha2,
    CountryIso3166Alpha3,
    CountryIso3166Numeric,
    CountryCustomCode,
    CountryPrefix,
    CountryImage,
    CountrySort,
    CountryAdministrativeAreas,
    CountryLatitude,
    CountryLongitude,
    CountryZoom,
    CountryDataLang,
    CountryCreatedAt,
    CountryUpdatedAt,
    CountryDeletedAt,
    CountryI18NLangId,
    CountryI18NName,
    CountryI18NSlug,
    CountryI18NAdministrativeAreaLevel1,
    CountryI18NAdministrativeAreaLevel2,
    CountryI18NAdministrativeAreaLevel3,
} from '../../domain/value-objects';
import { CommonCountry } from '../../domain/country.aggregate';
import { countries } from '../seeds/country.seed';
import * as _ from 'lodash';

@Injectable()
export class MockCountrySeeder extends MockSeeder<CommonCountry>
{
    public collectionSource: CommonCountry[];

    constructor()
    {
        super();
        this._createMockDataLang();
    }

    private _createMockDataLang(): void
    {
        this.collectionSource = [];

        for (const country of _.orderBy(countries, ['id']))
        {
            this.collectionSource.push(
                CommonCountry.register(
                    new CountryId(country.id),
                    new CountryIso3166Alpha2(country.iso3166Alpha2),
                    new CountryIso3166Alpha3(country.iso3166Alpha3),
                    new CountryIso3166Numeric(country.iso3166Numeric),
                    new CountryCustomCode(country.customCode),
                    new CountryPrefix(country.prefix),
                    new CountryImage(country.image),
                    new CountrySort(country.sort),
                    new CountryAdministrativeAreas(country.administrativeAreas),
                    new CountryLatitude(country.latitude),
                    new CountryLongitude(country.longitude),
                    new CountryZoom(country.zoom),
                    new CountryDataLang(country.dataLang),
                    new CountryCreatedAt({ currentTimestamp: true }),
                    new CountryUpdatedAt({ currentTimestamp: true }),
                    new CountryDeletedAt(null),
                    new CountryI18NLangId(country.langId),
                    new CountryI18NName(country.name),
                    new CountryI18NSlug(country.slug),
                    new CountryI18NAdministrativeAreaLevel1(country.administrativeAreaLevel1),
                    new CountryI18NAdministrativeAreaLevel2(country.administrativeAreaLevel2),
                    new CountryI18NAdministrativeAreaLevel3(country.administrativeAreaLevel3),
                ),
            );
        }
    }
}