import { IamDeletedPermissionRoleEvent } from '@app/iam/permission-role';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(IamDeletedPermissionRoleEvent)
export class IamDeletedPermissionRoleEventHandler
    implements IEventHandler<IamDeletedPermissionRoleEvent>
{
    handle(event: IamDeletedPermissionRoleEvent): void {
        // console.log('IamDeletedPermissionRoleEvent: ', event);
    }
}
