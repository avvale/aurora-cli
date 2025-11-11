import { IamUpdatedUserEvent } from '@app/iam/user';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(IamUpdatedUserEvent)
export class IamUpdatedUserEventHandler
    implements IEventHandler<IamUpdatedUserEvent>
{
    handle(event: IamUpdatedUserEvent): void {
        // console.log('UpdatedUserEvent: ', event);
    }
}
