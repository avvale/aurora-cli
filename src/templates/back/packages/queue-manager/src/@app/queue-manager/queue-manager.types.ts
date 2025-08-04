import { RegisterQueueOptions } from '@nestjs/bullmq';

export const QUEUE_REDIS = Symbol('QUEUE_REDIS');

export interface QueueDefinition
{
    prefix: string;
    name: string;
}

export interface QueueRegister
{
    [key:string]: RegisterQueueOptions[];
}