import { IamUpdatedPermissionsEvent } from '@app/iam/permission';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(IamUpdatedPermissionsEvent)
export class IamUpdatedPermissionsEventHandler implements IEventHandler<IamUpdatedPermissionsEvent>
{
    handle(event: IamUpdatedPermissionsEvent): void
    {
        // console.log('IamUpdatedPermissionsEvent: ', event);
    }
}
