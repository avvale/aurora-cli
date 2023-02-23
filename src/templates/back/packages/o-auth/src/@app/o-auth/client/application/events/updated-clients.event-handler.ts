import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UpdatedClientsEvent } from './updated-clients.event';

@EventsHandler(UpdatedClientsEvent)
export class UpdatedClientsEventHandler implements IEventHandler<UpdatedClientsEvent>
{
    handle(event: UpdatedClientsEvent): void
    {
        // console.log('UpdatedClientsEvent: ', event);
    }
}