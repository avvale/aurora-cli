import { OAuthUpdatedScopeEvent } from '@app/o-auth/scope';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(OAuthUpdatedScopeEvent)
export class OAuthUpdatedScopeEventHandler
  implements IEventHandler<OAuthUpdatedScopeEvent>
{
  handle(event: OAuthUpdatedScopeEvent): void {
    // console.log('UpdatedScopeEvent: ', event);
  }
}
