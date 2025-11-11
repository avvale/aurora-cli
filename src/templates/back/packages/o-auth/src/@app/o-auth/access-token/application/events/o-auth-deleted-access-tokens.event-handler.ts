import { OAuthDeletedAccessTokensEvent } from '@app/o-auth/access-token';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(OAuthDeletedAccessTokensEvent)
export class OAuthDeletedAccessTokensEventHandler
    implements IEventHandler<OAuthDeletedAccessTokensEvent>
{
    handle(event: OAuthDeletedAccessTokensEvent): void {
        // console.log('DeletedAccessTokensEvent: ', event);
    }
}
