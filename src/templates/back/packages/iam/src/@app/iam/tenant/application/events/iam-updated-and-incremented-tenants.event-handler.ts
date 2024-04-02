import { IamUpdatedAndIncrementedTenantsEvent } from '@app/iam/tenant';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(IamUpdatedAndIncrementedTenantsEvent)
export class IamUpdatedAndIncrementedTenantsEventHandler implements IEventHandler<IamUpdatedAndIncrementedTenantsEvent>
{
    handle(event: IamUpdatedAndIncrementedTenantsEvent): void
    {
        // console.log('IamUpdatedAndIncrementedTenantsEvent: ', event);
    }
}
