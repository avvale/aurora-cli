import { IamCreatedAccountsEvent } from '@app/iam/account';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(IamCreatedAccountsEvent)
export class IamCreatedAccountsEventHandler
    implements IEventHandler<IamCreatedAccountsEvent>
{
    handle(event: IamCreatedAccountsEvent): void {
        // console.log('CreatedAccountsEvent: ', event);
    }
}
