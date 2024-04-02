import { OAuthUpdatedAndIncrementedRefreshTokensEvent } from '@app/o-auth/refresh-token';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(OAuthUpdatedAndIncrementedRefreshTokensEvent)
export class OAuthUpdatedAndIncrementedRefreshTokensEventHandler implements IEventHandler<OAuthUpdatedAndIncrementedRefreshTokensEvent>
{
    handle(event: OAuthUpdatedAndIncrementedRefreshTokensEvent): void
    {
        // console.log('OAuthUpdatedAndIncrementedRefreshTokensEvent: ', event);
    }
}
