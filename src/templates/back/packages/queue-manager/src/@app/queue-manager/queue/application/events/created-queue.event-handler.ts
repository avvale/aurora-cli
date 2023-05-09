import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CreatedQueueEvent } from './created-queue.event';

@EventsHandler(CreatedQueueEvent)
export class CreatedQueueEventHandler implements IEventHandler<CreatedQueueEvent>
{
    handle(event: CreatedQueueEvent): void
    {
        // console.log('CreatedQueueEvent: ', event);
    }
}