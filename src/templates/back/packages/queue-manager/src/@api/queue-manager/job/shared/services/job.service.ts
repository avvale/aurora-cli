import { Injectable } from '@nestjs/common';
import { ICommandBus, Utils } from '@aurora-ts/core';
import { Job, JobOptions, Queue } from 'bull';
import { CreateJobRegistryCommand } from '@app/queue-manager/job-registry/application/create/create-job-registry.command';

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
        jobName?: string,
        opts?: JobOptions,
    ): Promise<Job<T>>
    {
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
        }));

        return job;
    }
}