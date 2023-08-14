import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { IamCreatedPermissionEvent } from './iam-created-permission.event';

@EventsHandler(IamCreatedPermissionEvent)
export class IamCreatedPermissionEventHandler implements IEventHandler<IamCreatedPermissionEvent>
{
    handle(event: IamCreatedPermissionEvent): void
    {
        // console.log('IamCreatedPermissionEvent: ', event);
    }
}
