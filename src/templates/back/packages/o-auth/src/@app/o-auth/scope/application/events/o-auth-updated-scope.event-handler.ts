import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { OAuthUpdatedScopeEvent } from './o-auth-updated-scope.event';

@EventsHandler(OAuthUpdatedScopeEvent)
export class OAuthUpdatedScopeEventHandler implements IEventHandler<OAuthUpdatedScopeEvent>
{
    handle(event: OAuthUpdatedScopeEvent): void
    {
        // console.log('UpdatedScopeEvent: ', event);
    }
}
