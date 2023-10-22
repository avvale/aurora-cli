import { QueueManagerDeleteQueuesCommand } from '@app/queue-manager/queue';
import { QueueManagerDeleteQueuesService } from '@app/queue-manager/queue/application/delete/queue-manager-delete-queues.service';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(QueueManagerDeleteQueuesCommand)
export class QueueManagerDeleteQueuesCommandHandler implements ICommandHandler<QueueManagerDeleteQueuesCommand>
{
    constructor(
        private readonly deleteQueuesService: QueueManagerDeleteQueuesService,
    ) {}

    async execute(command: QueueManagerDeleteQueuesCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.deleteQueuesService.main(
            command.queryStatement,
            command.constraint,
            command.cQMetadata,
        );
    }
}
