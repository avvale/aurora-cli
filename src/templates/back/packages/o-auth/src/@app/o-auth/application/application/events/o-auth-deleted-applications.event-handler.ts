import { OAuthDeletedApplicationsEvent } from '@app/o-auth/application';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(OAuthDeletedApplicationsEvent)
export class OAuthDeletedApplicationsEventHandler
  implements IEventHandler<OAuthDeletedApplicationsEvent>
{
  handle(event: OAuthDeletedApplicationsEvent): void {
    // console.log('DeletedApplicationsEvent: ', event);
  }
}
