import { IamCreatedAccountEvent } from '@app/iam/account';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(IamCreatedAccountEvent)
export class IamCreatedAccountEventHandler
    implements IEventHandler<IamCreatedAccountEvent>
{
    handle(event: IamCreatedAccountEvent): void {
        // 'IamCreatedAccountEvent'
    }
}
