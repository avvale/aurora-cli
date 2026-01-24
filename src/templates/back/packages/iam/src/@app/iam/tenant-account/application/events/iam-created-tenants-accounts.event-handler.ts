import { IamCreatedTenantsAccountsEvent } from '@app/iam/tenant-account';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(IamCreatedTenantsAccountsEvent)
export class IamCreatedTenantsAccountsEventHandler
  implements IEventHandler<IamCreatedTenantsAccountsEvent>
{
  handle(event: IamCreatedTenantsAccountsEvent): void {
    // 'CreatedTenantsAccountsEvent';
  }
}
