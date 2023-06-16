import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { CQMetadata, Utils } from '@aurorajs.dev/core';
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
import { ICountryRepository } from '../../domain/country.repository';
import { ICountryI18nRepository } from '../../domain/country-i18n.repository';
import { CommonCountry } from '../../domain/country.aggregate';
import * as _ from 'lodash';

@Injectable()
export class UpsertCountryService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: ICountryRepository,
        private readonly repositoryI18n: ICountryI18nRepository,
    ) {}

    async main(
        payload: {
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
            mapType: CountryMapType;
            langId: CountryI18nLangId;
            name: CountryI18nName;
            slug: CountryI18nSlug;
            administrativeAreaLevel1: CountryI18nAdministrativeAreaLevel1;
            administrativeAreaLevel2: CountryI18nAdministrativeAreaLevel2;
            administrativeAreaLevel3: CountryI18nAdministrativeAreaLevel3;
        },
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // upsert aggregate with factory pattern
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
            payload.mapType,
            null, // availableLangs
            new CountryCreatedAt({ currentTimestamp: true }),
            new CountryUpdatedAt({ currentTimestamp: true }),
            null, // deletedAt
            payload.langId,
            payload.name,
            payload.slug,
            payload.administrativeAreaLevel1,
            payload.administrativeAreaLevel2,
            payload.administrativeAreaLevel3,
        );

        try
        {
            // try get object from database
            const countryInDB = await this.repository.findById(country.id, { constraint: { include: ['countryI18n']}});

            if (countryInDB.availableLangs.value.includes(country.langId.value)) throw new ConflictException(`Error to upsert CommonCountry, the id ${country['id']['value']} already exist in database`);

            // add new lang id to data lang field to upsert field
            country.availableLangs = new CountryAvailableLangs(_.union(countryInDB.availableLangs.value, [country.langId.value]));
            await this.repository.update(
                country,
                {
                    dataFactory  : aggregate => _.pick(aggregate.toI18nDTO(), 'id', 'availableLangs'),
                    updateOptions: cQMetadata?.repositoryOptions,
                },
            );
        }
        catch (error)
        {
            if (error instanceof NotFoundException)
            {
                country.availableLangs = new CountryAvailableLangs([country.langId.value]);
                await this.repository
                    .upsert(
                        country,
                        {
                            upsertOptions: cQMetadata?.repositoryOptions,
                        },
                    );
            }
        }

        const modelInDB = await this.repositoryI18n
            .find({
                queryStatement: {
                    where: {
                        countryId: country.id.value,
                        langId: country.langId.value,
                    },
                },
            });

        // upsert i18n aggregate with factory pattern for upsert repository method
        const countryI18n = CommonCountry.register(
            new CountryId(modelInDB ? modelInDB.id.value : Utils.uuid()),
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
            payload.mapType,
            country.availableLangs,
            new CountryCreatedAt({ currentTimestamp: true }),
            new CountryUpdatedAt({ currentTimestamp: true }),
            null, // deletedAt
            payload.langId,
            payload.name,
            payload.slug,
            payload.administrativeAreaLevel1,
            payload.administrativeAreaLevel2,
            payload.administrativeAreaLevel3,
        );

        // save new i18n record
        await this.repositoryI18n
            .upsert(
                countryI18n,
                {
                    dataFactory  : (aggregate: CommonCountry ) => aggregate.toI18nDTO(),
                    upsertOptions: cQMetadata?.repositoryOptions,
                },
            );

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const countryRegister = this.publisher.mergeObjectContext(
            country,
        );

        countryRegister.created(country); // apply event to model events
        countryRegister.commit(); // commit all events of model
    }
}