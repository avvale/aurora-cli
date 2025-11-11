import { IamDeletedPermissionEvent } from '@app/iam/permission';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(IamDeletedPermissionEvent)
export class IamDeletedPermissionEventHandler
    implements IEventHandler<IamDeletedPermissionEvent>
{
    handle(event: IamDeletedPermissionEvent): void {
        // console.log('IamDeletedPermissionEvent: ', event);
    }
}
