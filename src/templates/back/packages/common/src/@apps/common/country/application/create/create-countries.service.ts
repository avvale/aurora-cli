import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { ConfigService } from '@nestjs/config';
import { CQMetadata } from '@aurorajs.dev/core';
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
} from '../../domain/value-objects';
import { ICountryRepository } from '../../domain/country.repository';
import { ICountryI18nRepository } from '../../domain/country-i18n.repository';
import { CommonCountry } from '../../domain/country.aggregate';
import { AddCountriesContextEvent } from '../events/add-countries-context.event';

@Injectable()
export class CreateCountriesService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: ICountryRepository,
        private readonly repositoryI18n: ICountryI18nRepository,
        private readonly configService: ConfigService,
    ) {}

    async main(
        countries: {
            id: CountryId;
            iso3166Alpha2: CountryIso3166Alpha2;
            iso3166Alpha3: CountryIso3166Alpha3;
            iso3166Numeric: CountryIso3166Numeric;
            customCode: CountryCustomCode;
            prefix: CountryPrefix;
            image: CountryImage;
            sort: CountrySort;
            administrativeAreas: CountryAdministrativeAreas;
            latitude: CountryLatitude;
            longitude: CountryLongitude;
            zoom: CountryZoom;
            availableLangs: CountryAvailableLangs;
            langId: CountryI18nLangId;
            name: CountryI18nName;
            slug: CountryI18nSlug;
            administrativeAreaLevel1: CountryI18nAdministrativeAreaLevel1;
            administrativeAreaLevel2: CountryI18nAdministrativeAreaLevel2;
            administrativeAreaLevel3: CountryI18nAdministrativeAreaLevel3;
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
            country.availableLangs,
            new CountryCreatedAt({ currentTimestamp: true }),
            new CountryUpdatedAt({ currentTimestamp: true }),
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
        await this.repository.insert(aggregateCountries.filter((country, index, self) => index === self.findIndex(t => t.id.value === country.id.value)), cQMetadata?.repositoryOptions, { insertOptions: cQMetadata?.repositoryOptions });
        await this.repositoryI18n.insert(aggregateCountries, { dataFactory: aggregate => aggregate.toI18nDTO(), insertOptions: cQMetadata?.repositoryOptions });

        // create AddCountriesContextEvent to have object wrapper to add event publisher functionality
        // insert EventBus in object, to be able to apply and commit events
        const countriesRegistered = this.publisher.mergeObjectContext(new AddCountriesContextEvent(aggregateCountries));

        countriesRegistered.created(); // apply event to model events
        countriesRegistered.commit(); // commit all events of model
    }
}