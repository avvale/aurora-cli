/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { QueueManagerUpdateJobsRegistryCommand } from './queue-manager-update-jobs-registry.command';
import { QueueManagerUpdateJobsRegistryService } from './queue-manager-update-jobs-registry.service';
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

@CommandHandler(QueueManagerUpdateJobsRegistryCommand)
export class QueueManagerUpdateJobsRegistryCommandHandler implements ICommandHandler<QueueManagerUpdateJobsRegistryCommand>
{
    constructor(
        private readonly updateJobsRegistryService: QueueManagerUpdateJobsRegistryService,
    ) {}

    async execute(command: QueueManagerUpdateJobsRegistryCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.updateJobsRegistryService.main(
            {
                id: new QueueManagerJobRegistryId(command.payload.id, { undefinable: true }),
                queueName: new QueueManagerJobRegistryQueueName(command.payload.queueName, { undefinable: true }),
                state: new QueueManagerJobRegistryState(command.payload.state, { undefinable: true }),
                jobId: new QueueManagerJobRegistryJobId(command.payload.jobId, { undefinable: true }),
                jobName: new QueueManagerJobRegistryJobName(command.payload.jobName),
                tags: new QueueManagerJobRegistryTags(command.payload.tags),
            },
            command.queryStatement,
            command.constraint,
            command.cQMetadata,
        );
    }
}
