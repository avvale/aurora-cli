import { OAuthCreatedApplicationClientEvent } from '@app/o-auth/application-client';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(OAuthCreatedApplicationClientEvent)
export class OAuthCreatedApplicationClientEventHandler
    implements IEventHandler<OAuthCreatedApplicationClientEvent>
{
    handle(event: OAuthCreatedApplicationClientEvent): void {
        // console.log('OAuthCreatedApplicationClientEvent: ', event);
    }
}
