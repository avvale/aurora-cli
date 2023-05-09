/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpsertQueueCommand } from './upsert-queue.command';
import { UpsertQueueService } from './upsert-queue.service';
import {
    QueueId,
    QueuePrefix,
    QueueName,
    QueueCreatedAt,
    QueueUpdatedAt,
    QueueDeletedAt,
} from '../../domain/value-objects';

@CommandHandler(UpsertQueueCommand)
export class UpsertQueueCommandHandler implements ICommandHandler<UpsertQueueCommand>
{
    constructor(
        private readonly upsertQueueService: UpsertQueueService,
    ) {}

    async execute(command: UpsertQueueCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.upsertQueueService.main(
            {
                id: new QueueId(command.payload.id),
                prefix: new QueuePrefix(command.payload.prefix),
                name: new QueueName(command.payload.name),
            },
            command.cQMetadata,
        );
    }
}