import { OAuthCreatedApplicationsClientsEvent } from '@app/o-auth/application-client';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(OAuthCreatedApplicationsClientsEvent)
export class OAuthCreatedApplicationsClientsEventHandler implements IEventHandler<OAuthCreatedApplicationsClientsEvent>
{
    handle(event: OAuthCreatedApplicationsClientsEvent): void
    {
        // console.log('CreatedApplicationsClientsEvent: ', event);
    }
}
