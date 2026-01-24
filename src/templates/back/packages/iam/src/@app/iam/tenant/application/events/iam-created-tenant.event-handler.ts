import { IamCreatedTenantEvent } from '@app/iam/tenant';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(IamCreatedTenantEvent)
export class IamCreatedTenantEventHandler
  implements IEventHandler<IamCreatedTenantEvent>
{
  handle(event: IamCreatedTenantEvent): void {
    // console.log('IamCreatedTenantEvent: ', event);
  }
}
