import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { QueueManagerDeletedQueueEvent } from './queue-manager-deleted-queue.event';

@EventsHandler(QueueManagerDeletedQueueEvent)
export class QueueManagerDeletedQueueEventHandler implements IEventHandler<QueueManagerDeletedQueueEvent>
{
    handle(event: QueueManagerDeletedQueueEvent): void
    {
        // console.log('QueueManagerDeletedQueueEvent: ', event);
    }
}
