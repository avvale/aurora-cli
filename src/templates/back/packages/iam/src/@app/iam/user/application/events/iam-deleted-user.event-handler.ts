import { IamDeletedUserEvent } from '@app/iam/user';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(IamDeletedUserEvent)
export class IamDeletedUserEventHandler implements IEventHandler<IamDeletedUserEvent>
{
    handle(event: IamDeletedUserEvent): void
    {
        // console.log('IamDeletedUserEvent: ', event);
    }
}
