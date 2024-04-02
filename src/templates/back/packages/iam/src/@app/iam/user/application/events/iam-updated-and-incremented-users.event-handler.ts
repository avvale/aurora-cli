import { IamUpdatedAndIncrementedUsersEvent } from '@app/iam/user';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(IamUpdatedAndIncrementedUsersEvent)
export class IamUpdatedAndIncrementedUsersEventHandler implements IEventHandler<IamUpdatedAndIncrementedUsersEvent>
{
    handle(event: IamUpdatedAndIncrementedUsersEvent): void
    {
        // console.log('IamUpdatedAndIncrementedUsersEvent: ', event);
    }
}
