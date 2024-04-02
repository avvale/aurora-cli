import { IamUpdatedAndIncrementedTenantsAccountsEvent } from '@app/iam/tenant-account';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(IamUpdatedAndIncrementedTenantsAccountsEvent)
export class IamUpdatedAndIncrementedTenantsAccountsEventHandler implements IEventHandler<IamUpdatedAndIncrementedTenantsAccountsEvent>
{
    handle(event: IamUpdatedAndIncrementedTenantsAccountsEvent): void
    {
        // console.log('IamUpdatedAndIncrementedTenantsAccountsEvent: ', event);
    }
}
