import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { OAuthCreatedClientEvent } from './o-auth-created-client.event';

@EventsHandler(OAuthCreatedClientEvent)
export class OAuthCreatedClientEventHandler implements IEventHandler<OAuthCreatedClientEvent>
{
    handle(event: OAuthCreatedClientEvent): void
    {
        // console.log('OAuthCreatedClientEvent: ', event);
    }
}
