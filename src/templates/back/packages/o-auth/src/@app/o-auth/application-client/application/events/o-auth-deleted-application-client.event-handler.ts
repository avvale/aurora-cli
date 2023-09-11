import { OAuthDeletedApplicationClientEvent } from '@app/o-auth/application-client';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(OAuthDeletedApplicationClientEvent)
export class OAuthDeletedApplicationClientEventHandler implements IEventHandler<OAuthDeletedApplicationClientEvent>
{
    handle(event: OAuthDeletedApplicationClientEvent): void
    {
        // console.log('OAuthDeletedApplicationClientEvent: ', event);
    }
}
