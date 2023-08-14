import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { IamUpdatedTenantsEvent } from './iam-updated-tenants.event';

@EventsHandler(IamUpdatedTenantsEvent)
export class IamUpdatedTenantsEventHandler implements IEventHandler<IamUpdatedTenantsEvent>
{
    handle(event: IamUpdatedTenantsEvent): void
    {
        // console.log('IamUpdatedTenantsEvent: ', event);
    }
}
