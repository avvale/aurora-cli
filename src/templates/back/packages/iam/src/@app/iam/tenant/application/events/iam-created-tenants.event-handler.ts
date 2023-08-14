import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { IamCreatedTenantsEvent } from './iam-created-tenants.event';

@EventsHandler(IamCreatedTenantsEvent)
export class IamCreatedTenantsEventHandler implements IEventHandler<IamCreatedTenantsEvent>
{
    handle(event: IamCreatedTenantsEvent): void
    {
        // console.log('CreatedTenantsEvent: ', event);
    }
}
