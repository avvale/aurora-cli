import { IamCreatedPermissionsEvent } from '@app/iam/permission';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(IamCreatedPermissionsEvent)
export class IamCreatedPermissionsEventHandler
    implements IEventHandler<IamCreatedPermissionsEvent>
{
    handle(event: IamCreatedPermissionsEvent): void {
        // console.log('CreatedPermissionsEvent: ', event);
    }
}
