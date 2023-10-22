/* eslint-disable key-spacing */
import { QueueManagerUpsertQueueCommand } from '@app/queue-manager/queue';
import { QueueManagerUpsertQueueService } from '@app/queue-manager/queue/application/upsert/queue-manager-upsert-queue.service';
import {
    QueueManagerQueueId,
    QueueManagerQueueName,
    QueueManagerQueuePrefix,
} from '@app/queue-manager/queue/domain/value-objects';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

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
