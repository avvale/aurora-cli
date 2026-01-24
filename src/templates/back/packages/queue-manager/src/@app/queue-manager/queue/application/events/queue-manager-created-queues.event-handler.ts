import { QueueManagerCreatedQueuesEvent } from '@app/queue-manager/queue';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(QueueManagerCreatedQueuesEvent)
export class QueueManagerCreatedQueuesEventHandler
  implements IEventHandler<QueueManagerCreatedQueuesEvent>
{
  handle(event: QueueManagerCreatedQueuesEvent): void {
    // console.log('CreatedQueuesEvent: ', event);
  }
}
