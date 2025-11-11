import { OAuthCreatedScopesEvent } from '@app/o-auth/scope';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(OAuthCreatedScopesEvent)
export class OAuthCreatedScopesEventHandler
    implements IEventHandler<OAuthCreatedScopesEvent>
{
    handle(event: OAuthCreatedScopesEvent): void {
        // console.log('CreatedScopesEvent: ', event);
    }
}
