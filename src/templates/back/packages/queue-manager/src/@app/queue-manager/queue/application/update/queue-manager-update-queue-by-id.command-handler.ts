/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { QueueManagerUpdateQueueByIdCommand } from './queue-manager-update-queue-by-id.command';
import { QueueManagerUpdateQueueByIdService } from './queue-manager-update-queue-by-id.service';
import {
    QueueManagerQueueId,
    QueueManagerQueuePrefix,
    QueueManagerQueueName,
    QueueManagerQueueCreatedAt,
    QueueManagerQueueUpdatedAt,
    QueueManagerQueueDeletedAt,
} from '../../domain/value-objects';

@CommandHandler(QueueManagerUpdateQueueByIdCommand)
export class QueueManagerUpdateQueueByIdCommandHandler implements ICommandHandler<QueueManagerUpdateQueueByIdCommand>
{
    constructor(
        private readonly updateQueueByIdService: QueueManagerUpdateQueueByIdService,
    ) {}

    async execute(command: QueueManagerUpdateQueueByIdCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.updateQueueByIdService.main(
            {
                id: new QueueManagerQueueId(command.payload.id),
                prefix: new QueueManagerQueuePrefix(command.payload.prefix, { undefinable: true }),
                name: new QueueManagerQueueName(command.payload.name, { undefinable: true }),
            },
            command.constraint,
            command.cQMetadata,
        );
    }
}
