import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { IamDeletedPermissionEvent } from './iam-deleted-permission.event';

@EventsHandler(IamDeletedPermissionEvent)
export class IamDeletedPermissionEventHandler implements IEventHandler<IamDeletedPermissionEvent>
{
    handle(event: IamDeletedPermissionEvent): void
    {
        // console.log('IamDeletedPermissionEvent: ', event);
    }
}
