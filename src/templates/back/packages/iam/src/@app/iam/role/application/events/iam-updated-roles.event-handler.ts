import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { IamUpdatedRolesEvent } from './iam-updated-roles.event';

@EventsHandler(IamUpdatedRolesEvent)
export class IamUpdatedRolesEventHandler implements IEventHandler<IamUpdatedRolesEvent>
{
    handle(event: IamUpdatedRolesEvent): void
    {
        // console.log('IamUpdatedRolesEvent: ', event);
    }
}
