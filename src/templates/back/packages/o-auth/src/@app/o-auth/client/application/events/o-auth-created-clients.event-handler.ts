import { OAuthCreatedClientsEvent } from '@app/o-auth/client';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(OAuthCreatedClientsEvent)
export class OAuthCreatedClientsEventHandler
  implements IEventHandler<OAuthCreatedClientsEvent>
{
  handle(event: OAuthCreatedClientsEvent): void {
    // console.log('CreatedClientsEvent: ', event);
  }
}
