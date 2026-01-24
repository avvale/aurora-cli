import {
  QueueManagerAddJobsRegistryContextEvent,
  QueueManagerIJobRegistryRepository,
} from '@app/queue-manager/job-registry';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class QueueManagerDeleteJobsRegistryService {
  constructor(
    private readonly publisher: EventPublisher,
    private readonly repository: QueueManagerIJobRegistryRepository,
  ) {}

  async main(
    queryStatement?: QueryStatement,
    constraint?: QueryStatement,
    cQMetadata?: CQMetadata,
  ): Promise<void> {
    // get objects to delete
    const jobsRegistry = await this.repository.get({
      queryStatement,
      constraint,
      cQMetadata,
    });

    if (jobsRegistry.length === 0) return;

    await this.repository.delete({
      queryStatement,
      constraint,
      cQMetadata,
      deleteOptions: cQMetadata?.repositoryOptions,
    });

    // create AddJobsRegistryContextEvent to have object wrapper to add event publisher functionality
    // insert EventBus in object, to be able to apply and commit events
    const jobsRegistryRegistered = this.publisher.mergeObjectContext(
      new QueueManagerAddJobsRegistryContextEvent(jobsRegistry, cQMetadata),
    );

    jobsRegistryRegistered.deleted(); // apply event to model events
    jobsRegistryRegistered.commit(); // commit all events of model
  }
}
