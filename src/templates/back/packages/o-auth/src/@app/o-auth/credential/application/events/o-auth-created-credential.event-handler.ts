import { OAuthCreatedCredentialEvent } from '@app/o-auth/credential';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(OAuthCreatedCredentialEvent)
export class OAuthCreatedCredentialEventHandler implements IEventHandler<OAuthCreatedCredentialEvent>
{
    handle(event: OAuthCreatedCredentialEvent): void
    {
        // console.log('OAuthCreatedCredentialEvent: ', event);
    }
}
