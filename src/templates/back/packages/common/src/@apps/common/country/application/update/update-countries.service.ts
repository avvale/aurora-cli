import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { QueryStatement } from '@aurorajs.dev/core';
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
import { ICountryRepository } from '../../domain/country.repository';
import { ICountryI18NRepository } from '../../domain/country-i18n.repository';
import { CommonCountry } from '../../domain/country.aggregate';
import { AddCountriesContextEvent } from '../events/add-countries-context.event';

@Injectable()
export class UpdateCountriesService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: ICountryRepository,
        private readonly repositoryI18n: ICountryI18NRepository,
    ) {}

    async main(
        payload: {
            id?: CountryId;
            iso3166Alpha2?: CountryIso3166Alpha2;
            iso3166Alpha3?: CountryIso3166Alpha3;
            iso3166Numeric?: CountryIso3166Numeric;
            customCode?: CountryCustomCode;
            prefix?: CountryPrefix;
            image?: CountryImage;
            sort?: CountrySort;
            administrativeAreas?: CountryAdministrativeAreas;
            latitude?: CountryLatitude;
            longitude?: CountryLongitude;
            zoom?: CountryZoom;
            langId?: CountryI18NLangId;
            name?: CountryI18NName;
            slug?: CountryI18NSlug;
            administrativeAreaLevel1?: CountryI18NAdministrativeAreaLevel1;
            administrativeAreaLevel2?: CountryI18NAdministrativeAreaLevel2;
            administrativeAreaLevel3?: CountryI18NAdministrativeAreaLevel3;
        },
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const country = CommonCountry.register(
            payload.id,
            payload.iso3166Alpha2,
            payload.iso3166Alpha3,
            payload.iso3166Numeric,
            payload.customCode,
            payload.prefix,
            payload.image,
            payload.sort,
            payload.administrativeAreas,
            payload.latitude,
            payload.longitude,
            payload.zoom,
            null, // dataLang
            null, // createdAt
            new CountryUpdatedAt({ currentTimestamp: true }),
            null, // deletedAt
            payload.langId,
            payload.name,
            payload.slug,
            payload.administrativeAreaLevel1,
            payload.administrativeAreaLevel2,
            payload.administrativeAreaLevel3,
        );

        // delete dataLang property to avoid overwrite this value in database
        delete country.dataLang;

        // update
        await this.repository.update(country, {
            queryStatement,
            constraint,
            cQMetadata,
            updateOptions: cQMetadata?.repositoryOptions,
        });
        await this.repositoryI18n.update(country, {
            queryStatement,
            constraint,
            cQMetadata,
            updateOptions: cQMetadata?.repositoryOptions,
            dataFactory: (aggregate: CommonCountry) => aggregate.toI18nDTO(),
        });

        // get objects to delete
        const countries = await this.repository.get({ queryStatement, constraint, cQMetadata });

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const countriesRegister = this.publisher.mergeObjectContext(
            new AddCountriesContextEvent(countries),
        );

        countriesRegister.updated(); // apply event to model events
        countriesRegister.commit(); // commit all events of model
    }
}