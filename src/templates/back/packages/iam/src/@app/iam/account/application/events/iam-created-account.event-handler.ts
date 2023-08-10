import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { IamCreatedAccountEvent } from './iam-created-account.event';

@EventsHandler(IamCreatedAccountEvent)
export class IamCreatedAccountEventHandler implements IEventHandler<IamCreatedAccountEvent>
{
    handle(event: IamCreatedAccountEvent): void
    {
        // console.log('IamCreatedAccountEvent: ', event);
    }
}
