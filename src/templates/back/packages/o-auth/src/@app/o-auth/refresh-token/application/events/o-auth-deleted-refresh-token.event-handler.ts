import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { OAuthDeletedRefreshTokenEvent } from './o-auth-deleted-refresh-token.event';

@EventsHandler(OAuthDeletedRefreshTokenEvent)
export class OAuthDeletedRefreshTokenEventHandler implements IEventHandler<OAuthDeletedRefreshTokenEvent>
{
    handle(event: OAuthDeletedRefreshTokenEvent): void
    {
        // console.log('OAuthDeletedRefreshTokenEvent: ', event);
    }
}
