import { Utils } from '@aurora-ts/core';
import { Processor, Process, OnGlobalQueueRemoved, OnGlobalQueueCleaned, OnQueueRemoved, OnQueueCleaned } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';
import { QueueStorage } from 'src/app.queues';

@Processor(QueueStorage.COMMON_MAIL)
export class QueueManagerEmailConsumer
{
    @Process()
    async transcode(job: Job<unknown>): Promise<unknown>
    {
        try
        {
            //Logger.log('JOB: ', job);
            await Utils.wait(5000);
            // throw new Error('Error to send email');
            Logger.log('Email sent successfully');

            return {
                status: 'success',
                text  : 'Email sent successfully',
            };
        }
        catch (error)
        {
            Logger.error('Error to send email');
            throw new Error('Error to send emai2');
            return {
                status: 'error',
                text  : 'Error to send email sent successfully',
            };
        }
    }

    @OnGlobalQueueRemoved()
    async onGlobalRemoved(jobId: number): Promise<void>
    {
        console.log(jobId);
        console.log('(Global) on removed: job');
    }

    @OnQueueRemoved()
    async onRemoved(job: Job): Promise<void>
    {
        //console.log(job);
        console.log('on removed: job');
    }

    @OnGlobalQueueCleaned()
    async onGlobalCleaned(jobIds: number[], type: string): Promise<void>
    {
        console.log(jobIds);
        console.log('(Global) on cleaned: job -> type: ', type);
    }

    @OnQueueCleaned()
    async onCleaned(jobs: Job[], type: string): Promise<void>
    {
        console.log(jobs);
        console.log('on cleaned: job ', jobs, ' -> type: ', type);
    }
}