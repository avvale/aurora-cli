import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { QueryStatement } from '@aurora-ts/core';
import { CQMetadata } from '@aurora-ts/core';
import { IHttpCommunicationRepository } from '../../domain/http-communication.repository';
import { AddHttpCommunicationsContextEvent } from '../events/add-http-communications-context.event';

@Injectable()
export class DeleteHttpCommunicationsService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IHttpCommunicationRepository,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // get objects to delete
        const httpCommunications = await this.repository.get({
            queryStatement,
            constraint,
            cQMetadata,
        });

        await this.repository.delete({
            queryStatement,
            constraint,
            cQMetadata,
            deleteOptions: cQMetadata?.repositoryOptions,
        });

        // create AddHttpCommunicationsContextEvent to have object wrapper to add event publisher functionality
        // insert EventBus in object, to be able to apply and commit events
        const httpCommunicationsRegistered = this.publisher.mergeObjectContext(
            new AddHttpCommunicationsContextEvent(httpCommunications),
        );

        httpCommunicationsRegistered.deleted(); // apply event to model events
        httpCommunicationsRegistered.commit(); // commit all events of model
    }
}