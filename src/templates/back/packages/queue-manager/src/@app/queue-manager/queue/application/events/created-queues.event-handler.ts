import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CreatedQueuesEvent } from './created-queues.event';

@EventsHandler(CreatedQueuesEvent)
export class CreatedQueuesEventHandler implements IEventHandler<CreatedQueuesEvent>
{
    handle(event: CreatedQueuesEvent): void
    {
        // console.log('CreatedQueuesEvent: ', event);
    }
}