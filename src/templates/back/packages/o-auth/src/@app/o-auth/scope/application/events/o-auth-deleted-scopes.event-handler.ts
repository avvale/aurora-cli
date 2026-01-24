import { OAuthDeletedScopesEvent } from '@app/o-auth/scope';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(OAuthDeletedScopesEvent)
export class OAuthDeletedScopesEventHandler
  implements IEventHandler<OAuthDeletedScopesEvent>
{
  handle(event: OAuthDeletedScopesEvent): void {
    // console.log('DeletedScopesEvent: ', event);
  }
}
