import { IamUpdatedPermissionsRolesEvent } from '@app/iam/permission-role';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(IamUpdatedPermissionsRolesEvent)
export class IamUpdatedPermissionsRolesEventHandler implements IEventHandler<IamUpdatedPermissionsRolesEvent>
{
    handle(event: IamUpdatedPermissionsRolesEvent): void
    {
        // console.log('IamUpdatedPermissionsRolesEvent: ', event);
    }
}
