/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateQueuesCommand } from './create-queues.command';
import { CreateQueuesService } from './create-queues.service';
import {
    QueueId,
    QueuePrefix,
    QueueName,
    QueueCreatedAt,
    QueueUpdatedAt,
    QueueDeletedAt,
} from '../../domain/value-objects';

@CommandHandler(CreateQueuesCommand)
export class CreateQueuesCommandHandler implements ICommandHandler<CreateQueuesCommand>
{
    constructor(
        private readonly createQueuesService: CreateQueuesService,
    ) {}

    async execute(command: CreateQueuesCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createQueuesService.main(
            command.payload
                .map(queue =>
                {
                    return {
                        id: new QueueId(queue.id),
                        prefix: new QueuePrefix(queue.prefix),
                        name: new QueueName(queue.name),
                    };
                }),
            command.cQMetadata,
        );
    }
}