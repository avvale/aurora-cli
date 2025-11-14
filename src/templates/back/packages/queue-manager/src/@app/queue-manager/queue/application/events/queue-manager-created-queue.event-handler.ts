import { QueueManagerCreatedQueueEvent } from '@app/queue-manager/queue';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(QueueManagerCreatedQueueEvent)
export class QueueManagerCreatedQueueEventHandler
    implements IEventHandler<QueueManagerCreatedQueueEvent>
{
    handle(event: QueueManagerCreatedQueueEvent): void {
        // console.log('QueueManagerCreatedQueueEvent: ', event);
    }
}
