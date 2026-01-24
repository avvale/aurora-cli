import { QueueManagerJob, QueueManagerJobState } from '@api/graphql';
import { getQueueToken } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { Job } from 'bullmq';

@Injectable()
export class QueueManagerDeleteJobByIdHandler {
  constructor(private readonly moduleRef: ModuleRef) {}

  async main(id: string, name?: string): Promise<QueueManagerJob> {
    const queueInstance = this.moduleRef.get(getQueueToken(name), {
      strict: false,
    });

    const job: Job = await queueInstance.getJob(id);
    const state = await job.getState();

    // remove job from redis database
    await job.remove();

    return {
      ...job.toJSON(),
      state: QueueManagerJobState[state.toUpperCase()],
    };
  }
}
