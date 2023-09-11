import { OAuthUpdatedApplicationsEvent } from '@app/o-auth/application';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(OAuthUpdatedApplicationsEvent)
export class OAuthUpdatedApplicationsEventHandler implements IEventHandler<OAuthUpdatedApplicationsEvent>
{
    handle(event: OAuthUpdatedApplicationsEvent): void
    {
        // console.log('OAuthUpdatedApplicationsEvent: ', event);
    }
}
