import { QueueManagerDeletedQueueEvent } from '@app/queue-manager/queue';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(QueueManagerDeletedQueueEvent)
export class QueueManagerDeletedQueueEventHandler implements IEventHandler<QueueManagerDeletedQueueEvent>
{
    handle(event: QueueManagerDeletedQueueEvent): void
    {
        // console.log('QueueManagerDeletedQueueEvent: ', event);
    }
}
