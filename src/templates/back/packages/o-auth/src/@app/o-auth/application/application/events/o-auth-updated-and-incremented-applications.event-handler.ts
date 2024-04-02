import { OAuthUpdatedAndIncrementedApplicationsEvent } from '@app/o-auth/application';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(OAuthUpdatedAndIncrementedApplicationsEvent)
export class OAuthUpdatedAndIncrementedApplicationsEventHandler implements IEventHandler<OAuthUpdatedAndIncrementedApplicationsEvent>
{
    handle(event: OAuthUpdatedAndIncrementedApplicationsEvent): void
    {
        // console.log('OAuthUpdatedAndIncrementedApplicationsEvent: ', event);
    }
}
