import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { DeletedTenantEvent } from './deleted-tenant.event';

@EventsHandler(DeletedTenantEvent)
export class DeletedTenantEventHandler implements IEventHandler<DeletedTenantEvent>
{
    handle(event: DeletedTenantEvent): void
    {
        // console.log('DeletedTenantEvent: ', event);
    }
}