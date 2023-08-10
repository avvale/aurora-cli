import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { OAuthUpdatedClientsEvent } from './o-auth-updated-clients.event';

@EventsHandler(OAuthUpdatedClientsEvent)
export class OAuthUpdatedClientsEventHandler implements IEventHandler<OAuthUpdatedClientsEvent>
{
    handle(event: OAuthUpdatedClientsEvent): void
    {
        // console.log('OAuthUpdatedClientsEvent: ', event);
    }
}
