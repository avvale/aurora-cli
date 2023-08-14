/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { QueueManagerUpdateQueuesCommand } from './queue-manager-update-queues.command';
import { QueueManagerUpdateQueuesService } from './queue-manager-update-queues.service';
import {
    QueueManagerQueueId,
    QueueManagerQueuePrefix,
    QueueManagerQueueName,
    QueueManagerQueueCreatedAt,
    QueueManagerQueueUpdatedAt,
    QueueManagerQueueDeletedAt,
} from '../../domain/value-objects';

@CommandHandler(QueueManagerUpdateQueuesCommand)
export class QueueManagerUpdateQueuesCommandHandler implements ICommandHandler<QueueManagerUpdateQueuesCommand>
{
    constructor(
        private readonly updateQueuesService: QueueManagerUpdateQueuesService,
    ) {}

    async execute(command: QueueManagerUpdateQueuesCommand): Promise<void>
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
