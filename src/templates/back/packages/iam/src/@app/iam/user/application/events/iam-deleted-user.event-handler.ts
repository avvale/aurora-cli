import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { IamDeletedUserEvent } from './iam-deleted-user.event';

@EventsHandler(IamDeletedUserEvent)
export class IamDeletedUserEventHandler implements IEventHandler<IamDeletedUserEvent>
{
    handle(event: IamDeletedUserEvent): void
    {
        // console.log('IamDeletedUserEvent: ', event);
    }
}
