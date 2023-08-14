import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { OAuthCreatedAccessTokenEvent } from './o-auth-created-access-token.event';

@EventsHandler(OAuthCreatedAccessTokenEvent)
export class OAuthCreatedAccessTokenEventHandler implements IEventHandler<OAuthCreatedAccessTokenEvent>
{
    handle(event: OAuthCreatedAccessTokenEvent): void
    {
        // console.log('OAuthCreatedAccessTokenEvent: ', event);
    }
}
