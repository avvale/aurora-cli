import { Injectable } from '@nestjs/common';

// @app
import { QueueManagerJob } from '@api/graphql';
import { QueueManagerJobDto } from '../dto';
import { getQueueToken } from '@nestjs/bull';
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

        return job.toJSON();
    }
}