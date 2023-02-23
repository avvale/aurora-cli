import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { CQMetadata } from '@aurora-ts/core';
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
import * as _ from 'lodash';

@Injectable()
export class CreateCountryService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: ICountryRepository,
        private readonly repositoryI18n: ICountryI18NRepository,
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
            langId: CountryI18NLangId;
            name: CountryI18NName;
            slug: CountryI18NSlug;
            administrativeAreaLevel1: CountryI18NAdministrativeAreaLevel1;
            administrativeAreaLevel2: CountryI18NAdministrativeAreaLevel2;
            administrativeAreaLevel3: CountryI18NAdministrativeAreaLevel3;
        },
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
            const countryInDB = await this.repository.findById(country.id, { constraint: { include: ['countryI18N']}});

            if (countryInDB.dataLang.value.includes(country.langId.value)) throw new ConflictException(`Error to create CommonCountry, the id ${country['id']['value']} already exist in database`);

            // add new lang id to data lang field to create or update field
            country.dataLang = new CountryDataLang(_.union(countryInDB.dataLang.value, [country.langId.value]));
            await this.repository.update(country, { dataFactory: aggregate => _.pick(aggregate.toI18nDTO(), 'id', 'dataLang'), updateOptions: cQMetadata?.repositoryOptions });
        }
        catch (error)
        {
            if (error instanceof NotFoundException)
            {
                country.dataLang = new CountryDataLang([country.langId.value]);
                await this.repository.create(country, { createOptions: cQMetadata?.repositoryOptions });
            }
        }

        // save new i18n record
        await this.repositoryI18n.create(
            country,
            {
                dataFactory         : (aggregate: CommonCountry ) => aggregate.toI18nDTO(),
                finderQueryStatement: (aggregate: CommonCountry ) => ({
                    where: {
                        countryId: aggregate['id']['value'],
                        langId: aggregate['langId']['value'],
                    }
                }),
                {
                    createOptions: cQMetadata?.repositoryOptions
                },
            }
        );

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const countryRegister = this.publisher.mergeObjectContext(
            country,
        );

        countryRegister.created(country); // apply event to model events
        countryRegister.commit(); // commit all events of model
    }
}