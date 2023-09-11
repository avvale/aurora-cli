import { OAuthUpdatedClientEvent } from '@app/o-auth/client';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(OAuthUpdatedClientEvent)
export class OAuthUpdatedClientEventHandler implements IEventHandler<OAuthUpdatedClientEvent>
{
    handle(event: OAuthUpdatedClientEvent): void
    {
        // console.log('UpdatedClientEvent: ', event);
    }
}
