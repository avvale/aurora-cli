/* eslint-disable key-spacing */
import { QueueManagerUpdateJobsRegistryCommand } from '@app/queue-manager/job-registry';
import { QueueManagerUpdateJobsRegistryService } from '@app/queue-manager/job-registry/application/update/queue-manager-update-jobs-registry.service';
import {
    QueueManagerJobRegistryId,
    QueueManagerJobRegistryJobId,
    QueueManagerJobRegistryJobName,
    QueueManagerJobRegistryQueueName,
    QueueManagerJobRegistryState,
    QueueManagerJobRegistryTags,
} from '@app/queue-manager/job-registry/domain/value-objects';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

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
