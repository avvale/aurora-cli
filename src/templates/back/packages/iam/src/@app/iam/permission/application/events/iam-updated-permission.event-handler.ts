/**
 * @aurora-generated
 * @source cliter/iam/permission.aurora.yaml
 */
import { IamUpdatedPermissionEvent } from '@app/iam/permission';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(IamUpdatedPermissionEvent)
export class IamUpdatedPermissionEventHandler
  implements IEventHandler<IamUpdatedPermissionEvent>
{
  handle(event: IamUpdatedPermissionEvent): void {
    // 'UpdatedPermissionEvent'
  }
}
