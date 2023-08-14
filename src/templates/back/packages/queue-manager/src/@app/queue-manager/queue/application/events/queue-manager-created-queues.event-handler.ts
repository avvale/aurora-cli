import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { QueueManagerCreatedQueuesEvent } from './queue-manager-created-queues.event';

@EventsHandler(QueueManagerCreatedQueuesEvent)
export class QueueManagerCreatedQueuesEventHandler implements IEventHandler<QueueManagerCreatedQueuesEvent>
{
    handle(event: QueueManagerCreatedQueuesEvent): void
    {
        // console.log('CreatedQueuesEvent: ', event);
    }
}
