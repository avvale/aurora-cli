/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { QueueManagerUpsertJobRegistryCommand } from './queue-manager-upsert-job-registry.command';
import { QueueManagerUpsertJobRegistryService } from './queue-manager-upsert-job-registry.service';
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

@CommandHandler(QueueManagerUpsertJobRegistryCommand)
export class QueueManagerUpsertJobRegistryCommandHandler implements ICommandHandler<QueueManagerUpsertJobRegistryCommand>
{
    constructor(
        private readonly upsertJobRegistryService: QueueManagerUpsertJobRegistryService,
    ) {}

    async execute(command: QueueManagerUpsertJobRegistryCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.upsertJobRegistryService.main(
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
