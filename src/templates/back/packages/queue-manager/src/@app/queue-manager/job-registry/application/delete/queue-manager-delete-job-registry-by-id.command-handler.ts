import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { QueueManagerDeleteJobRegistryByIdCommand } from './queue-manager-delete-job-registry-by-id.command';
import { QueueManagerDeleteJobRegistryByIdService } from './queue-manager-delete-job-registry-by-id.service';
import {
    QueueManagerJobRegistryId
} from '../../domain/value-objects';

@CommandHandler(QueueManagerDeleteJobRegistryByIdCommand)
export class QueueManagerDeleteJobRegistryByIdCommandHandler implements ICommandHandler<QueueManagerDeleteJobRegistryByIdCommand>
{
    constructor(
        private readonly deleteJobRegistryByIdService: QueueManagerDeleteJobRegistryByIdService,
    ) {}

    async execute(command: QueueManagerDeleteJobRegistryByIdCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.deleteJobRegistryByIdService.main(
            new QueueManagerJobRegistryId(command.id),
            command.constraint,
            command.cQMetadata,
        );
    }
}
