import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { IamDeletedPermissionsEvent } from './iam-deleted-permissions.event';

@EventsHandler(IamDeletedPermissionsEvent)
export class IamDeletedPermissionsEventHandler implements IEventHandler<IamDeletedPermissionsEvent>
{
    handle(event: IamDeletedPermissionsEvent): void
    {
        // console.log('DeletedPermissionsEvent: ', event);
    }
}
