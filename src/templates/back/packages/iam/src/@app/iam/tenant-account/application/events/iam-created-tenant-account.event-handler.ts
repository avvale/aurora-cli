import { IamCreatedTenantAccountEvent } from '@app/iam/tenant-account';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(IamCreatedTenantAccountEvent)
export class IamCreatedTenantAccountEventHandler implements IEventHandler<IamCreatedTenantAccountEvent>
{
    handle(event: IamCreatedTenantAccountEvent): void
    {
        // console.log('IamCreatedTenantAccountEvent: ', event);
    }
}
