import { IamDeletedTenantEvent } from '@app/iam/tenant';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(IamDeletedTenantEvent)
export class IamDeletedTenantEventHandler implements IEventHandler<IamDeletedTenantEvent>
{
    handle(event: IamDeletedTenantEvent): void
    {
        // console.log('IamDeletedTenantEvent: ', event);
    }
}
