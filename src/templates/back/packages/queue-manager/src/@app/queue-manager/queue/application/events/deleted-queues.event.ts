import { DeletedQueueEvent } from './deleted-queue.event';

export class DeletedQueuesEvent
{
    constructor(
        public readonly queues: DeletedQueueEvent[],
    ) {}
}