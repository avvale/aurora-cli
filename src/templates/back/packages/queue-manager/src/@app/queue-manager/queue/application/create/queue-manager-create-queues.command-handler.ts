/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { QueueManagerCreateQueuesCommand } from './queue-manager-create-queues.command';
import { QueueManagerCreateQueuesService } from './queue-manager-create-queues.service';
import {
    QueueManagerQueueId,
    QueueManagerQueuePrefix,
    QueueManagerQueueName,
    QueueManagerQueueCreatedAt,
    QueueManagerQueueUpdatedAt,
    QueueManagerQueueDeletedAt,
} from '../../domain/value-objects';

@CommandHandler(QueueManagerCreateQueuesCommand)
export class QueueManagerCreateQueuesCommandHandler implements ICommandHandler<QueueManagerCreateQueuesCommand>
{
    constructor(
        private readonly createQueuesService: QueueManagerCreateQueuesService,
    ) {}

    async execute(command: QueueManagerCreateQueuesCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createQueuesService.main(
            command.payload
                .map(queue =>
                {
                    return {
                        id: new QueueManagerQueueId(queue.id),
                        prefix: new QueueManagerQueuePrefix(queue.prefix),
                        name: new QueueManagerQueueName(queue.name),
                    };
                }),
            command.cQMetadata,
        );
    }
}
