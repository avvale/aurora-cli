import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { OAuthCreatedApplicationEvent } from './o-auth-created-application.event';

@EventsHandler(OAuthCreatedApplicationEvent)
export class OAuthCreatedApplicationEventHandler implements IEventHandler<OAuthCreatedApplicationEvent>
{
    handle(event: OAuthCreatedApplicationEvent): void
    {
        // console.log('OAuthCreatedApplicationEvent: ', event);
    }
}
