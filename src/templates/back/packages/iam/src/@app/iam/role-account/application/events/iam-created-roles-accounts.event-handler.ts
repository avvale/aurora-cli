import { IamCreatedRolesAccountsEvent } from '@app/iam/role-account';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(IamCreatedRolesAccountsEvent)
export class IamCreatedRolesAccountsEventHandler
    implements IEventHandler<IamCreatedRolesAccountsEvent>
{
    handle(event: IamCreatedRolesAccountsEvent): void {
        // console.log('CreatedRolesAccountsEvent: ', event);
    }
}
