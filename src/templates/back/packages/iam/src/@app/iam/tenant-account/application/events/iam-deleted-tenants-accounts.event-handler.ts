import { IamDeletedTenantsAccountsEvent } from '@app/iam/tenant-account';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(IamDeletedTenantsAccountsEvent)
export class IamDeletedTenantsAccountsEventHandler implements IEventHandler<IamDeletedTenantsAccountsEvent>
{
    handle(event: IamDeletedTenantsAccountsEvent): void
    {
        // console.log('DeletedTenantsAccountsEvent: ', event);
    }
}
