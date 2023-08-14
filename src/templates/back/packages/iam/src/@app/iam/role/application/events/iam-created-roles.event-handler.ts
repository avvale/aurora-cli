import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { IamCreatedRolesEvent } from './iam-created-roles.event';

@EventsHandler(IamCreatedRolesEvent)
export class IamCreatedRolesEventHandler implements IEventHandler<IamCreatedRolesEvent>
{
    handle(event: IamCreatedRolesEvent): void
    {
        // console.log('CreatedRolesEvent: ', event);
    }
}
