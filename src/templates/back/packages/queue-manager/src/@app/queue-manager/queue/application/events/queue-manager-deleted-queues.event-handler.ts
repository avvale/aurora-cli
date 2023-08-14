import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { QueueManagerDeletedQueuesEvent } from './queue-manager-deleted-queues.event';

@EventsHandler(QueueManagerDeletedQueuesEvent)
export class QueueManagerDeletedQueuesEventHandler implements IEventHandler<QueueManagerDeletedQueuesEvent>
{
    handle(event: QueueManagerDeletedQueuesEvent): void
    {
        // console.log('DeletedQueuesEvent: ', event);
    }
}
