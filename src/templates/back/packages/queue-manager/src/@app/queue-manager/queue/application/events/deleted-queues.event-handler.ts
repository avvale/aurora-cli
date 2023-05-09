import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { DeletedQueuesEvent } from './deleted-queues.event';

@EventsHandler(DeletedQueuesEvent)
export class DeletedQueuesEventHandler implements IEventHandler<DeletedQueuesEvent>
{
    handle(event: DeletedQueuesEvent): void
    {
        // console.log('DeletedQueuesEvent: ', event);
    }
}