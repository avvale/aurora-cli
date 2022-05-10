import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { QueryStatement } from 'aurora-ts-core';
import { CQMetadata } from 'aurora-ts-core';
import { IClientRepository } from '../../domain/client.repository';
import { AddClientsContextEvent } from '../events/add-clients-context.event';

@Injectable()
export class DeleteClientsService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IClientRepository,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // get objects to delete
        const clients = await this.repository.get({ queryStatement, constraint, cQMetadata });

        await this.repository.delete({
            queryStatement,
            constraint,
            cQMetadata,
            deleteOptions: cQMetadata?.repositoryOptions,
        });

        // create AddClientsContextEvent to have object wrapper to add event publisher functionality
        // insert EventBus in object, to be able to apply and commit events
        const clientsRegistered = this.publisher.mergeObjectContext(
            new AddClientsContextEvent(clients),
        );

        clientsRegistered.deleted(); // apply event to model events
        clientsRegistered.commit(); // commit all events of model
    }
}