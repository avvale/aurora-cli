import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { QueueManagerCreatedQueueEvent } from './queue-manager-created-queue.event';

@EventsHandler(QueueManagerCreatedQueueEvent)
export class QueueManagerCreatedQueueEventHandler implements IEventHandler<QueueManagerCreatedQueueEvent>
{
    handle(event: QueueManagerCreatedQueueEvent): void
    {
        // console.log('QueueManagerCreatedQueueEvent: ', event);
    }
}
