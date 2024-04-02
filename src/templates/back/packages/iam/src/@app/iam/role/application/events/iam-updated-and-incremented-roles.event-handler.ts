import { IamUpdatedAndIncrementedRolesEvent } from '@app/iam/role';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(IamUpdatedAndIncrementedRolesEvent)
export class IamUpdatedAndIncrementedRolesEventHandler implements IEventHandler<IamUpdatedAndIncrementedRolesEvent>
{
    handle(event: IamUpdatedAndIncrementedRolesEvent): void
    {
        // console.log('IamUpdatedAndIncrementedRolesEvent: ', event);
    }
}
