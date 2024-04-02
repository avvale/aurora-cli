import { OAuthUpdatedAndIncrementedClientsEvent } from '@app/o-auth/client';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(OAuthUpdatedAndIncrementedClientsEvent)
export class OAuthUpdatedAndIncrementedClientsEventHandler implements IEventHandler<OAuthUpdatedAndIncrementedClientsEvent>
{
    handle(event: OAuthUpdatedAndIncrementedClientsEvent): void
    {
        // console.log('OAuthUpdatedAndIncrementedClientsEvent: ', event);
    }
}
