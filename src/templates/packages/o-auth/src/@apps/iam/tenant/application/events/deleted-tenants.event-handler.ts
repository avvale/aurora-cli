import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { DeletedTenantsEvent } from './deleted-tenants.event';

@EventsHandler(DeletedTenantsEvent)
export class DeletedTenantsEventHandler implements IEventHandler<DeletedTenantsEvent>
{
    handle(event: DeletedTenantsEvent): void
    {
        // console.log('DeletedTenantsEvent: ', event);
    }
}