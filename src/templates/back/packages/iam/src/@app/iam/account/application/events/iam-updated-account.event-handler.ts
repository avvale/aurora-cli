import { IamUpdatedAccountEvent } from '@app/iam/account';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(IamUpdatedAccountEvent)
export class IamUpdatedAccountEventHandler
    implements IEventHandler<IamUpdatedAccountEvent>
{
    handle(event: IamUpdatedAccountEvent): void {
        // console.log('UpdatedAccountEvent: ', event);
    }
}
