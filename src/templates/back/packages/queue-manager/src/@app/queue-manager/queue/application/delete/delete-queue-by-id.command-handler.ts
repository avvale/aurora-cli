import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteQueueByIdCommand } from './delete-queue-by-id.command';
import { DeleteQueueByIdService } from './delete-queue-by-id.service';
import {
    QueueId
} from '../../domain/value-objects';

@CommandHandler(DeleteQueueByIdCommand)
export class DeleteQueueByIdCommandHandler implements ICommandHandler<DeleteQueueByIdCommand>
{
    constructor(
        private readonly deleteQueueByIdService: DeleteQueueByIdService,
    ) {}

    async execute(command: DeleteQueueByIdCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.deleteQueueByIdService.main(
            new QueueId(command.id),
            command.constraint,
            command.cQMetadata,
        );
    }
}