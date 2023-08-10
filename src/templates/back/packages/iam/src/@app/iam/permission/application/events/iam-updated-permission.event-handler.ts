import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { IamUpdatedPermissionEvent } from './iam-updated-permission.event';

@EventsHandler(IamUpdatedPermissionEvent)
export class IamUpdatedPermissionEventHandler implements IEventHandler<IamUpdatedPermissionEvent>
{
    handle(event: IamUpdatedPermissionEvent): void
    {
        // console.log('UpdatedPermissionEvent: ', event);
    }
}
