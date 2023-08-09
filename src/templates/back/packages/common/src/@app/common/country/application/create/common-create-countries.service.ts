import { CommonAddCountriesContextEvent, CommonCountry, CommonICountryI18nRepository, CommonICountryRepository } from '@app/common/country';
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
import { CQMetadata } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class CommonCreateCountriesService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: CommonICountryRepository,
        private readonly repositoryI18n: CommonICountryI18nRepository,
    ) {}

    async main(
        countries: {
            id: CommonCountryId;
            iso3166Alpha2: CommonCountryIso3166Alpha2;
            iso3166Alpha3: CommonCountryIso3166Alpha3;
            iso3166Numeric: CommonCountryIso3166Numeric;
            customCode: CommonCountryCustomCode;
            prefix: CommonCountryPrefix;
            image: CommonCountryImage;
            sort: CommonCountrySort;
            administrativeAreas: CommonCountryAdministrativeAreas;
            latitude: CommonCountryLatitude;
            longitude: CommonCountryLongitude;
            zoom: CommonCountryZoom;
            mapType: CommonCountryMapType;
            availableLangs: CommonCountryAvailableLangs;
            langId: CommonCountryI18nLangId;
            name: CommonCountryI18nName;
            slug: CommonCountryI18nSlug;
            administrativeAreaLevel1: CommonCountryI18nAdministrativeAreaLevel1;
            administrativeAreaLevel2: CommonCountryI18nAdministrativeAreaLevel2;
            administrativeAreaLevel3: CommonCountryI18nAdministrativeAreaLevel3;
        } [],
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const aggregateCountries = countries.map(country => CommonCountry.register(
            country.id,
            country.iso3166Alpha2,
            country.iso3166Alpha3,
            country.iso3166Numeric,
            country.customCode,
            country.prefix,
            country.image,
            country.sort,
            country.administrativeAreas,
            country.latitude,
            country.longitude,
            country.zoom,
            country.mapType,
            country.availableLangs,
            new CommonCountryCreatedAt({ currentTimestamp: true }),
            new CommonCountryUpdatedAt({ currentTimestamp: true }),
            null, // deleteAt
            country.langId,
            country.name,
            country.slug,
            country.administrativeAreaLevel1,
            country.administrativeAreaLevel2,
            country.administrativeAreaLevel3,
        ));

        // insert
        // delete duplicate elements from multiple languages
        await this.repository.insert(
            aggregateCountries.filter((country, index, self) => index === self.findIndex(t => t.id.value === country.id.value)),
            {
                insertOptions: cQMetadata?.repositoryOptions,
            },
        );

        await this.repositoryI18n.insert(
            aggregateCountries,
            {
                dataFactory  : aggregate => aggregate.toI18nDTO(),
                insertOptions: cQMetadata?.repositoryOptions,
            },
        );

        // create AddCountriesContextEvent to have object wrapper to add event publisher functionality
        // insert EventBus in object, to be able to apply and commit events
        const countriesRegistered = this.publisher.mergeObjectContext(new CommonAddCountriesContextEvent(aggregateCountries));

        countriesRegistered.created(); // apply event to model events
        countriesRegistered.commit(); // commit all events of model
    }
}
