import { IamCreatedPermissionEvent } from '@app/iam/permission';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(IamCreatedPermissionEvent)
export class IamCreatedPermissionEventHandler implements IEventHandler<IamCreatedPermissionEvent>
{
    handle(event: IamCreatedPermissionEvent): void
    {
        // console.log('IamCreatedPermissionEvent: ', event);
    }
}
