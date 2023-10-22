import { QueueManagerDeleteJobsRegistryCommand } from '@app/queue-manager/job-registry';
import { QueueManagerDeleteJobsRegistryService } from '@app/queue-manager/job-registry/application/delete/queue-manager-delete-jobs-registry.service';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

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
