import { QueueManagerJobState } from '@api/graphql';
import { QueueManagerCreateJobRegistryCommand } from '@app/queue-manager';
import { ICommandBus, Utils } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { Job, JobsOptions, Queue } from 'bullmq';

@Injectable()
export class QueueManagerJobService {
  constructor(private readonly commandBus: ICommandBus) {}

  async add<T>(
    queue: Queue,
    data: T,
    tags: string | string[],
    jobName: string,
    opts?: JobsOptions,
  ): Promise<Job<T>>;
  async add<T>(
    queue: Queue,
    data: T,
    tags: string | string[],
    opts?: JobsOptions,
  ): Promise<Job<T>>;
  async add<T>(
    queue: Queue,
    data: T,
    tags: string | string[],
    jobNameOrOpts?: string | JobsOptions,
    opts?: JobsOptions,
  ): Promise<Job<T>> {
    // get job name and opts
    const jobName: string =
      typeof jobNameOrOpts === 'string' ? jobNameOrOpts : '__default__';
    opts = typeof jobNameOrOpts === 'object' ? jobNameOrOpts : opts;

    // add job to queue
    const job: Job = await queue.add(jobName, data, opts);

    // add job to job registry
    await this.commandBus.dispatch(
      new QueueManagerCreateJobRegistryCommand({
        id: Utils.uuid(),
        queueName: queue.name,
        jobId: job.id.toString(),
        jobName: jobName ? jobName : undefined,
        tags: Array.isArray(tags) ? tags : [tags],
        state: QueueManagerJobState.WAITING,
      }),
    );

    return job;
  }
}
