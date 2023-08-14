import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { IamUpdatedUserEvent } from './iam-updated-user.event';

@EventsHandler(IamUpdatedUserEvent)
export class IamUpdatedUserEventHandler implements IEventHandler<IamUpdatedUserEvent>
{
    handle(event: IamUpdatedUserEvent): void
    {
        // console.log('UpdatedUserEvent: ', event);
    }
}
