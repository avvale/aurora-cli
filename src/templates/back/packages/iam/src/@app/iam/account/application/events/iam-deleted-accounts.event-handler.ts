import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { IamDeletedAccountsEvent } from './iam-deleted-accounts.event';

@EventsHandler(IamDeletedAccountsEvent)
export class IamDeletedAccountsEventHandler implements IEventHandler<IamDeletedAccountsEvent>
{
    handle(event: IamDeletedAccountsEvent): void
    {
        // console.log('DeletedAccountsEvent: ', event);
    }
}
