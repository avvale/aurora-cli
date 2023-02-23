import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UpdatedTenantsEvent } from './updated-tenants.event';

@EventsHandler(UpdatedTenantsEvent)
export class UpdatedTenantsEventHandler implements IEventHandler<UpdatedTenantsEvent>
{
    handle(event: UpdatedTenantsEvent): void
    {
        // console.log('UpdatedTenantsEvent: ', event);
    }
}