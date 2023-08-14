import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { OAuthDeletedScopeEvent } from './o-auth-deleted-scope.event';

@EventsHandler(OAuthDeletedScopeEvent)
export class OAuthDeletedScopeEventHandler implements IEventHandler<OAuthDeletedScopeEvent>
{
    handle(event: OAuthDeletedScopeEvent): void
    {
        // console.log('OAuthDeletedScopeEvent: ', event);
    }
}
