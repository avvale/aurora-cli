import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UpdatedQueuesEvent } from './updated-queues.event';

@EventsHandler(UpdatedQueuesEvent)
export class UpdatedQueuesEventHandler implements IEventHandler<UpdatedQueuesEvent>
{
    handle(event: UpdatedQueuesEvent): void
    {
        // console.log('UpdatedQueuesEvent: ', event);
    }
}