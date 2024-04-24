/* eslint-disable key-spacing */
import { QueueManagerUpdateAndIncrementQueuesCommand } from '@app/queue-manager/queue';
import { QueueManagerUpdateAndIncrementQueuesService } from '@app/queue-manager/queue/application/update/queue-manager-update-and-increment-queues.service';
import {
    QueueManagerQueueId,
    QueueManagerQueueName,
    QueueManagerQueuePrefix,
} from '@app/queue-manager/queue/domain/value-objects';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(QueueManagerUpdateAndIncrementQueuesCommand)
export class QueueManagerUpdateAndIncrementQueuesCommandHandler implements ICommandHandler<QueueManagerUpdateAndIncrementQueuesCommand>
{
    constructor(
        private readonly updateQueuesService: QueueManagerUpdateAndIncrementQueuesService,
    ) {}

    async execute(command: QueueManagerUpdateAndIncrementQueuesCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.updateQueuesService.main(
            {
                id: new QueueManagerQueueId(command.payload.id, { undefinable: true }),
                prefix: new QueueManagerQueuePrefix(command.payload.prefix, { undefinable: true }),
                name: new QueueManagerQueueName(command.payload.name, { undefinable: true }),
            },
            command.queryStatement,
            command.constraint,
            command.cQMetadata,
        );
    }
}
