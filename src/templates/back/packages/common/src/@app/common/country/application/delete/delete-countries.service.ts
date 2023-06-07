import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { Operator, QueryStatement } from '@aurorajs.dev/core';
import { CQMetadata } from '@aurorajs.dev/core';
import { ICountryRepository } from '../../domain/country.repository';
import { ICountryI18nRepository } from '../../domain/country-i18n.repository';
import { AddCountriesContextEvent } from '../events/add-countries-context.event';

@Injectable()
export class DeleteCountriesService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: ICountryRepository,
        private readonly repositoryI18n: ICountryI18nRepository,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // get objects to delete
        const countries = await this.repository.get({
            queryStatement,
            constraint,
            cQMetadata,
        });

        await this.repositoryI18n.delete({
            queryStatement: {
                where: {
                    countryId: { [Operator.in]: countries.map(item => item.id) },
                },
            },
            deleteOptions: cQMetadata?.repositoryOptions,
        });
        await this.repository.delete({
            queryStatement,
            constraint,
            cQMetadata,
            deleteOptions: cQMetadata?.repositoryOptions,
        });

        // create AddCountriesContextEvent to have object wrapper to add event publisher functionality
        // insert EventBus in object, to be able to apply and commit events
        const countriesRegistered = this.publisher.mergeObjectContext(
            new AddCountriesContextEvent(countries),
        );

        countriesRegistered.deleted(); // apply event to model events
        countriesRegistered.commit(); // commit all events of model
    }
}