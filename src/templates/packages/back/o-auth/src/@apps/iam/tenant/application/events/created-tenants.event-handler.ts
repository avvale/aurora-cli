import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CreatedTenantsEvent } from './created-tenants.event';

@EventsHandler(CreatedTenantsEvent)
export class CreatedTenantsEventHandler implements IEventHandler<CreatedTenantsEvent>
{
    handle(event: CreatedTenantsEvent): void
    {
        // console.log('CreatedTenantsEvent: ', event);
    }
}