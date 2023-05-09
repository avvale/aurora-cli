/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateQueueCommand } from './create-queue.command';
import { CreateQueueService } from './create-queue.service';
import {
    QueueId,
    QueuePrefix,
    QueueName,
    QueueCreatedAt,
    QueueUpdatedAt,
    QueueDeletedAt,
} from '../../domain/value-objects';

@CommandHandler(CreateQueueCommand)
export class CreateQueueCommandHandler implements ICommandHandler<CreateQueueCommand>
{
    constructor(
        private readonly createQueueService: CreateQueueService,
    ) {}

    async execute(command: CreateQueueCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createQueueService.main(
            {
                id: new QueueId(command.payload.id),
                prefix: new QueuePrefix(command.payload.prefix),
                name: new QueueName(command.payload.name),
            },
            command.cQMetadata,
        );
    }
}