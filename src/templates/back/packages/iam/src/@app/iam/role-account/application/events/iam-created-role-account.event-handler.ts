import { IamCreatedRoleAccountEvent } from '@app/iam/role-account';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(IamCreatedRoleAccountEvent)
export class IamCreatedRoleAccountEventHandler implements IEventHandler<IamCreatedRoleAccountEvent>
{
    handle(event: IamCreatedRoleAccountEvent): void
    {
        // console.log('IamCreatedRoleAccountEvent: ', event);
    }
}
