/**
 * @aurora-generated
 * @source cliter/iam/permission.aurora.yaml
 */
import { IamDeletedPermissionEvent } from '@app/iam/permission';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(IamDeletedPermissionEvent)
export class IamDeletedPermissionEventHandler
  implements IEventHandler<IamDeletedPermissionEvent>
{
  handle(event: IamDeletedPermissionEvent): void {
    // IamDeletedPermissionEvent'
  }
}
