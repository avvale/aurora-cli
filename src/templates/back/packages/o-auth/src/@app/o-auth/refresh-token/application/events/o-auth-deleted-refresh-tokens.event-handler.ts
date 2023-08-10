import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { OAuthDeletedRefreshTokensEvent } from './o-auth-deleted-refresh-tokens.event';

@EventsHandler(OAuthDeletedRefreshTokensEvent)
export class OAuthDeletedRefreshTokensEventHandler implements IEventHandler<OAuthDeletedRefreshTokensEvent>
{
    handle(event: OAuthDeletedRefreshTokensEvent): void
    {
        // console.log('DeletedRefreshTokensEvent: ', event);
    }
}
