import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { OAuthDeletedAccessTokenEvent } from './o-auth-deleted-access-token.event';

@EventsHandler(OAuthDeletedAccessTokenEvent)
export class OAuthDeletedAccessTokenEventHandler implements IEventHandler<OAuthDeletedAccessTokenEvent>
{
    handle(event: OAuthDeletedAccessTokenEvent): void
    {
        // console.log('OAuthDeletedAccessTokenEvent: ', event);
    }
}
