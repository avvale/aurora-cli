import { OAuthUpdatedApplicationEvent } from '@app/o-auth/application';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(OAuthUpdatedApplicationEvent)
export class OAuthUpdatedApplicationEventHandler
  implements IEventHandler<OAuthUpdatedApplicationEvent>
{
  handle(event: OAuthUpdatedApplicationEvent): void {
    // console.log('UpdatedApplicationEvent: ', event);
  }
}
