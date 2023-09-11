import { IamUpdatedTenantsAccountsEvent } from '@app/iam/tenant-account';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(IamUpdatedTenantsAccountsEvent)
export class IamUpdatedTenantsAccountsEventHandler implements IEventHandler<IamUpdatedTenantsAccountsEvent>
{
    handle(event: IamUpdatedTenantsAccountsEvent): void
    {
        // console.log('IamUpdatedTenantsAccountsEvent: ', event);
    }
}
