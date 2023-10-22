import { QueueManagerUpdatedQueuesEvent } from '@app/queue-manager/queue';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(QueueManagerUpdatedQueuesEvent)
export class QueueManagerUpdatedQueuesEventHandler implements IEventHandler<QueueManagerUpdatedQueuesEvent>
{
    handle(event: QueueManagerUpdatedQueuesEvent): void
    {
        // console.log('QueueManagerUpdatedQueuesEvent: ', event);
    }
}
