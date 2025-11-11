import { IamUpdatedTenantAccountEvent } from '@app/iam/tenant-account';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(IamUpdatedTenantAccountEvent)
export class IamUpdatedTenantAccountEventHandler
    implements IEventHandler<IamUpdatedTenantAccountEvent>
{
    handle(event: IamUpdatedTenantAccountEvent): void {
        // console.log('UpdatedTenantAccountEvent: ', event);
    }
}
