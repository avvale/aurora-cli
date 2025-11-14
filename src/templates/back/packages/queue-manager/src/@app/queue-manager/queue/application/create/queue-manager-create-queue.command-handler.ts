/* eslint-disable key-spacing */
import { QueueManagerCreateQueueCommand } from '@app/queue-manager/queue';
import { QueueManagerCreateQueueService } from '@app/queue-manager/queue/application/create/queue-manager-create-queue.service';
import {
    QueueManagerQueueId,
    QueueManagerQueueName,
    QueueManagerQueuePrefix,
} from '@app/queue-manager/queue/domain/value-objects';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(QueueManagerCreateQueueCommand)
export class QueueManagerCreateQueueCommandHandler
    implements ICommandHandler<QueueManagerCreateQueueCommand>
{
    constructor(
        private readonly createQueueService: QueueManagerCreateQueueService,
    ) {}

    async execute(command: QueueManagerCreateQueueCommand): Promise<void> {
        // call to use case and implements ValueObjects
        await this.createQueueService.main(
            {
                id: new QueueManagerQueueId(command.payload.id),
                prefix: new QueueManagerQueuePrefix(command.payload.prefix),
                name: new QueueManagerQueueName(command.payload.name),
            },
            command.cQMetadata,
        );
    }
}
