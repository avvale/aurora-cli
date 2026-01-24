/**
 * @aurora-generated
 * @source cliter/iam/permission.aurora.yaml
 */
import { IamDeletedPermissionsEvent } from '@app/iam/permission';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(IamDeletedPermissionsEvent)
export class IamDeletedPermissionsEventHandler
  implements IEventHandler<IamDeletedPermissionsEvent>
{
  handle(event: IamDeletedPermissionsEvent): void {
    // 'DeletedPermissionsEvent'
  }
}
