/**
 * @aurora-generated
 * @source cliter/iam/permission-role.aurora.yaml
 */
import { IamCreatedPermissionRoleEvent } from '@app/iam/permission-role';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(IamCreatedPermissionRoleEvent)
export class IamCreatedPermissionRoleEventHandler
  implements IEventHandler<IamCreatedPermissionRoleEvent>
{
  handle(event: IamCreatedPermissionRoleEvent): void {
    // 'IamCreatedPermissionRoleEvent'
  }
}
