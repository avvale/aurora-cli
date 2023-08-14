import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { IamCreatedAccountsEvent } from './iam-created-accounts.event';

@EventsHandler(IamCreatedAccountsEvent)
export class IamCreatedAccountsEventHandler implements IEventHandler<IamCreatedAccountsEvent>
{
    handle(event: IamCreatedAccountsEvent): void
    {
        // console.log('CreatedAccountsEvent: ', event);
    }
}
