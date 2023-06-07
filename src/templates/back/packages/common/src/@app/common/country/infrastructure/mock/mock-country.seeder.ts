import { Injectable } from '@nestjs/common';
import { MockSeeder } from '@aurorajs.dev/core';
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
    CountryMapType,
    CountryAvailableLangs,
    CountryCreatedAt,
    CountryUpdatedAt,
    CountryDeletedAt,
    CountryI18nLangId,
    CountryI18nName,
    CountryI18nSlug,
    CountryI18nAdministrativeAreaLevel1,
    CountryI18nAdministrativeAreaLevel2,
    CountryI18nAdministrativeAreaLevel3,
} from '../../domain/value-objects';
import { CommonCountry } from '../../domain/country.aggregate';
import { countries } from './mock-country.data';
import * as _ from 'lodash';

@Injectable()
export class MockCountrySeeder extends MockSeeder<CommonCountry>
{
    public collectionSource: CommonCountry[];

    constructor()
    {
        super();
        this._createMock();
    }

    private _createMock(): void
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
                    new CountryMapType(country.mapType),
                    new CountryAvailableLangs(country.availableLangs),
                    new CountryCreatedAt({ currentTimestamp: true }),
                    new CountryUpdatedAt({ currentTimestamp: true }),
                    new CountryDeletedAt(null),
                    new CountryI18nLangId(country.langId),
                    new CountryI18nName(country.name),
                    new CountryI18nSlug(country.slug),
                    new CountryI18nAdministrativeAreaLevel1(country.administrativeAreaLevel1),
                    new CountryI18nAdministrativeAreaLevel2(country.administrativeAreaLevel2),
                    new CountryI18nAdministrativeAreaLevel3(country.administrativeAreaLevel3),
                ),
            );
        }
    }
}