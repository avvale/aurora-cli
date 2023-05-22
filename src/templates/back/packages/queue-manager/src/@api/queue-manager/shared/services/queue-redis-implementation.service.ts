/* eslint-disable no-await-in-loop */
import { ModuleRef } from '@nestjs/core';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ICommandBus, Utils } from '@aurorajs.dev/core';
import { getQueueToken } from '@nestjs/bull';
import { QueueDefinition, QUEUE_REDIS } from '@app/queue-manager/queue-manager.types';
import { CreateQueuesCommand } from '@app/queue-manager/queue/application/create/create-queues.command';
import { DeleteQueuesCommand } from '@app/queue-manager/queue/application/delete/delete-queues.command';
import { QueueStorage } from '../../../../app.queues';
import { QueueManagerQueue } from '@api/graphql';

@Injectable()
export class QueueRedisImplementationService
{
    constructor(
        @Inject(QUEUE_REDIS) private readonly queueRedis,
        private readonly commandBus: ICommandBus,
        private readonly configService: ConfigService,
        private readonly moduleRef: ModuleRef,
    )
    {}

    async onApplicationBootstrap(): Promise<void>
    {
        const queueManagerPrefix = this.configService.get('QUEUE_MANAGER_PREFIX') || 'bull';

        // get all queue names from all bounded contexts
        const queueNames = Object.values(QueueStorage) as string[];

        // get all queues from redis and delete all that not appear in app.queues
        const queues = await this.getQueues();
        for (const queue of queues)
        {
            // delete all queues that are not register
            // in app.queues in redis database
            if (
                queue.prefix === queueManagerPrefix &&
                !queueNames.includes(queue.name)
            )
            {
                this.queueRedis.del(`${queue.prefix}:${queue.name}:id`);
                continue;
            }
        }

        // create queues that are register in app.queues
        const payload = [];
        for (const queueName of queueNames)
        {
            try
            {
                payload.push({
                    id    : Utils.uuid(),
                    prefix: queueManagerPrefix,
                    name  : queueName,
                });
            }
            catch (error)
            {
                Logger.error(
                    error.message,
                    // error.stack,
                    'QueueRedisImplementationService',
                );
            }
        }

        // clean queues table
        await this.commandBus.dispatch(new DeleteQueuesCommand({
            where: {},
        }));

        // create existing queues in redis
        await this.commandBus.dispatch(new CreateQueuesCommand(
            payload,
        ));
    }

    async addQueueCounters(queue): Promise<QueueManagerQueue>
    {
        const queueInstance = this.moduleRef.get(
            getQueueToken(queue.name),
            { strict: false },
        );

        const totalJobs = await queueInstance.count();
        const {
            waiting: waitingJobs,
            active: activeJobs,
            completed: completedJobs,
            failed: failedJobs,
            delayed: delayedJobs,
            paused: pausedJobs,
        } = await queueInstance.getJobCounts();

        return {
            ...queue,
            totalJobs,
            waitingJobs,
            activeJobs,
            completedJobs,
            failedJobs,
            delayedJobs,
            pausedJobs,
        };
    }

    // get all queues from redis
    async getQueues(): Promise<QueueDefinition[]>
    {
        const queueNameRegExp = new RegExp('(.*):(.*):id');
        const keys = await this.queueRedis.keys('*:*:id');
        const queues = keys.map(function(key)
        {
            const match = queueNameRegExp.exec(key);
            if (match)
            {
                return {
                    prefix: match[1],
                    name  : match[2],
                };
            }
        });

        return queues;
    }
}