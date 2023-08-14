import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { OAuthCreatedScopesEvent } from './o-auth-created-scopes.event';

@EventsHandler(OAuthCreatedScopesEvent)
export class OAuthCreatedScopesEventHandler implements IEventHandler<OAuthCreatedScopesEvent>
{
    handle(event: OAuthCreatedScopesEvent): void
    {
        // console.log('CreatedScopesEvent: ', event);
    }
}
