import { OAuthDeletedRefreshTokenEvent } from '@app/o-auth/refresh-token';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(OAuthDeletedRefreshTokenEvent)
export class OAuthDeletedRefreshTokenEventHandler
    implements IEventHandler<OAuthDeletedRefreshTokenEvent>
{
    handle(event: OAuthDeletedRefreshTokenEvent): void {
        // console.log('OAuthDeletedRefreshTokenEvent: ', event);
    }
}
