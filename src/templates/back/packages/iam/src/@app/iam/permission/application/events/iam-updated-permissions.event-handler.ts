import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { IamUpdatedPermissionsEvent } from './iam-updated-permissions.event';

@EventsHandler(IamUpdatedPermissionsEvent)
export class IamUpdatedPermissionsEventHandler implements IEventHandler<IamUpdatedPermissionsEvent>
{
    handle(event: IamUpdatedPermissionsEvent): void
    {
        // console.log('IamUpdatedPermissionsEvent: ', event);
    }
}
