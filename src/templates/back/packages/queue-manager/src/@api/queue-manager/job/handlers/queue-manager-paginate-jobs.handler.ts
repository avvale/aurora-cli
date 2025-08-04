import { Pagination } from '@api/graphql';
import { QueueManagerFindQueueByIdQuery } from '@app/queue-manager';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { getQueueToken } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { Queue } from 'bullmq';

@Injectable()
export class QueueManagerPaginateJobsHandler
{
    constructor(
        private readonly queryBus: IQueryBus,
        private readonly moduleRef: ModuleRef,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<Pagination>
    {
        // get queue from database
        const queue = await this.queryBus.ask(new QueueManagerFindQueueByIdQuery(
            constraint.where.queueId,
        ));

        // get queue from redis database
        const queueInstance: Queue = this.moduleRef.get(
            getQueueToken(queue.name),
            { strict: false },
        );

        // get all jobs from redis database
        //'completed' | 'waiting' | 'active' | 'delayed' | 'failed'| 'paused';
        const jobs = await queueInstance.getJobs(
            [constraint.where.jobType],
            queryStatement.offset,
            queryStatement.offset + queryStatement.limit -1,
        );

        // get count jobs from redis database
        let count = 0;
        switch (constraint.where.jobType)
        {
            case 'completed':
                count = await queueInstance.getCompletedCount();
                break;
            case 'waiting':
                count = await queueInstance.getWaitingCount();
                break;
            case 'active':
                count = await queueInstance.getActiveCount();
                break;
            case 'delayed':
                count = await queueInstance.getDelayedCount();
                break;
            case 'failed':
                count = await queueInstance.getFailedCount();
                break;
            case 'paused':
                count = await queueInstance.getWaitingCount();
                break;
        }

        return {
            total: count,
            count,
            rows : jobs,
        };
    }
}