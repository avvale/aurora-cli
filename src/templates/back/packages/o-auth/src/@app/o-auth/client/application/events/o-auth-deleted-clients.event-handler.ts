import { OAuthDeletedClientsEvent } from '@app/o-auth/client';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(OAuthDeletedClientsEvent)
export class OAuthDeletedClientsEventHandler
    implements IEventHandler<OAuthDeletedClientsEvent>
{
    handle(event: OAuthDeletedClientsEvent): void {
        // console.log('DeletedClientsEvent: ', event);
    }
}
