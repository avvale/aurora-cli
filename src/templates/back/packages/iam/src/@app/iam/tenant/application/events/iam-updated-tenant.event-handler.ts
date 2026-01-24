import { IamUpdatedTenantEvent } from '@app/iam/tenant';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(IamUpdatedTenantEvent)
export class IamUpdatedTenantEventHandler
  implements IEventHandler<IamUpdatedTenantEvent>
{
  handle(event: IamUpdatedTenantEvent): void {
    // console.log('UpdatedTenantEvent: ', event);
  }
}
