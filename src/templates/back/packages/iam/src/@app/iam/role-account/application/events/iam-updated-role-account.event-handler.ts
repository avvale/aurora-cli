import { IamUpdatedRoleAccountEvent } from '@app/iam/role-account';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(IamUpdatedRoleAccountEvent)
export class IamUpdatedRoleAccountEventHandler implements IEventHandler<IamUpdatedRoleAccountEvent>
{
    handle(event: IamUpdatedRoleAccountEvent): void
    {
        // console.log('UpdatedRoleAccountEvent: ', event);
    }
}
