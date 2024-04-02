import { IamUpdatedAndIncrementedPermissionsEvent } from '@app/iam/permission';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(IamUpdatedAndIncrementedPermissionsEvent)
export class IamUpdatedAndIncrementedPermissionsEventHandler implements IEventHandler<IamUpdatedAndIncrementedPermissionsEvent>
{
    handle(event: IamUpdatedAndIncrementedPermissionsEvent): void
    {
        // console.log('IamUpdatedAndIncrementedPermissionsEvent: ', event);
    }
}
