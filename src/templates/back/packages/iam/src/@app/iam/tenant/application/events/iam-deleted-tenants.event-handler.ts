import { IamDeletedTenantsEvent } from '@app/iam/tenant';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(IamDeletedTenantsEvent)
export class IamDeletedTenantsEventHandler implements IEventHandler<IamDeletedTenantsEvent>
{
    handle(event: IamDeletedTenantsEvent): void
    {
        // console.log('DeletedTenantsEvent: ', event);
    }
}
