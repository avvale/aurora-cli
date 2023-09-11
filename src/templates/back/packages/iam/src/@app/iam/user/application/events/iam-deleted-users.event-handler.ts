import { IamDeletedUsersEvent } from '@app/iam/user';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(IamDeletedUsersEvent)
export class IamDeletedUsersEventHandler implements IEventHandler<IamDeletedUsersEvent>
{
    handle(event: IamDeletedUsersEvent): void
    {
        // console.log('DeletedUsersEvent: ', event);
    }
}
