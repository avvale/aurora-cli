import { IamCreatedRolesEvent } from '@app/iam/role';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(IamCreatedRolesEvent)
export class IamCreatedRolesEventHandler
  implements IEventHandler<IamCreatedRolesEvent>
{
  handle(event: IamCreatedRolesEvent): void {
    // 'CreatedRolesEvent';
  }
}
