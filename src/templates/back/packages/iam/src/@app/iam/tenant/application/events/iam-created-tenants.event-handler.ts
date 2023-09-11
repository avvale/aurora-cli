import { IamCreatedTenantsEvent } from '@app/iam/tenant';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(IamCreatedTenantsEvent)
export class IamCreatedTenantsEventHandler implements IEventHandler<IamCreatedTenantsEvent>
{
    handle(event: IamCreatedTenantsEvent): void
    {
        // console.log('CreatedTenantsEvent: ', event);
    }
}
