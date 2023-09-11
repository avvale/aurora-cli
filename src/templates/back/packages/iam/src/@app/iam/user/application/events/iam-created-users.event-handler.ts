import { IamCreatedUsersEvent } from '@app/iam/user';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(IamCreatedUsersEvent)
export class IamCreatedUsersEventHandler implements IEventHandler<IamCreatedUsersEvent>
{
    handle(event: IamCreatedUsersEvent): void
    {
        // console.log('CreatedUsersEvent: ', event);
    }
}
