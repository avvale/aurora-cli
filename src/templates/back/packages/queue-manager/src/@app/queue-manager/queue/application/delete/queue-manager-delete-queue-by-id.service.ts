import { QueueManagerIQueueRepository } from '@app/queue-manager/queue';
import { QueueManagerQueueId } from '@app/queue-manager/queue/domain/value-objects';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class QueueManagerDeleteQueueByIdService {
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: QueueManagerIQueueRepository,
    ) {}

    async main(
        id: QueueManagerQueueId,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<void> {
        // get object to delete
        const queue = await this.repository.findById(id, {
            constraint,
            cQMetadata,
        });

        // it is not necessary to pass the constraint in the delete, if the object
        // is not found in the findById, an exception will be thrown.
        await this.repository.deleteById(queue.id, {
            deleteOptions: cQMetadata?.repositoryOptions,
            cQMetadata,
        });

        // insert EventBus in object, to be able to apply and commit events
        const queueRegister = this.publisher.mergeObjectContext(queue);

        queueRegister.deleted({
            payload: queue,
            cQMetadata,
        }); // apply event to model events
        queueRegister.commit(); // commit all events of model
    }
}
