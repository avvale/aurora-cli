import { Injectable } from '@nestjs/common';
import { MockRepository, Utils } from '@aurorajs.dev/core';
import { ICountryRepository } from '@app/common/country/domain/country.repository';
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
} from '@app/common/country/domain/value-objects';
import { CommonCountry } from '../../domain/country.aggregate';
import { countries } from '../seeds/country.seed';

@Injectable()
export class MockCountryRepository extends MockRepository<CommonCountry> implements ICountryRepository
{
    public readonly repository: any;
    public readonly aggregateName: string = 'CommonCountry';
    public collectionSource: CommonCountry[];
    public deletedAtInstance: CountryDeletedAt = new CountryDeletedAt(null);

    constructor()
    {
        super();
        this.createSourceMockData();
    }

    public reset(): void
    {
        this.createSourceMockData();
    }

    private createSourceMockData(): void
    {
        this.collectionSource = [];
        const now = Utils.nowTimestamp();

        for (const itemCollection of <any[]>countries)
        {
            itemCollection['createdAt'] = now;
            itemCollection['updatedAt'] = now;
            itemCollection['deletedAt'] = null;

            this.collectionSource.push(CommonCountry.register(
                new CountryId(itemCollection.id),
                new CountryIso3166Alpha2(itemCollection.iso3166Alpha2),
                new CountryIso3166Alpha3(itemCollection.iso3166Alpha3),
                new CountryIso3166Numeric(itemCollection.iso3166Numeric),
                new CountryCustomCode(itemCollection.customCode),
                new CountryPrefix(itemCollection.prefix),
                new CountryImage(itemCollection.image),
                new CountrySort(itemCollection.sort),
                new CountryAdministrativeAreas(itemCollection.administrativeAreas),
                new CountryLatitude(itemCollection.latitude),
                new CountryLongitude(itemCollection.longitude),
                new CountryZoom(itemCollection.zoom),
                new CountryAvailableLangs(itemCollection.availableLangs),
                new CountryCreatedAt(itemCollection.createdAt),
                new CountryUpdatedAt(itemCollection.updatedAt),
                new CountryDeletedAt(itemCollection.deletedAt),
                new CountryI18nLangId(itemCollection.langId),
                new CountryI18nName(itemCollection.name),
                new CountryI18nSlug(itemCollection.slug),
                new CountryI18nAdministrativeAreaLevel1(itemCollection.administrativeAreaLevel1),
                new CountryI18nAdministrativeAreaLevel2(itemCollection.administrativeAreaLevel2),
                new CountryI18nAdministrativeAreaLevel3(itemCollection.administrativeAreaLevel3),
            ));
        }
    }
}