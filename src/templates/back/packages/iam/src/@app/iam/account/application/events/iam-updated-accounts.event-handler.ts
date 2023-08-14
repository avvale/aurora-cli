import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { IamUpdatedAccountsEvent } from './iam-updated-accounts.event';

@EventsHandler(IamUpdatedAccountsEvent)
export class IamUpdatedAccountsEventHandler implements IEventHandler<IamUpdatedAccountsEvent>
{
    handle(event: IamUpdatedAccountsEvent): void
    {
        // console.log('IamUpdatedAccountsEvent: ', event);
    }
}
