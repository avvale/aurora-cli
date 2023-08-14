import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { QueueManagerDeleteJobsRegistryCommand } from './queue-manager-delete-jobs-registry.command';
import { QueueManagerDeleteJobsRegistryService } from './queue-manager-delete-jobs-registry.service';

@CommandHandler(QueueManagerDeleteJobsRegistryCommand)
export class QueueManagerDeleteJobsRegistryCommandHandler implements ICommandHandler<QueueManagerDeleteJobsRegistryCommand>
{
    constructor(
        private readonly deleteJobsRegistryService: QueueManagerDeleteJobsRegistryService,
    ) {}

    async execute(command: QueueManagerDeleteJobsRegistryCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.deleteJobsRegistryService.main(
            command.queryStatement,
            command.constraint,
            command.cQMetadata,
        );
    }
}
