/**
 * @aurora-generated
 * @source cliter/iam/permission.aurora.yaml
 */
import { IamCreatedPermissionEvent } from '@app/iam/permission';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(IamCreatedPermissionEvent)
export class IamCreatedPermissionEventHandler
  implements IEventHandler<IamCreatedPermissionEvent>
{
  handle(event: IamCreatedPermissionEvent): void {
    // 'IamCreatedPermissionEvent'
  }
}
