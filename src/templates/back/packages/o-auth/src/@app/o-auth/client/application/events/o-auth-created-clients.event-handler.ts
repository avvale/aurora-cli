import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { OAuthCreatedClientsEvent } from './o-auth-created-clients.event';

@EventsHandler(OAuthCreatedClientsEvent)
export class OAuthCreatedClientsEventHandler implements IEventHandler<OAuthCreatedClientsEvent>
{
    handle(event: OAuthCreatedClientsEvent): void
    {
        // console.log('CreatedClientsEvent: ', event);
    }
}
