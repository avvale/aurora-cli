import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { DeletedClientEvent } from './deleted-client.event';

@EventsHandler(DeletedClientEvent)
export class DeletedClientEventHandler implements IEventHandler<DeletedClientEvent>
{
    handle(event: DeletedClientEvent): void
    {
        // console.log('DeletedClientEvent: ', event);
    }
}