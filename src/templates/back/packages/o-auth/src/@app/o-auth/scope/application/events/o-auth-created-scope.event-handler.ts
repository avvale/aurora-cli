import { OAuthCreatedScopeEvent } from '@app/o-auth/scope';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(OAuthCreatedScopeEvent)
export class OAuthCreatedScopeEventHandler
  implements IEventHandler<OAuthCreatedScopeEvent>
{
  handle(event: OAuthCreatedScopeEvent): void {
    // console.log('OAuthCreatedScopeEvent: ', event);
  }
}
