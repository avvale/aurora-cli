import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { IamCreatedUsersEvent } from './iam-created-users.event';

@EventsHandler(IamCreatedUsersEvent)
export class IamCreatedUsersEventHandler implements IEventHandler<IamCreatedUsersEvent>
{
    handle(event: IamCreatedUsersEvent): void
    {
        // console.log('CreatedUsersEvent: ', event);
    }
}
