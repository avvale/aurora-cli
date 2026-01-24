import { IamDeletedRoleAccountEvent } from '@app/iam/role-account';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(IamDeletedRoleAccountEvent)
export class IamDeletedRoleAccountEventHandler
  implements IEventHandler<IamDeletedRoleAccountEvent>
{
  handle(event: IamDeletedRoleAccountEvent): void {
    // IamDeletedRoleAccountEvent'
  }
}
