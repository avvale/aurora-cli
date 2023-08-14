/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { QueueManagerUpsertQueueCommand } from './queue-manager-upsert-queue.command';
import { QueueManagerUpsertQueueService } from './queue-manager-upsert-queue.service';
import {
    QueueManagerQueueId,
    QueueManagerQueuePrefix,
    QueueManagerQueueName,
    QueueManagerQueueCreatedAt,
    QueueManagerQueueUpdatedAt,
    QueueManagerQueueDeletedAt,
} from '../../domain/value-objects';

@CommandHandler(QueueManagerUpsertQueueCommand)
export class QueueManagerUpsertQueueCommandHandler implements ICommandHandler<QueueManagerUpsertQueueCommand>
{
    constructor(
        private readonly upsertQueueService: QueueManagerUpsertQueueService,
    ) {}

    async execute(command: QueueManagerUpsertQueueCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.upsertQueueService.main(
            {
                id: new QueueManagerQueueId(command.payload.id),
                prefix: new QueueManagerQueuePrefix(command.payload.prefix),
                name: new QueueManagerQueueName(command.payload.name),
            },
            command.cQMetadata,
        );
    }
}
