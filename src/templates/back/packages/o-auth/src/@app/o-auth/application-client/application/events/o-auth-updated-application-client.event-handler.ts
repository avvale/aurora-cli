import { OAuthUpdatedApplicationClientEvent } from '@app/o-auth/application-client';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(OAuthUpdatedApplicationClientEvent)
export class OAuthUpdatedApplicationClientEventHandler
  implements IEventHandler<OAuthUpdatedApplicationClientEvent>
{
  handle(event: OAuthUpdatedApplicationClientEvent): void {
    // console.log('UpdatedApplicationClientEvent: ', event);
  }
}
