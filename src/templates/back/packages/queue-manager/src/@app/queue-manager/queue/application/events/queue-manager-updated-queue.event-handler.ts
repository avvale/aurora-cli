import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { QueueManagerUpdatedQueueEvent } from './queue-manager-updated-queue.event';

@EventsHandler(QueueManagerUpdatedQueueEvent)
export class QueueManagerUpdatedQueueEventHandler implements IEventHandler<QueueManagerUpdatedQueueEvent>
{
    handle(event: QueueManagerUpdatedQueueEvent): void
    {
        // console.log('UpdatedQueueEvent: ', event);
    }
}
