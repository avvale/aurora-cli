import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CreatedTenantEvent } from './created-tenant.event';

@EventsHandler(CreatedTenantEvent)
export class CreatedTenantEventHandler implements IEventHandler<CreatedTenantEvent>
{
    handle(event: CreatedTenantEvent)
    {
        // console.log('CreatedTenantEvent: ', event);
    }
}