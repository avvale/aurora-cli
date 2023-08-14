import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { IamDeletedAccountEvent } from './iam-deleted-account.event';

@EventsHandler(IamDeletedAccountEvent)
export class IamDeletedAccountEventHandler implements IEventHandler<IamDeletedAccountEvent>
{
    handle(event: IamDeletedAccountEvent): void
    {
        // console.log('IamDeletedAccountEvent: ', event);
    }
}
