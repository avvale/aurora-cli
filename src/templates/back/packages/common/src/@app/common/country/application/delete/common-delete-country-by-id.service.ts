import { CommonICountryI18nRepository } from '../../domain/common-country-i18n.repository';
import { CommonICountryRepository } from '../../domain/common-country.repository';
import { CommonCountryAvailableLangs, CommonCountryId } from '../../domain/value-objects';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import * as _ from 'lodash';

@Injectable()
export class CommonDeleteCountryByIdService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: CommonICountryRepository,
        private readonly repositoryI18n: CommonICountryI18nRepository,
    ) {}

    async main(
        id: CommonCountryId,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        const fallbackLang = cQMetadata.meta.fallbackLang;
        const contentLanguage = cQMetadata.meta.contentLanguage;

        // get object to delete
        const country = await this.repository.findById(
            id,
            {
                constraint,
                cQMetadata,
            },
        );

        if (country.langId.value === fallbackLang.id)
        {
            // delete all translations if delete fallback language
            await this.repository.deleteById(
                country.id,
                {
                    deleteOptions: cQMetadata?.repositoryOptions,
                    cQMetadata,
                },
            );

            await this.repositoryI18n.delete(
                {
                    queryStatement: {
                        where: {
                            countryId: country.id.value,
                        },
                    },
                    deleteOptions: cQMetadata?.repositoryOptions,
                },
            );
        }
        else
        {
            // delete only one translation
            await this.repositoryI18n.delete(
                {
                    queryStatement: {
                        where: {
                            countryId: country.id.value,
                            langId   : contentLanguage.id,
                        },
                    },
                    deleteOptions: cQMetadata?.repositoryOptions,
                },
            );

            // update available langs when delete translation
            country.availableLangs = new CommonCountryAvailableLangs(country.availableLangs.value.removeItem(contentLanguage.id));

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

        // insert EventBus in object, to be able to apply and commit events
        const countryRegister = this.publisher.mergeObjectContext(country);

        countryRegister.deleted(country); // apply event to model events
        countryRegister.commit(); // commit all events of model
    }
}