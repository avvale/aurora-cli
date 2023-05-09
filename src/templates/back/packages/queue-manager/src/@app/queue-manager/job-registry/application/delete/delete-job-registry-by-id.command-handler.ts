import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteJobRegistryByIdCommand } from './delete-job-registry-by-id.command';
import { DeleteJobRegistryByIdService } from './delete-job-registry-by-id.service';
import {
    JobRegistryId
} from '../../domain/value-objects';

@CommandHandler(DeleteJobRegistryByIdCommand)
export class DeleteJobRegistryByIdCommandHandler implements ICommandHandler<DeleteJobRegistryByIdCommand>
{
    constructor(
        private readonly deleteJobRegistryByIdService: DeleteJobRegistryByIdService,
    ) {}

    async execute(command: DeleteJobRegistryByIdCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.deleteJobRegistryByIdService.main(
            new JobRegistryId(command.id),
            command.constraint,
            command.cQMetadata,
        );
    }
}