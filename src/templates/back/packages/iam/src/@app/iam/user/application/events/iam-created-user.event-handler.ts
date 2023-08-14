import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { IamCreatedUserEvent } from './iam-created-user.event';

@EventsHandler(IamCreatedUserEvent)
export class IamCreatedUserEventHandler implements IEventHandler<IamCreatedUserEvent>
{
    handle(event: IamCreatedUserEvent): void
    {
        // console.log('IamCreatedUserEvent: ', event);
    }
}
