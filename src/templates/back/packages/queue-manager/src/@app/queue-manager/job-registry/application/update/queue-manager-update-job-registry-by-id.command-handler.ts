/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { QueueManagerUpdateJobRegistryByIdCommand } from './queue-manager-update-job-registry-by-id.command';
import { QueueManagerUpdateJobRegistryByIdService } from './queue-manager-update-job-registry-by-id.service';
import {
    QueueManagerJobRegistryId,
    QueueManagerJobRegistryQueueName,
    QueueManagerJobRegistryState,
    QueueManagerJobRegistryJobId,
    QueueManagerJobRegistryJobName,
    QueueManagerJobRegistryTags,
    QueueManagerJobRegistryCreatedAt,
    QueueManagerJobRegistryUpdatedAt,
    QueueManagerJobRegistryDeletedAt,
} from '../../domain/value-objects';

@CommandHandler(QueueManagerUpdateJobRegistryByIdCommand)
export class QueueManagerUpdateJobRegistryByIdCommandHandler implements ICommandHandler<QueueManagerUpdateJobRegistryByIdCommand>
{
    constructor(
        private readonly updateJobRegistryByIdService: QueueManagerUpdateJobRegistryByIdService,
    ) {}

    async execute(command: QueueManagerUpdateJobRegistryByIdCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.updateJobRegistryByIdService.main(
            {
                id: new QueueManagerJobRegistryId(command.payload.id),
                queueName: new QueueManagerJobRegistryQueueName(command.payload.queueName, { undefinable: true }),
                state: new QueueManagerJobRegistryState(command.payload.state, { undefinable: true }),
                jobId: new QueueManagerJobRegistryJobId(command.payload.jobId, { undefinable: true }),
                jobName: new QueueManagerJobRegistryJobName(command.payload.jobName),
                tags: new QueueManagerJobRegistryTags(command.payload.tags),
            },
            command.constraint,
            command.cQMetadata,
        );
    }
}
