import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { IamCreatedRoleEvent } from './iam-created-role.event';

@EventsHandler(IamCreatedRoleEvent)
export class IamCreatedRoleEventHandler implements IEventHandler<IamCreatedRoleEvent>
{
    handle(event: IamCreatedRoleEvent): void
    {
        // console.log('IamCreatedRoleEvent: ', event);
    }
}
