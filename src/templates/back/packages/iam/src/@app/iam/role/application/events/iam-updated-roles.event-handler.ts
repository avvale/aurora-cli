import { IamUpdatedRolesEvent } from '@app/iam/role';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(IamUpdatedRolesEvent)
export class IamUpdatedRolesEventHandler
    implements IEventHandler<IamUpdatedRolesEvent>
{
    handle(event: IamUpdatedRolesEvent): void {
        // console.log('IamUpdatedRolesEvent: ', event);
    }
}
