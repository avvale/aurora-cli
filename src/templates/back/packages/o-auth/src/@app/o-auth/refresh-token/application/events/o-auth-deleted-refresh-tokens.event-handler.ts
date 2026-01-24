import { OAuthDeletedRefreshTokensEvent } from '@app/o-auth/refresh-token';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(OAuthDeletedRefreshTokensEvent)
export class OAuthDeletedRefreshTokensEventHandler
  implements IEventHandler<OAuthDeletedRefreshTokensEvent>
{
  handle(event: OAuthDeletedRefreshTokensEvent): void {
    // console.log('DeletedRefreshTokensEvent: ', event);
  }
}
