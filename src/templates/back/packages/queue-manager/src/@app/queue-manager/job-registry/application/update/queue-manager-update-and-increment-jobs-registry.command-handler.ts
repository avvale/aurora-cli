/* eslint-disable key-spacing */
import { QueueManagerUpdateAndIncrementJobsRegistryCommand } from '@app/queue-manager/job-registry';
import { QueueManagerUpdateAndIncrementJobsRegistryService } from '@app/queue-manager/job-registry/application/update/queue-manager-update-and-increment-jobs-registry.service';
import {
    QueueManagerJobRegistryId,
    QueueManagerJobRegistryJobId,
    QueueManagerJobRegistryJobName,
    QueueManagerJobRegistryQueueName,
    QueueManagerJobRegistryState,
    QueueManagerJobRegistryTags,
} from '@app/queue-manager/job-registry/domain/value-objects';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(QueueManagerUpdateAndIncrementJobsRegistryCommand)
export class QueueManagerUpdateAndIncrementJobsRegistryCommandHandler implements ICommandHandler<QueueManagerUpdateAndIncrementJobsRegistryCommand>
{
    constructor(
        private readonly updateJobsRegistryService: QueueManagerUpdateAndIncrementJobsRegistryService,
    ) {}

    async execute(command: QueueManagerUpdateAndIncrementJobsRegistryCommand): Promise<void>
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
