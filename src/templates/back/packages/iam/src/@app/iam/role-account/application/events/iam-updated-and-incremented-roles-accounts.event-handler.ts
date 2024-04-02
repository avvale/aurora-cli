import { IamUpdatedAndIncrementedRolesAccountsEvent } from '@app/iam/role-account';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(IamUpdatedAndIncrementedRolesAccountsEvent)
export class IamUpdatedAndIncrementedRolesAccountsEventHandler implements IEventHandler<IamUpdatedAndIncrementedRolesAccountsEvent>
{
    handle(event: IamUpdatedAndIncrementedRolesAccountsEvent): void
    {
        // console.log('IamUpdatedAndIncrementedRolesAccountsEvent: ', event);
    }
}
