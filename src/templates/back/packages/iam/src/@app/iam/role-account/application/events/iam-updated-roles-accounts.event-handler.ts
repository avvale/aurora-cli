import { IamUpdatedRolesAccountsEvent } from '@app/iam/role-account';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(IamUpdatedRolesAccountsEvent)
export class IamUpdatedRolesAccountsEventHandler
  implements IEventHandler<IamUpdatedRolesAccountsEvent>
{
  handle(event: IamUpdatedRolesAccountsEvent): void {
    // 'IamUpdatedRolesAccountsEvent'
  }
}
