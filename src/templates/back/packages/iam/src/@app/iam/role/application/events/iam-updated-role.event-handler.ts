import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { IamUpdatedRoleEvent } from './iam-updated-role.event';

@EventsHandler(IamUpdatedRoleEvent)
export class IamUpdatedRoleEventHandler implements IEventHandler<IamUpdatedRoleEvent>
{
    handle(event: IamUpdatedRoleEvent): void
    {
        // console.log('UpdatedRoleEvent: ', event);
    }
}
