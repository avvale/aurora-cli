import { Injectable } from '@nestjs/common';
import { ICommandBus, Utils } from '@aurorajs.dev/core';
import { Job, JobOptions, Queue } from 'bull';
import { CreateJobRegistryCommand } from '@app/queue-manager/job-registry/application/create/create-job-registry.command';
import { QueueManagerJobState } from '@api/graphql';

@Injectable()
export class QueueManagerJobService
{
    constructor(
        private readonly commandBus: ICommandBus,
    ) {}

    async add<T>(
        queue: Queue,
        data: T,
        tags: string | string[],
        jobName: string,
        opts?: JobOptions,
    ): Promise<Job<T>>;
    async add<T>(
        queue: Queue,
        data: T,
        tags: string | string[],
        opts?: JobOptions,
    ): Promise<Job<T>>;
    async add<T>(
        queue: Queue,
        data: T,
        tags: string | string[],
        jobNameOrOpts?: string | JobOptions,
        opts?: JobOptions,
    ): Promise<Job<T>>
    {
        // get job name and opts
        const jobName: string = typeof jobNameOrOpts === 'string' ? jobNameOrOpts : '__default__';
        opts = typeof jobNameOrOpts === 'object' ? jobNameOrOpts : opts;

        // add job to queue
        const job: Job = await queue.add(
            jobName,
            data,
            opts,
        );

        // add job to job registry
        await this.commandBus.dispatch(new CreateJobRegistryCommand({
            id       : Utils.uuid(),
            queueName: queue.name,
            jobId    : job.id.toString(),
            jobName  : jobName ? jobName : undefined,
            tags     : Array.isArray(tags) ? tags : [tags],
            state    : QueueManagerJobState.WAITING,
        }));

        return job;
    }
}