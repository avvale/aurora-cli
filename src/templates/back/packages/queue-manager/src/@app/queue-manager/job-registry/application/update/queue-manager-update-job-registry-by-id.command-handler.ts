/* eslint-disable key-spacing */
import { QueueManagerUpdateJobRegistryByIdCommand } from '@app/queue-manager/job-registry';
import { QueueManagerUpdateJobRegistryByIdService } from '@app/queue-manager/job-registry/application/update/queue-manager-update-job-registry-by-id.service';
import {
    QueueManagerJobRegistryId,
    QueueManagerJobRegistryJobId,
    QueueManagerJobRegistryJobName,
    QueueManagerJobRegistryQueueName,
    QueueManagerJobRegistryState,
    QueueManagerJobRegistryTags,
} from '@app/queue-manager/job-registry/domain/value-objects';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(QueueManagerUpdateJobRegistryByIdCommand)
export class QueueManagerUpdateJobRegistryByIdCommandHandler
    implements ICommandHandler<QueueManagerUpdateJobRegistryByIdCommand>
{
    constructor(
        private readonly updateJobRegistryByIdService: QueueManagerUpdateJobRegistryByIdService,
    ) {}

    async execute(
        command: QueueManagerUpdateJobRegistryByIdCommand,
    ): Promise<void> {
        // call to use case and implements ValueObjects
        await this.updateJobRegistryByIdService.main(
            {
                id: new QueueManagerJobRegistryId(command.payload.id),
                queueName: new QueueManagerJobRegistryQueueName(
                    command.payload.queueName,
                    { undefinable: true },
                ),
                state: new QueueManagerJobRegistryState(command.payload.state, {
                    undefinable: true,
                }),
                jobId: new QueueManagerJobRegistryJobId(command.payload.jobId, {
                    undefinable: true,
                }),
                jobName: new QueueManagerJobRegistryJobName(
                    command.payload.jobName,
                ),
                tags: new QueueManagerJobRegistryTags(command.payload.tags),
            },
            command.constraint,
            command.cQMetadata,
        );
    }
}
