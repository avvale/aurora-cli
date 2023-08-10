/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { QueueManagerCreateQueueCommand } from './queue-manager-create-queue.command';
import { QueueManagerCreateQueueService } from './queue-manager-create-queue.service';
import {
    QueueManagerQueueId,
    QueueManagerQueuePrefix,
    QueueManagerQueueName,
    QueueManagerQueueCreatedAt,
    QueueManagerQueueUpdatedAt,
    QueueManagerQueueDeletedAt,
} from '../../domain/value-objects';

@CommandHandler(QueueManagerCreateQueueCommand)
export class QueueManagerCreateQueueCommandHandler implements ICommandHandler<QueueManagerCreateQueueCommand>
{
    constructor(
        private readonly createQueueService: QueueManagerCreateQueueService,
    ) {}

    async execute(command: QueueManagerCreateQueueCommand): Promise<void>
    {
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
