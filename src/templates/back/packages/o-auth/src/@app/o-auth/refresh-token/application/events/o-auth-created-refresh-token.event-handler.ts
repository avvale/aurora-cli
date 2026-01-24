import { OAuthCreatedRefreshTokenEvent } from '@app/o-auth/refresh-token';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(OAuthCreatedRefreshTokenEvent)
export class OAuthCreatedRefreshTokenEventHandler
  implements IEventHandler<OAuthCreatedRefreshTokenEvent>
{
  handle(event: OAuthCreatedRefreshTokenEvent): void {
    // console.log('OAuthCreatedRefreshTokenEvent: ', event);
  }
}
