import { IamCreatedPermissionsRolesEvent } from '@app/iam/permission-role';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(IamCreatedPermissionsRolesEvent)
export class IamCreatedPermissionsRolesEventHandler implements IEventHandler<IamCreatedPermissionsRolesEvent>
{
    handle(event: IamCreatedPermissionsRolesEvent): void
    {
        // console.log('CreatedPermissionsRolesEvent: ', event);
    }
}
