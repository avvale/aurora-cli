import { OAuthDeletedClientEvent } from '@app/o-auth/client';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(OAuthDeletedClientEvent)
export class OAuthDeletedClientEventHandler implements IEventHandler<OAuthDeletedClientEvent>
{
    handle(event: OAuthDeletedClientEvent): void
    {
        // console.log('OAuthDeletedClientEvent: ', event);
    }
}
