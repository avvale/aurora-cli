import { OAuthDeletedApplicationEvent } from '@app/o-auth/application';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(OAuthDeletedApplicationEvent)
export class OAuthDeletedApplicationEventHandler implements IEventHandler<OAuthDeletedApplicationEvent>
{
    handle(event: OAuthDeletedApplicationEvent): void
    {
        // console.log('OAuthDeletedApplicationEvent: ', event);
    }
}
