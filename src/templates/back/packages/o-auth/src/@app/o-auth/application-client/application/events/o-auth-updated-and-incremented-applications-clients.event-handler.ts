import { OAuthUpdatedAndIncrementedApplicationsClientsEvent } from '@app/o-auth/application-client';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(OAuthUpdatedAndIncrementedApplicationsClientsEvent)
export class OAuthUpdatedAndIncrementedApplicationsClientsEventHandler implements IEventHandler<OAuthUpdatedAndIncrementedApplicationsClientsEvent>
{
    handle(event: OAuthUpdatedAndIncrementedApplicationsClientsEvent): void
    {
        // console.log('OAuthUpdatedAndIncrementedApplicationsClientsEvent: ', event);
    }
}
