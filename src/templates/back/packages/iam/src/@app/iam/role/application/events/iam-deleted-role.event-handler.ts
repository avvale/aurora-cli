import { IamDeletedRoleEvent } from '@app/iam/role';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(IamDeletedRoleEvent)
export class IamDeletedRoleEventHandler implements IEventHandler<IamDeletedRoleEvent>
{
    handle(event: IamDeletedRoleEvent): void
    {
        // console.log('IamDeletedRoleEvent: ', event);
    }
}
