import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { QueryStatement } from '@aurora-ts/core';
import { CQMetadata } from '@aurora-ts/core';
import { IQueueRepository } from '../../domain/queue.repository';
import { AddQueuesContextEvent } from '../events/add-queues-context.event';

@Injectable()
export class DeleteQueuesService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IQueueRepository,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // get objects to delete
        const queues = await this.repository.get({
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

        // create AddQueuesContextEvent to have object wrapper to add event publisher functionality
        // insert EventBus in object, to be able to apply and commit events
        const queuesRegistered = this.publisher.mergeObjectContext(
            new AddQueuesContextEvent(queues),
        );

        queuesRegistered.deleted(); // apply event to model events
        queuesRegistered.commit(); // commit all events of model
    }
}