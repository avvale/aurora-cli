import { QueueManagerJob, QueueManagerJobState } from '@api/graphql';
import { getQueueToken } from '@nestjs/bullmq';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { Job } from 'bullmq';

@Injectable()
export class QueueManagerFindJobByIdHandler {
    constructor(private readonly moduleRef: ModuleRef) {}

    async main(id: string, name?: string): Promise<QueueManagerJob> {
        const queueInstance = this.moduleRef.get(getQueueToken(name), {
            strict: false,
        });

        const job: Job = await queueInstance.getJob(id);

        if (!job) throw new NotFoundException(`Job with id ${id} not found`);

        const state = await job.getState();

        return {
            ...job.toJSON(),
            state: QueueManagerJobState[state.toUpperCase()],
        };
    }
}
