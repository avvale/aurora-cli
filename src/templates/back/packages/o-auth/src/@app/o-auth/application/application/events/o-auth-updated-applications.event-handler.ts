import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { OAuthUpdatedApplicationsEvent } from './o-auth-updated-applications.event';

@EventsHandler(OAuthUpdatedApplicationsEvent)
export class OAuthUpdatedApplicationsEventHandler implements IEventHandler<OAuthUpdatedApplicationsEvent>
{
    handle(event: OAuthUpdatedApplicationsEvent): void
    {
        // console.log('OAuthUpdatedApplicationsEvent: ', event);
    }
}
