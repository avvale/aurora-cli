import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { OAuthDeletedScopesEvent } from './o-auth-deleted-scopes.event';

@EventsHandler(OAuthDeletedScopesEvent)
export class OAuthDeletedScopesEventHandler implements IEventHandler<OAuthDeletedScopesEvent>
{
    handle(event: OAuthDeletedScopesEvent): void
    {
        // console.log('DeletedScopesEvent: ', event);
    }
}
