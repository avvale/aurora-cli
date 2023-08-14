import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { IamDeletedRolesEvent } from './iam-deleted-roles.event';

@EventsHandler(IamDeletedRolesEvent)
export class IamDeletedRolesEventHandler implements IEventHandler<IamDeletedRolesEvent>
{
    handle(event: IamDeletedRolesEvent): void
    {
        // console.log('DeletedRolesEvent: ', event);
    }
}
