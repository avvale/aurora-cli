import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { OAuthDeletedApplicationsEvent } from './o-auth-deleted-applications.event';

@EventsHandler(OAuthDeletedApplicationsEvent)
export class OAuthDeletedApplicationsEventHandler implements IEventHandler<OAuthDeletedApplicationsEvent>
{
    handle(event: OAuthDeletedApplicationsEvent): void
    {
        // console.log('DeletedApplicationsEvent: ', event);
    }
}
