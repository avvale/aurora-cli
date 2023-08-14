import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { OAuthDeletedApplicationEvent } from './o-auth-deleted-application.event';

@EventsHandler(OAuthDeletedApplicationEvent)
export class OAuthDeletedApplicationEventHandler implements IEventHandler<OAuthDeletedApplicationEvent>
{
    handle(event: OAuthDeletedApplicationEvent): void
    {
        // console.log('OAuthDeletedApplicationEvent: ', event);
    }
}
