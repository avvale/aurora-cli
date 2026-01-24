import {
  QueueManagerCreatedJobRegistryEvent,
  QueueManagerCreatedJobsRegistryEvent,
  QueueManagerDeletedJobRegistryEvent,
  QueueManagerDeletedJobsRegistryEvent,
  QueueManagerJobRegistry,
  QueueManagerUpdatedJobRegistryEvent,
  QueueManagerUpdatedJobsRegistryEvent,
} from '@app/queue-manager/job-registry';
import { CQMetadata } from '@aurorajs.dev/core';
import { AggregateRoot } from '@nestjs/cqrs';

export class QueueManagerAddJobsRegistryContextEvent extends AggregateRoot {
  constructor(
    public readonly aggregateRoots: QueueManagerJobRegistry[] = [],
    public readonly cQMetadata?: CQMetadata,
  ) {
    super();
  }

  *[Symbol.iterator]() {
    for (const aggregateRoot of this.aggregateRoots) yield aggregateRoot;
  }

  created(): void {
    this.apply(
      new QueueManagerCreatedJobsRegistryEvent({
        payload: this.aggregateRoots.map(
          (jobRegistry) =>
            new QueueManagerCreatedJobRegistryEvent({
              payload: {
                id: jobRegistry.id.value,
                queueName: jobRegistry.queueName.value,
                state: jobRegistry.state.value,
                jobId: jobRegistry.jobId.value,
                jobName: jobRegistry.jobName?.value,
                tags: jobRegistry.tags?.value,
                createdAt: jobRegistry.createdAt?.value,
                updatedAt: jobRegistry.updatedAt?.value,
                deletedAt: jobRegistry.deletedAt?.value,
              },
            }),
        ),
        cQMetadata: this.cQMetadata,
      }),
    );
  }

  updated(): void {
    this.apply(
      new QueueManagerUpdatedJobsRegistryEvent({
        payload: this.aggregateRoots.map(
          (jobRegistry) =>
            new QueueManagerUpdatedJobRegistryEvent({
              payload: {
                id: jobRegistry.id.value,
                queueName: jobRegistry.queueName.value,
                state: jobRegistry.state.value,
                jobId: jobRegistry.jobId.value,
                jobName: jobRegistry.jobName?.value,
                tags: jobRegistry.tags?.value,
                createdAt: jobRegistry.createdAt?.value,
                updatedAt: jobRegistry.updatedAt?.value,
                deletedAt: jobRegistry.deletedAt?.value,
              },
            }),
        ),
        cQMetadata: this.cQMetadata,
      }),
    );
  }

  deleted(): void {
    this.apply(
      new QueueManagerDeletedJobsRegistryEvent({
        payload: this.aggregateRoots.map(
          (jobRegistry) =>
            new QueueManagerDeletedJobRegistryEvent({
              payload: {
                id: jobRegistry.id.value,
                rowId: jobRegistry.rowId.value,
                queueName: jobRegistry.queueName.value,
                state: jobRegistry.state.value,
                jobId: jobRegistry.jobId.value,
                jobName: jobRegistry.jobName?.value,
                tags: jobRegistry.tags?.value,
                createdAt: jobRegistry.createdAt?.value,
                updatedAt: jobRegistry.updatedAt?.value,
                deletedAt: jobRegistry.deletedAt?.value,
              },
            }),
        ),
        cQMetadata: this.cQMetadata,
      }),
    );
  }
}
