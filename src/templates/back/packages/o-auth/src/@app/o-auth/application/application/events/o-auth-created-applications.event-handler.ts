import { OAuthCreatedApplicationsEvent } from '@app/o-auth/application';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(OAuthCreatedApplicationsEvent)
export class OAuthCreatedApplicationsEventHandler
  implements IEventHandler<OAuthCreatedApplicationsEvent>
{
  handle(event: OAuthCreatedApplicationsEvent): void {
    // console.log('CreatedApplicationsEvent: ', event);
  }
}
