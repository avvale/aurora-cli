import { OAuthCreatedAccessTokenEvent } from '@app/o-auth/access-token';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(OAuthCreatedAccessTokenEvent)
export class OAuthCreatedAccessTokenEventHandler
    implements IEventHandler<OAuthCreatedAccessTokenEvent>
{
    handle(event: OAuthCreatedAccessTokenEvent): void {
        // console.log('OAuthCreatedAccessTokenEvent: ', event);
    }
}
