import {
    QueueManagerAddQueuesContextEvent,
    QueueManagerIQueueRepository,
} from '@app/queue-manager/queue';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class QueueManagerDeleteQueuesService {
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: QueueManagerIQueueRepository,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<void> {
        // get objects to delete
        const queues = await this.repository.get({
            queryStatement,
            constraint,
            cQMetadata,
        });

        if (queues.length === 0) return;

        await this.repository.delete({
            queryStatement,
            constraint,
            cQMetadata,
            deleteOptions: cQMetadata?.repositoryOptions,
        });

        // create AddQueuesContextEvent to have object wrapper to add event publisher functionality
        // insert EventBus in object, to be able to apply and commit events
        const queuesRegistered = this.publisher.mergeObjectContext(
            new QueueManagerAddQueuesContextEvent(queues, cQMetadata),
        );

        queuesRegistered.deleted(); // apply event to model events
        queuesRegistered.commit(); // commit all events of model
    }
}
