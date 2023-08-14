import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { IamCreatedTenantEvent } from './iam-created-tenant.event';

@EventsHandler(IamCreatedTenantEvent)
export class IamCreatedTenantEventHandler implements IEventHandler<IamCreatedTenantEvent>
{
    handle(event: IamCreatedTenantEvent): void
    {
        // console.log('IamCreatedTenantEvent: ', event);
    }
}
