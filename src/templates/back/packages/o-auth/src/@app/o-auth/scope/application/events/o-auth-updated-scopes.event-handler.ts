import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { OAuthUpdatedScopesEvent } from './o-auth-updated-scopes.event';

@EventsHandler(OAuthUpdatedScopesEvent)
export class OAuthUpdatedScopesEventHandler implements IEventHandler<OAuthUpdatedScopesEvent>
{
    handle(event: OAuthUpdatedScopesEvent): void
    {
        // console.log('OAuthUpdatedScopesEvent: ', event);
    }
}
