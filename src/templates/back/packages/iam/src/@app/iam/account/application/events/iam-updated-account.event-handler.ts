import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { IamUpdatedAccountEvent } from './iam-updated-account.event';

@EventsHandler(IamUpdatedAccountEvent)
export class IamUpdatedAccountEventHandler implements IEventHandler<IamUpdatedAccountEvent>
{
    handle(event: IamUpdatedAccountEvent): void
    {
        // console.log('UpdatedAccountEvent: ', event);
    }
}
