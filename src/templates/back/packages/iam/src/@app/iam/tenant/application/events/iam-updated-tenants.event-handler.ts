import { IamUpdatedTenantsEvent } from '@app/iam/tenant';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(IamUpdatedTenantsEvent)
export class IamUpdatedTenantsEventHandler
    implements IEventHandler<IamUpdatedTenantsEvent>
{
    handle(event: IamUpdatedTenantsEvent): void {
        // console.log('IamUpdatedTenantsEvent: ', event);
    }
}
