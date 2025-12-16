import { IamUpdatedRoleEvent } from '@app/iam/role';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(IamUpdatedRoleEvent)
export class IamUpdatedRoleEventHandler
    implements IEventHandler<IamUpdatedRoleEvent>
{
    handle(event: IamUpdatedRoleEvent): void {
        // 'UpdatedRoleEvent'
    }
}
