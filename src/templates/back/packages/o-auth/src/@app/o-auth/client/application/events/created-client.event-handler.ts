import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CreatedClientEvent } from './created-client.event';

@EventsHandler(CreatedClientEvent)
export class CreatedClientEventHandler implements IEventHandler<CreatedClientEvent>
{
    handle(event: CreatedClientEvent): void
    {
        // console.log('CreatedClientEvent: ', event);
    }
}