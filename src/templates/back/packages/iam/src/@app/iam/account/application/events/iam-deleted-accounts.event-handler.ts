import { IamDeletedAccountsEvent } from '@app/iam/account';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(IamDeletedAccountsEvent)
export class IamDeletedAccountsEventHandler implements IEventHandler<IamDeletedAccountsEvent>
{
    handle(event: IamDeletedAccountsEvent): void
    {
        // console.log('DeletedAccountsEvent: ', event);
    }
}
