import { IamUpdatedUsersEvent } from '@app/iam/user';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(IamUpdatedUsersEvent)
export class IamUpdatedUsersEventHandler
    implements IEventHandler<IamUpdatedUsersEvent>
{
    handle(event: IamUpdatedUsersEvent): void {
        // console.log('IamUpdatedUsersEvent: ', event);
    }
}
