/**
 * @aurora-generated
 * @source cliter/iam/permission-role.aurora.yaml
 */
import { IamDeletedPermissionRoleEvent } from '@app/iam/permission-role';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(IamDeletedPermissionRoleEvent)
export class IamDeletedPermissionRoleEventHandler
  implements IEventHandler<IamDeletedPermissionRoleEvent>
{
  handle(event: IamDeletedPermissionRoleEvent): void {
    // IamDeletedPermissionRoleEvent'
  }
}
