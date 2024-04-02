import { OAuthUpdatedAndIncrementedAccessTokensEvent } from '@app/o-auth/access-token';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(OAuthUpdatedAndIncrementedAccessTokensEvent)
export class OAuthUpdatedAndIncrementedAccessTokensEventHandler implements IEventHandler<OAuthUpdatedAndIncrementedAccessTokensEvent>
{
    handle(event: OAuthUpdatedAndIncrementedAccessTokensEvent): void
    {
        // console.log('OAuthUpdatedAndIncrementedAccessTokensEvent: ', event);
    }
}
