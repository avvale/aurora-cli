import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { IamUpdatedUsersEvent } from './iam-updated-users.event';

@EventsHandler(IamUpdatedUsersEvent)
export class IamUpdatedUsersEventHandler implements IEventHandler<IamUpdatedUsersEvent>
{
    handle(event: IamUpdatedUsersEvent): void
    {
        // console.log('IamUpdatedUsersEvent: ', event);
    }
}
