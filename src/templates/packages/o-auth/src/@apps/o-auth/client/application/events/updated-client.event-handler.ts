import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UpdatedClientEvent } from './updated-client.event';

@EventsHandler(UpdatedClientEvent)
export class UpdatedClientEventHandler implements IEventHandler<UpdatedClientEvent>
{
    handle(event: UpdatedClientEvent)
    {
        // console.log('UpdatedClientEvent: ', event);
    }
}