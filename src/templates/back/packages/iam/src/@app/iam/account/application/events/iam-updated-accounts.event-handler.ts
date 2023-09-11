import { IamUpdatedAccountsEvent } from '@app/iam/account';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(IamUpdatedAccountsEvent)
export class IamUpdatedAccountsEventHandler implements IEventHandler<IamUpdatedAccountsEvent>
{
    handle(event: IamUpdatedAccountsEvent): void
    {
        // console.log('IamUpdatedAccountsEvent: ', event);
    }
}
