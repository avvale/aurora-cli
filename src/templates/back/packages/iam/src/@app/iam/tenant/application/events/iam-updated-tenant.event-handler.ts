import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { IamUpdatedTenantEvent } from './iam-updated-tenant.event';

@EventsHandler(IamUpdatedTenantEvent)
export class IamUpdatedTenantEventHandler implements IEventHandler<IamUpdatedTenantEvent>
{
    handle(event: IamUpdatedTenantEvent): void
    {
        // console.log('UpdatedTenantEvent: ', event);
    }
}
