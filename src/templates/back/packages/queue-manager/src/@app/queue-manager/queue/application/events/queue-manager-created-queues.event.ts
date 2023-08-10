import { QueueManagerCreatedQueueEvent } from './queue-manager-created-queue.event';

export class QueueManagerCreatedQueuesEvent
{
    constructor(
        public readonly queues: QueueManagerCreatedQueueEvent[],
    ) {}
}
