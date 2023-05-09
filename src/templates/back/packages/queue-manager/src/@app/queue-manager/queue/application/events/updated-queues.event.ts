import { UpdatedQueueEvent } from './updated-queue.event';

export class UpdatedQueuesEvent
{
    constructor(
        public readonly queues: UpdatedQueueEvent[],
    ) {}
}