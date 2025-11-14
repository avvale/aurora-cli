import { QueueManagerDeleteQueueByIdCommand } from '@app/queue-manager/queue';
import { QueueManagerDeleteQueueByIdService } from '@app/queue-manager/queue/application/delete/queue-manager-delete-queue-by-id.service';
import { QueueManagerQueueId } from '@app/queue-manager/queue/domain/value-objects';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(QueueManagerDeleteQueueByIdCommand)
export class QueueManagerDeleteQueueByIdCommandHandler
    implements ICommandHandler<QueueManagerDeleteQueueByIdCommand>
{
    constructor(
        private readonly deleteQueueByIdService: QueueManagerDeleteQueueByIdService,
    ) {}

    async execute(command: QueueManagerDeleteQueueByIdCommand): Promise<void> {
        // call to use case and implements ValueObjects
        await this.deleteQueueByIdService.main(
            new QueueManagerQueueId(command.id),
            command.constraint,
            command.cQMetadata,
        );
    }
}
