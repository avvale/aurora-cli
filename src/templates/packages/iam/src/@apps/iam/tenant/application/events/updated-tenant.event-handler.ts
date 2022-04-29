import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UpdatedTenantEvent } from './updated-tenant.event';

@EventsHandler(UpdatedTenantEvent)
export class UpdatedTenantEventHandler implements IEventHandler<UpdatedTenantEvent>
{
    handle(event: UpdatedTenantEvent)
    {
        // console.log('UpdatedTenantEvent: ', event);
    }
}