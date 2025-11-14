/* eslint-disable key-spacing */
import { QueueManagerCreateQueuesCommand } from '@app/queue-manager/queue';
import { QueueManagerCreateQueuesService } from '@app/queue-manager/queue/application/create/queue-manager-create-queues.service';
import {
    QueueManagerQueueId,
    QueueManagerQueueName,
    QueueManagerQueuePrefix,
} from '@app/queue-manager/queue/domain/value-objects';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(QueueManagerCreateQueuesCommand)
export class QueueManagerCreateQueuesCommandHandler
    implements ICommandHandler<QueueManagerCreateQueuesCommand>
{
    constructor(
        private readonly createQueuesService: QueueManagerCreateQueuesService,
    ) {}

    async execute(command: QueueManagerCreateQueuesCommand): Promise<void> {
        // call to use case and implements ValueObjects
        await this.createQueuesService.main(
            command.payload.map((queue) => {
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
