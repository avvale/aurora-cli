import { IamDeletedTenantAccountEvent } from '@app/iam/tenant-account';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(IamDeletedTenantAccountEvent)
export class IamDeletedTenantAccountEventHandler
  implements IEventHandler<IamDeletedTenantAccountEvent>
{
  handle(event: IamDeletedTenantAccountEvent): void {
    // IamDeletedTenantAccountEvent'
  }
}
