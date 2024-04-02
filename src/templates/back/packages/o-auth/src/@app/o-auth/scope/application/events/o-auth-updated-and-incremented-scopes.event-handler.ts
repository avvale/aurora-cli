import { OAuthUpdatedAndIncrementedScopesEvent } from '@app/o-auth/scope';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(OAuthUpdatedAndIncrementedScopesEvent)
export class OAuthUpdatedAndIncrementedScopesEventHandler implements IEventHandler<OAuthUpdatedAndIncrementedScopesEvent>
{
    handle(event: OAuthUpdatedAndIncrementedScopesEvent): void
    {
        // console.log('OAuthUpdatedAndIncrementedScopesEvent: ', event);
    }
}
