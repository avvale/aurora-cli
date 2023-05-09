import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteJobsRegistryCommand } from './delete-jobs-registry.command';
import { DeleteJobsRegistryService } from './delete-jobs-registry.service';

@CommandHandler(DeleteJobsRegistryCommand)
export class DeleteJobsRegistryCommandHandler implements ICommandHandler<DeleteJobsRegistryCommand>
{
    constructor(
        private readonly deleteJobsRegistryService: DeleteJobsRegistryService,
    ) {}

    async execute(command: DeleteJobsRegistryCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.deleteJobsRegistryService.main(
            command.queryStatement,
            command.constraint,
            command.cQMetadata,
        );
    }
}