import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { OAuthDeletedClientEvent } from './o-auth-deleted-client.event';

@EventsHandler(OAuthDeletedClientEvent)
export class OAuthDeletedClientEventHandler implements IEventHandler<OAuthDeletedClientEvent>
{
    handle(event: OAuthDeletedClientEvent): void
    {
        // console.log('OAuthDeletedClientEvent: ', event);
    }
}
