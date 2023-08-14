import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { OAuthCreatedApplicationsEvent } from './o-auth-created-applications.event';

@EventsHandler(OAuthCreatedApplicationsEvent)
export class OAuthCreatedApplicationsEventHandler implements IEventHandler<OAuthCreatedApplicationsEvent>
{
    handle(event: OAuthCreatedApplicationsEvent): void
    {
        // console.log('CreatedApplicationsEvent: ', event);
    }
}
