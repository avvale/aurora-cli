import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { OAuthUpdatedClientEvent } from './o-auth-updated-client.event';

@EventsHandler(OAuthUpdatedClientEvent)
export class OAuthUpdatedClientEventHandler implements IEventHandler<OAuthUpdatedClientEvent>
{
    handle(event: OAuthUpdatedClientEvent): void
    {
        // console.log('UpdatedClientEvent: ', event);
    }
}
