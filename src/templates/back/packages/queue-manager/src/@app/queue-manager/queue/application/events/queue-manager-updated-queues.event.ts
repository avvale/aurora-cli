import { QueueManagerUpdatedQueueEvent } from './queue-manager-updated-queue.event';

export class QueueManagerUpdatedQueuesEvent
{
    constructor(
        public readonly queues: QueueManagerUpdatedQueueEvent[],
    ) {}
}
