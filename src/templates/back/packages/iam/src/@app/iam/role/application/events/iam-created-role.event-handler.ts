import { IamCreatedRoleEvent } from '@app/iam/role';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(IamCreatedRoleEvent)
export class IamCreatedRoleEventHandler implements IEventHandler<IamCreatedRoleEvent>
{
    handle(event: IamCreatedRoleEvent): void
    {
        // console.log('IamCreatedRoleEvent: ', event);
    }
}
