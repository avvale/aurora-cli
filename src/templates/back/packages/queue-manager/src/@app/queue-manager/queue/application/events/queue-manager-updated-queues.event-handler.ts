import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { QueueManagerUpdatedQueuesEvent } from './queue-manager-updated-queues.event';

@EventsHandler(QueueManagerUpdatedQueuesEvent)
export class QueueManagerUpdatedQueuesEventHandler implements IEventHandler<QueueManagerUpdatedQueuesEvent>
{
    handle(event: QueueManagerUpdatedQueuesEvent): void
    {
        // console.log('QueueManagerUpdatedQueuesEvent: ', event);
    }
}
