import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { OAuthDeletedAccessTokensEvent } from './o-auth-deleted-access-tokens.event';

@EventsHandler(OAuthDeletedAccessTokensEvent)
export class OAuthDeletedAccessTokensEventHandler implements IEventHandler<OAuthDeletedAccessTokensEvent>
{
    handle(event: OAuthDeletedAccessTokensEvent): void
    {
        // console.log('DeletedAccessTokensEvent: ', event);
    }
}
