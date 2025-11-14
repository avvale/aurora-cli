import { QueueManagerDeleteJobRegistryByIdCommand } from '@app/queue-manager/job-registry';
import { QueueManagerDeleteJobRegistryByIdService } from '@app/queue-manager/job-registry/application/delete/queue-manager-delete-job-registry-by-id.service';
import { QueueManagerJobRegistryId } from '@app/queue-manager/job-registry/domain/value-objects';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(QueueManagerDeleteJobRegistryByIdCommand)
export class QueueManagerDeleteJobRegistryByIdCommandHandler
    implements ICommandHandler<QueueManagerDeleteJobRegistryByIdCommand>
{
    constructor(
        private readonly deleteJobRegistryByIdService: QueueManagerDeleteJobRegistryByIdService,
    ) {}

    async execute(
        command: QueueManagerDeleteJobRegistryByIdCommand,
    ): Promise<void> {
        // call to use case and implements ValueObjects
        await this.deleteJobRegistryByIdService.main(
            new QueueManagerJobRegistryId(command.id),
            command.constraint,
            command.cQMetadata,
        );
    }
}
