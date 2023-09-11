import { CommonCountry, CommonICountryRepository, commonMockCountryData } from '@app/common/country';
import {
    CommonCountryAdministrativeAreas,
    CommonCountryAvailableLangs,
    CommonCountryCreatedAt,
    CommonCountryCustomCode,
    CommonCountryDeletedAt,
    CommonCountryI18nAdministrativeAreaLevel1,
    CommonCountryI18nAdministrativeAreaLevel2,
    CommonCountryI18nAdministrativeAreaLevel3,
    CommonCountryI18nLangId,
    CommonCountryI18nName,
    CommonCountryI18nSlug,
    CommonCountryId,
    CommonCountryImage,
    CommonCountryIso3166Alpha2,
    CommonCountryIso3166Alpha3,
    CommonCountryIso3166Numeric,
    CommonCountryLatitude,
    CommonCountryLongitude,
    CommonCountryMapType,
    CommonCountryPrefix,
    CommonCountrySort,
    CommonCountryUpdatedAt,
    CommonCountryZoom,
} from '@app/common/country/domain/value-objects';
import { MockRepository, Utils } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CommonMockCountryRepository extends MockRepository<CommonCountry> implements CommonICountryRepository
{
    public readonly repository: any;
    public readonly aggregateName: string = 'CommonCountry';
    public collectionSource: CommonCountry[];

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

        for (const itemCollection of <any[]>commonMockCountryData)
        {
            itemCollection['createdAt'] = now;
            itemCollection['updatedAt'] = now;
            itemCollection['deletedAt'] = null;

            this.collectionSource.push(CommonCountry.register(
                new CommonCountryId(itemCollection.id),
                new CommonCountryIso3166Alpha2(itemCollection.iso3166Alpha2),
                new CommonCountryIso3166Alpha3(itemCollection.iso3166Alpha3),
                new CommonCountryIso3166Numeric(itemCollection.iso3166Numeric),
                new CommonCountryCustomCode(itemCollection.customCode),
                new CommonCountryPrefix(itemCollection.prefix),
                new CommonCountryImage(itemCollection.image),
                new CommonCountrySort(itemCollection.sort),
                new CommonCountryAdministrativeAreas(itemCollection.administrativeAreas),
                new CommonCountryLatitude(itemCollection.latitude),
                new CommonCountryLongitude(itemCollection.longitude),
                new CommonCountryZoom(itemCollection.zoom),
                new CommonCountryMapType(itemCollection.mapType),
                new CommonCountryAvailableLangs(itemCollection.availableLangs),
                new CommonCountryCreatedAt(itemCollection.createdAt),
                new CommonCountryUpdatedAt(itemCollection.updatedAt),
                new CommonCountryDeletedAt(itemCollection.deletedAt),
                new CommonCountryI18nLangId(itemCollection.langId),
                new CommonCountryI18nName(itemCollection.name),
                new CommonCountryI18nSlug(itemCollection.slug),
                new CommonCountryI18nAdministrativeAreaLevel1(itemCollection.administrativeAreaLevel1),
                new CommonCountryI18nAdministrativeAreaLevel2(itemCollection.administrativeAreaLevel2),
                new CommonCountryI18nAdministrativeAreaLevel3(itemCollection.administrativeAreaLevel3),
            ));
        }
    }
}
