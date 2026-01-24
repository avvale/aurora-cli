/* eslint-disable key-spacing */
import { QueueManagerCreateJobRegistryCommand } from '@app/queue-manager/job-registry';
import { QueueManagerCreateJobRegistryService } from '@app/queue-manager/job-registry/application/create/queue-manager-create-job-registry.service';
import {
  QueueManagerJobRegistryId,
  QueueManagerJobRegistryJobId,
  QueueManagerJobRegistryJobName,
  QueueManagerJobRegistryQueueName,
  QueueManagerJobRegistryState,
  QueueManagerJobRegistryTags,
} from '@app/queue-manager/job-registry/domain/value-objects';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(QueueManagerCreateJobRegistryCommand)
export class QueueManagerCreateJobRegistryCommandHandler
  implements ICommandHandler<QueueManagerCreateJobRegistryCommand>
{
  constructor(
    private readonly createJobRegistryService: QueueManagerCreateJobRegistryService,
  ) {}

  async execute(command: QueueManagerCreateJobRegistryCommand): Promise<void> {
    // call to use case and implements ValueObjects
    await this.createJobRegistryService.main(
      {
        id: new QueueManagerJobRegistryId(command.payload.id),
        queueName: new QueueManagerJobRegistryQueueName(
          command.payload.queueName,
        ),
        state: new QueueManagerJobRegistryState(command.payload.state),
        jobId: new QueueManagerJobRegistryJobId(command.payload.jobId),
        jobName: new QueueManagerJobRegistryJobName(command.payload.jobName),
        tags: new QueueManagerJobRegistryTags(command.payload.tags),
      },
      command.cQMetadata,
    );
  }
}
