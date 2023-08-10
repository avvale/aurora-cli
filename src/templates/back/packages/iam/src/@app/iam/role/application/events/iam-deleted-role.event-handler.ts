import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { IamDeletedRoleEvent } from './iam-deleted-role.event';

@EventsHandler(IamDeletedRoleEvent)
export class IamDeletedRoleEventHandler implements IEventHandler<IamDeletedRoleEvent>
{
    handle(event: IamDeletedRoleEvent): void
    {
        // console.log('IamDeletedRoleEvent: ', event);
    }
}
