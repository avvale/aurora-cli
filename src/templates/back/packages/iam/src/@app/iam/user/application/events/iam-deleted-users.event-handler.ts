import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { IamDeletedUsersEvent } from './iam-deleted-users.event';

@EventsHandler(IamDeletedUsersEvent)
export class IamDeletedUsersEventHandler implements IEventHandler<IamDeletedUsersEvent>
{
    handle(event: IamDeletedUsersEvent): void
    {
        // console.log('DeletedUsersEvent: ', event);
    }
}
