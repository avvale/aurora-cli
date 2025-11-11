import { IamDeletedPermissionsRolesEvent } from '@app/iam/permission-role';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(IamDeletedPermissionsRolesEvent)
export class IamDeletedPermissionsRolesEventHandler
    implements IEventHandler<IamDeletedPermissionsRolesEvent>
{
    handle(event: IamDeletedPermissionsRolesEvent): void {
        // console.log('DeletedPermissionsRolesEvent: ', event);
    }
}
