import { CommonCountry, CommonICountryI18nRepository, CommonICountryRepository } from '@app/common/country';
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
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import * as _ from 'lodash';

@Injectable()
export class CommonCreateCountryService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: CommonICountryRepository,
        private readonly repositoryI18n: CommonICountryI18nRepository,
    ) {}

    async main(
        payload: {
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
            langId: CommonCountryI18nLangId;
            name: CommonCountryI18nName;
            slug: CommonCountryI18nSlug;
            administrativeAreaLevel1: CommonCountryI18nAdministrativeAreaLevel1;
            administrativeAreaLevel2: CommonCountryI18nAdministrativeAreaLevel2;
            administrativeAreaLevel3: CommonCountryI18nAdministrativeAreaLevel3;
        },
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        const fallbackLang = cQMetadata.meta.fallbackLang;
        const contentLanguage = cQMetadata.meta.contentLanguage;

        // override langId value object with header content-language value
        payload.langId = new CommonCountryI18nLangId(contentLanguage.id);

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
            payload.mapType,
            null, // availableLangs
            new CommonCountryCreatedAt({ currentTimestamp: true }),
            new CommonCountryUpdatedAt({ currentTimestamp: true }),
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
            const countryInDB = await this.repository.findById(
                country.id,
                {
                    constraint: {
                        include: [
                            {
                                association: 'countryI18n',
                                where      : {
                                    langId: fallbackLang.id,
                                },
                            },
                        ],
                    },
                },
            );

            // eslint-disable-next-line max-len
            if (countryInDB.availableLangs.value.includes(contentLanguage.id)) throw new ConflictException(`Error to create CommonCountry, the id ${contentLanguage.id} already exist in database`);

            // add available lang when create country
            country.availableLangs = new CommonCountryAvailableLangs(_.union(countryInDB.availableLangs.value, [contentLanguage.id]));

            await this.repository
                .update(
                    country,
                    {
                        dataFactory   : aggregate => _.pick(aggregate.toDTO(), 'id', 'availableLangs'),
                        updateOptions : cQMetadata?.repositoryOptions,
                        queryStatement: {
                            where: {
                                id: country.id.value,
                            },
                        },
                    },
                );
        }
        catch (error)
        {
            if (error instanceof NotFoundException)
            {
                country.availableLangs = new CommonCountryAvailableLangs([contentLanguage.id]);
                await this.repository
                    .create(
                        country,
                        {
                            createOptions: cQMetadata?.repositoryOptions,
                        },
                    );
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
                    },
                }),
                createOptions: cQMetadata?.repositoryOptions,
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
