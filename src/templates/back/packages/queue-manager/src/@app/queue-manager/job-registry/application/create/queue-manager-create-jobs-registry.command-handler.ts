/* eslint-disable key-spacing */
import { QueueManagerCreateJobsRegistryCommand } from '@app/queue-manager/job-registry';
import { QueueManagerCreateJobsRegistryService } from '@app/queue-manager/job-registry/application/create/queue-manager-create-jobs-registry.service';
import {
  QueueManagerJobRegistryId,
  QueueManagerJobRegistryJobId,
  QueueManagerJobRegistryJobName,
  QueueManagerJobRegistryQueueName,
  QueueManagerJobRegistryState,
  QueueManagerJobRegistryTags,
} from '@app/queue-manager/job-registry/domain/value-objects';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(QueueManagerCreateJobsRegistryCommand)
export class QueueManagerCreateJobsRegistryCommandHandler
  implements ICommandHandler<QueueManagerCreateJobsRegistryCommand>
{
  constructor(
    private readonly createJobsRegistryService: QueueManagerCreateJobsRegistryService,
  ) {}

  async execute(command: QueueManagerCreateJobsRegistryCommand): Promise<void> {
    // call to use case and implements ValueObjects
    await this.createJobsRegistryService.main(
      command.payload.map((jobRegistry) => {
        return {
          id: new QueueManagerJobRegistryId(jobRegistry.id),
          queueName: new QueueManagerJobRegistryQueueName(
            jobRegistry.queueName,
          ),
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
