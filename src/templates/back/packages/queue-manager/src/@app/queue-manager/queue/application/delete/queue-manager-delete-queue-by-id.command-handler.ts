import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { QueueManagerDeleteQueueByIdCommand } from './queue-manager-delete-queue-by-id.command';
import { QueueManagerDeleteQueueByIdService } from './queue-manager-delete-queue-by-id.service';
import {
    QueueManagerQueueId
} from '../../domain/value-objects';

@CommandHandler(QueueManagerDeleteQueueByIdCommand)
export class QueueManagerDeleteQueueByIdCommandHandler implements ICommandHandler<QueueManagerDeleteQueueByIdCommand>
{
    constructor(
        private readonly deleteQueueByIdService: QueueManagerDeleteQueueByIdService,
    ) {}

    async execute(command: QueueManagerDeleteQueueByIdCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.deleteQueueByIdService.main(
            new QueueManagerQueueId(command.id),
            command.constraint,
            command.cQMetadata,
        );
    }
}
