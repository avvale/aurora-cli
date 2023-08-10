import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { IamDeletedTenantEvent } from './iam-deleted-tenant.event';

@EventsHandler(IamDeletedTenantEvent)
export class IamDeletedTenantEventHandler implements IEventHandler<IamDeletedTenantEvent>
{
    handle(event: IamDeletedTenantEvent): void
    {
        // console.log('IamDeletedTenantEvent: ', event);
    }
}
