import { CreatedQueueEvent } from './created-queue.event';

export class CreatedQueuesEvent
{
    constructor(
        public readonly queues: CreatedQueueEvent[],
    ) {}
}