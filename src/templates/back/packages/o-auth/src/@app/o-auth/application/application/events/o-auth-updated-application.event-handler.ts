import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { OAuthUpdatedApplicationEvent } from './o-auth-updated-application.event';

@EventsHandler(OAuthUpdatedApplicationEvent)
export class OAuthUpdatedApplicationEventHandler implements IEventHandler<OAuthUpdatedApplicationEvent>
{
    handle(event: OAuthUpdatedApplicationEvent): void
    {
        // console.log('UpdatedApplicationEvent: ', event);
    }
}
