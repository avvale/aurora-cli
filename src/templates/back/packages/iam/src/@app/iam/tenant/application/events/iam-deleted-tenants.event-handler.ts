import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { IamDeletedTenantsEvent } from './iam-deleted-tenants.event';

@EventsHandler(IamDeletedTenantsEvent)
export class IamDeletedTenantsEventHandler implements IEventHandler<IamDeletedTenantsEvent>
{
    handle(event: IamDeletedTenantsEvent): void
    {
        // console.log('DeletedTenantsEvent: ', event);
    }
}
