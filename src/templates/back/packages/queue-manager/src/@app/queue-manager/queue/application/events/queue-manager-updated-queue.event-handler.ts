import { QueueManagerUpdatedQueueEvent } from '@app/queue-manager/queue';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(QueueManagerUpdatedQueueEvent)
export class QueueManagerUpdatedQueueEventHandler
  implements IEventHandler<QueueManagerUpdatedQueueEvent>
{
  handle(event: QueueManagerUpdatedQueueEvent): void {
    // console.log('UpdatedQueueEvent: ', event);
  }
}
