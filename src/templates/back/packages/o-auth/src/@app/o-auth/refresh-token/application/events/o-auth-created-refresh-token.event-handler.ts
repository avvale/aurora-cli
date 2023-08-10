import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { OAuthCreatedRefreshTokenEvent } from './o-auth-created-refresh-token.event';

@EventsHandler(OAuthCreatedRefreshTokenEvent)
export class OAuthCreatedRefreshTokenEventHandler implements IEventHandler<OAuthCreatedRefreshTokenEvent>
{
    handle(event: OAuthCreatedRefreshTokenEvent): void
    {
        // console.log('OAuthCreatedRefreshTokenEvent: ', event);
    }
}
