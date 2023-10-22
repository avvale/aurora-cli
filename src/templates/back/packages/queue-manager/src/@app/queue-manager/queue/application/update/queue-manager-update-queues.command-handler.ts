/* eslint-disable key-spacing */
import { QueueManagerUpdateQueuesCommand } from '@app/queue-manager/queue';
import { QueueManagerUpdateQueuesService } from '@app/queue-manager/queue/application/update/queue-manager-update-queues.service';
import {
    QueueManagerQueueId,
    QueueManagerQueueName,
    QueueManagerQueuePrefix,
} from '@app/queue-manager/queue/domain/value-objects';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

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
