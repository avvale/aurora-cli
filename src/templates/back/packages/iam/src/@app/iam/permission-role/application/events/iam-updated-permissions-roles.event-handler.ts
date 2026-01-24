/**
 * @aurora-generated
 * @source cliter/iam/permission-role.aurora.yaml
 */
import { IamUpdatedPermissionsRolesEvent } from '@app/iam/permission-role';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(IamUpdatedPermissionsRolesEvent)
export class IamUpdatedPermissionsRolesEventHandler
  implements IEventHandler<IamUpdatedPermissionsRolesEvent>
{
  handle(event: IamUpdatedPermissionsRolesEvent): void {
    // 'IamUpdatedPermissionsRolesEvent'
  }
}
