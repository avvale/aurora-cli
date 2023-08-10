import { QueueManagerDeletedQueueEvent } from './queue-manager-deleted-queue.event';

export class QueueManagerDeletedQueuesEvent
{
    constructor(
        public readonly queues: QueueManagerDeletedQueueEvent[],
    ) {}
}
