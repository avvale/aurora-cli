/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { QueueManagerCreateJobsRegistryCommand } from './queue-manager-create-jobs-registry.command';
import { QueueManagerCreateJobsRegistryService } from './queue-manager-create-jobs-registry.service';
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

@CommandHandler(QueueManagerCreateJobsRegistryCommand)
export class QueueManagerCreateJobsRegistryCommandHandler implements ICommandHandler<QueueManagerCreateJobsRegistryCommand>
{
    constructor(
        private readonly createJobsRegistryService: QueueManagerCreateJobsRegistryService,
    ) {}

    async execute(command: QueueManagerCreateJobsRegistryCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createJobsRegistryService.main(
            command.payload
                .map(jobRegistry =>
                {
                    return {
                        id: new QueueManagerJobRegistryId(jobRegistry.id),
                        queueName: new QueueManagerJobRegistryQueueName(jobRegistry.queueName),
                        state: new QueueManagerJobRegistryState(jobRegistry.state),
                        jobId: new QueueManagerJobRegistryJobId(jobRegistry.jobId),
                        jobName: new QueueManagerJobRegistryJobName(jobRegistry.jobName),
                        tags: new QueueManagerJobRegistryTags(jobRegistry.tags),
                    };
                }),
            command.cQMetadata,
        );
    }
}
