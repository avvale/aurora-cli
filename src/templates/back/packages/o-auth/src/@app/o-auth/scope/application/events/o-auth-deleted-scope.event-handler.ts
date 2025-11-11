import { OAuthDeletedScopeEvent } from '@app/o-auth/scope';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(OAuthDeletedScopeEvent)
export class OAuthDeletedScopeEventHandler
    implements IEventHandler<OAuthDeletedScopeEvent>
{
    handle(event: OAuthDeletedScopeEvent): void {
        // console.log('OAuthDeletedScopeEvent: ', event);
    }
}
