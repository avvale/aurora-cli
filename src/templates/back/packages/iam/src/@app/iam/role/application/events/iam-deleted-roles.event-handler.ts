import { IamDeletedRolesEvent } from '@app/iam/role';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(IamDeletedRolesEvent)
export class IamDeletedRolesEventHandler
    implements IEventHandler<IamDeletedRolesEvent>
{
    handle(event: IamDeletedRolesEvent): void {
        // 'DeletedRolesEvent'
    }
}
