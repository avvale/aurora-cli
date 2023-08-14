import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { QueueManagerDeleteQueuesCommand } from './queue-manager-delete-queues.command';
import { QueueManagerDeleteQueuesService } from './queue-manager-delete-queues.service';

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
