import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { IamCreatedPermissionsEvent } from './iam-created-permissions.event';

@EventsHandler(IamCreatedPermissionsEvent)
export class IamCreatedPermissionsEventHandler implements IEventHandler<IamCreatedPermissionsEvent>
{
    handle(event: IamCreatedPermissionsEvent): void
    {
        // console.log('CreatedPermissionsEvent: ', event);
    }
}
