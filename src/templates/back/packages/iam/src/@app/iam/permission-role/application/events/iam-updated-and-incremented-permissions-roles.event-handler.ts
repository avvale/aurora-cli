import { IamUpdatedAndIncrementedPermissionsRolesEvent } from '@app/iam/permission-role';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(IamUpdatedAndIncrementedPermissionsRolesEvent)
export class IamUpdatedAndIncrementedPermissionsRolesEventHandler implements IEventHandler<IamUpdatedAndIncrementedPermissionsRolesEvent>
{
    handle(event: IamUpdatedAndIncrementedPermissionsRolesEvent): void
    {
        // console.log('IamUpdatedAndIncrementedPermissionsRolesEvent: ', event);
    }
}
