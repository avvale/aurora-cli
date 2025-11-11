import { IamDeletedRolesAccountsEvent } from '@app/iam/role-account';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(IamDeletedRolesAccountsEvent)
export class IamDeletedRolesAccountsEventHandler
    implements IEventHandler<IamDeletedRolesAccountsEvent>
{
    handle(event: IamDeletedRolesAccountsEvent): void {
        // console.log('DeletedRolesAccountsEvent: ', event);
    }
}
