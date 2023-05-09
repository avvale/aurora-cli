import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteQueuesCommand } from './delete-queues.command';
import { DeleteQueuesService } from './delete-queues.service';

@CommandHandler(DeleteQueuesCommand)
export class DeleteQueuesCommandHandler implements ICommandHandler<DeleteQueuesCommand>
{
    constructor(
        private readonly deleteQueuesService: DeleteQueuesService,
    ) {}

    async execute(command: DeleteQueuesCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.deleteQueuesService.main(
            command.queryStatement,
            command.constraint,
            command.cQMetadata,
        );
    }
}