import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { OAuthDeletedClientsEvent } from './o-auth-deleted-clients.event';

@EventsHandler(OAuthDeletedClientsEvent)
export class OAuthDeletedClientsEventHandler implements IEventHandler<OAuthDeletedClientsEvent>
{
    handle(event: OAuthDeletedClientsEvent): void
    {
        // console.log('DeletedClientsEvent: ', event);
    }
}
