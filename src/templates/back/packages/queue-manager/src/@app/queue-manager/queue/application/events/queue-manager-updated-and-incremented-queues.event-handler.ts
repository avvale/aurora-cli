import { QueueManagerUpdatedAndIncrementedQueuesEvent } from '@app/queue-manager/queue';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(QueueManagerUpdatedAndIncrementedQueuesEvent)
export class QueueManagerUpdatedAndIncrementedQueuesEventHandler implements IEventHandler<QueueManagerUpdatedAndIncrementedQueuesEvent>
{
    handle(event: QueueManagerUpdatedAndIncrementedQueuesEvent): void
    {
        // console.log('QueueManagerUpdatedAndIncrementedQueuesEvent: ', event);
    }
}
