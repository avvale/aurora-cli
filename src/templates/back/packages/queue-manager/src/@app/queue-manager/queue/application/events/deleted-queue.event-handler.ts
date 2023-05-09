import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { DeletedQueueEvent } from './deleted-queue.event';

@EventsHandler(DeletedQueueEvent)
export class DeletedQueueEventHandler implements IEventHandler<DeletedQueueEvent>
{
    handle(event: DeletedQueueEvent): void
    {
        // console.log('DeletedQueueEvent: ', event);
    }
}