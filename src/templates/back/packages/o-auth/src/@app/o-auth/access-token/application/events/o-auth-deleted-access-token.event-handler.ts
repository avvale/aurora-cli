import { OAuthDeletedAccessTokenEvent } from '@app/o-auth/access-token';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(OAuthDeletedAccessTokenEvent)
export class OAuthDeletedAccessTokenEventHandler
  implements IEventHandler<OAuthDeletedAccessTokenEvent>
{
  handle(event: OAuthDeletedAccessTokenEvent): void {
    // console.log('OAuthDeletedAccessTokenEvent: ', event);
  }
}
