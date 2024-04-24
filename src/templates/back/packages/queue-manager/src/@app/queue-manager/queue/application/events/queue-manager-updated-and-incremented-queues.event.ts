import { QueueManagerUpdatedAndIncrementedQueueEvent } from './queue-manager-updated-and-incremented-queue.event';

export class QueueManagerUpdatedAndIncrementedQueuesEvent
{
    constructor(
        public readonly queues: QueueManagerUpdatedAndIncrementedQueueEvent[],
    ) {}
}
