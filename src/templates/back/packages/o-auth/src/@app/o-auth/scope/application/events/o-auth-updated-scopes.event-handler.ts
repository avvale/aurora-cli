import { OAuthUpdatedScopesEvent } from '@app/o-auth/scope';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(OAuthUpdatedScopesEvent)
export class OAuthUpdatedScopesEventHandler implements IEventHandler<OAuthUpdatedScopesEvent>
{
    handle(event: OAuthUpdatedScopesEvent): void
    {
        // console.log('OAuthUpdatedScopesEvent: ', event);
    }
}
