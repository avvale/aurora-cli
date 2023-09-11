import { IamUpdatedPermissionRoleEvent } from '@app/iam/permission-role';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(IamUpdatedPermissionRoleEvent)
export class IamUpdatedPermissionRoleEventHandler implements IEventHandler<IamUpdatedPermissionRoleEvent>
{
    handle(event: IamUpdatedPermissionRoleEvent): void
    {
        // console.log('UpdatedPermissionRoleEvent: ', event);
    }
}
