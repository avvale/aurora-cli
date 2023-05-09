import { ModuleRef } from '@nestjs/core';
import { Injectable } from '@nestjs/common';
import { getQueueToken } from '@nestjs/bull';
import { Job } from 'bull';

// @app
import { QueueManagerJob } from '@api/graphql';
import { QueueManagerJobDto } from '../dto';

@Injectable()
export class QueueManagerDeleteJobByIdHandler
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

        // remove job from redis database
        job.remove();

        return job.toJSON();
    }
}