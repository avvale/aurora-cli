import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { OAuthCreatedScopeEvent } from './o-auth-created-scope.event';

@EventsHandler(OAuthCreatedScopeEvent)
export class OAuthCreatedScopeEventHandler implements IEventHandler<OAuthCreatedScopeEvent>
{
    handle(event: OAuthCreatedScopeEvent): void
    {
        // console.log('OAuthCreatedScopeEvent: ', event);
    }
}
