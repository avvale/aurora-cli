import { QueueManagerJob, QueueManagerJobState } from '@api/graphql';
import { QueueManagerJobDto } from '@api/queue-manager/job';
import { getQueueToken } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { Job } from 'bull';

@Injectable()
export class QueueManagerFindJobByIdHandler
{
    constructor(
        private readonly moduleRef: ModuleRef,
    ) {}

    async main(
        id: string,
        name?: string,
    ): Promise<QueueManagerJob | QueueManagerJobDto>
    {
        const queueInstance = this.moduleRef.get(
            getQueueToken(name),
            { strict: false },
        );

        const job: Job = await queueInstance.getJob(id);
        const state = await job.getState();

        return {
            ...job.toJSON(),
            state: QueueManagerJobState[state.toUpperCase()],
        }
    }
}