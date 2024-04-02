import { IamUpdatedAndIncrementedAccountsEvent } from '@app/iam/account';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(IamUpdatedAndIncrementedAccountsEvent)
export class IamUpdatedAndIncrementedAccountsEventHandler implements IEventHandler<IamUpdatedAndIncrementedAccountsEvent>
{
    handle(event: IamUpdatedAndIncrementedAccountsEvent): void
    {
        // console.log('IamUpdatedAndIncrementedAccountsEvent: ', event);
    }
}
