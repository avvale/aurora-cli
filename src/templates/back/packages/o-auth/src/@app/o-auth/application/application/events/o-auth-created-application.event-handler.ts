import { OAuthCreatedApplicationEvent } from '@app/o-auth/application';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(OAuthCreatedApplicationEvent)
export class OAuthCreatedApplicationEventHandler
  implements IEventHandler<OAuthCreatedApplicationEvent>
{
  handle(event: OAuthCreatedApplicationEvent): void {
    // console.log('OAuthCreatedApplicationEvent: ', event);
  }
}
