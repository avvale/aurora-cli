/* eslint-disable key-spacing */
import { QueueManagerUpsertJobRegistryCommand } from '@app/queue-manager/job-registry';
import { QueueManagerUpsertJobRegistryService } from '@app/queue-manager/job-registry/application/upsert/queue-manager-upsert-job-registry.service';
import {
    QueueManagerJobRegistryId,
    QueueManagerJobRegistryJobId,
    QueueManagerJobRegistryJobName,
    QueueManagerJobRegistryQueueName,
    QueueManagerJobRegistryState,
    QueueManagerJobRegistryTags,
} from '@app/queue-manager/job-registry/domain/value-objects';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

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
