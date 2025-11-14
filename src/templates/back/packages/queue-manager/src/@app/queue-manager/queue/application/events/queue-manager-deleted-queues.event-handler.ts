import { QueueManagerDeletedQueuesEvent } from '@app/queue-manager/queue';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(QueueManagerDeletedQueuesEvent)
export class QueueManagerDeletedQueuesEventHandler
    implements IEventHandler<QueueManagerDeletedQueuesEvent>
{
    handle(event: QueueManagerDeletedQueuesEvent): void {
        // console.log('DeletedQueuesEvent: ', event);
    }
}
