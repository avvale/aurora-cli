import { IamUpdatedPermissionEvent } from '@app/iam/permission';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(IamUpdatedPermissionEvent)
export class IamUpdatedPermissionEventHandler implements IEventHandler<IamUpdatedPermissionEvent>
{
    handle(event: IamUpdatedPermissionEvent): void
    {
        // console.log('UpdatedPermissionEvent: ', event);
    }
}
