import { OAuthCreatedClientEvent } from '@app/o-auth/client';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(OAuthCreatedClientEvent)
export class OAuthCreatedClientEventHandler implements IEventHandler<OAuthCreatedClientEvent>
{
    handle(event: OAuthCreatedClientEvent): void
    {
        // console.log('OAuthCreatedClientEvent: ', event);
    }
}
