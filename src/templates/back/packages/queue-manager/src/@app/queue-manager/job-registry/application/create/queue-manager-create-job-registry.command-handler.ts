/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { QueueManagerCreateJobRegistryCommand } from './queue-manager-create-job-registry.command';
import { QueueManagerCreateJobRegistryService } from './queue-manager-create-job-registry.service';
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

@CommandHandler(QueueManagerCreateJobRegistryCommand)
export class QueueManagerCreateJobRegistryCommandHandler implements ICommandHandler<QueueManagerCreateJobRegistryCommand>
{
    constructor(
        private readonly createJobRegistryService: QueueManagerCreateJobRegistryService,
    ) {}

    async execute(command: QueueManagerCreateJobRegistryCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createJobRegistryService.main(
            {
                id: new QueueManagerJobRegistryId(command.payload.id),
                queueName: new QueueManagerJobRegistryQueueName(command.payload.queueName),
                state: new QueueManagerJobRegistryState(command.payload.state),
                jobId: new QueueManagerJobRegistryJobId(command.payload.jobId),
                jobName: new QueueManagerJobRegistryJobName(command.payload.jobName),
                tags: new QueueManagerJobRegistryTags(command.payload.tags),
            },
            command.cQMetadata,
        );
    }
}
