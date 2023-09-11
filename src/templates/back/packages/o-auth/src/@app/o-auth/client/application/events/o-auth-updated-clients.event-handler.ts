import { OAuthUpdatedClientsEvent } from '@app/o-auth/client';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(OAuthUpdatedClientsEvent)
export class OAuthUpdatedClientsEventHandler implements IEventHandler<OAuthUpdatedClientsEvent>
{
    handle(event: OAuthUpdatedClientsEvent): void
    {
        // console.log('OAuthUpdatedClientsEvent: ', event);
    }
}
