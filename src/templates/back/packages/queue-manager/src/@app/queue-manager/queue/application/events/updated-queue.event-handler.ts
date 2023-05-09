import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UpdatedQueueEvent } from './updated-queue.event';

@EventsHandler(UpdatedQueueEvent)
export class UpdatedQueueEventHandler implements IEventHandler<UpdatedQueueEvent>
{
    handle(event: UpdatedQueueEvent): void
    {
        // console.log('UpdatedQueueEvent: ', event);
    }
}