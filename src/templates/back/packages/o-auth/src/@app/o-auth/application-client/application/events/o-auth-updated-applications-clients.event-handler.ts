import { OAuthUpdatedApplicationsClientsEvent } from '@app/o-auth/application-client';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(OAuthUpdatedApplicationsClientsEvent)
export class OAuthUpdatedApplicationsClientsEventHandler implements IEventHandler<OAuthUpdatedApplicationsClientsEvent>
{
    handle(event: OAuthUpdatedApplicationsClientsEvent): void
    {
        // console.log('OAuthUpdatedApplicationsClientsEvent: ', event);
    }
}
