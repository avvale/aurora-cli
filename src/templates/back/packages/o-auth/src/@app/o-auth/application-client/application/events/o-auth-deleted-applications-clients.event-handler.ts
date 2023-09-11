import { OAuthDeletedApplicationsClientsEvent } from '@app/o-auth/application-client';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(OAuthDeletedApplicationsClientsEvent)
export class OAuthDeletedApplicationsClientsEventHandler implements IEventHandler<OAuthDeletedApplicationsClientsEvent>
{
    handle(event: OAuthDeletedApplicationsClientsEvent): void
    {
        // console.log('DeletedApplicationsClientsEvent: ', event);
    }
}
