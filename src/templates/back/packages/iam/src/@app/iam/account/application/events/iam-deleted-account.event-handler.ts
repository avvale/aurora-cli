import { IamDeletedAccountEvent } from '@app/iam/account';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(IamDeletedAccountEvent)
export class IamDeletedAccountEventHandler
  implements IEventHandler<IamDeletedAccountEvent>
{
  handle(event: IamDeletedAccountEvent): void {
    // IamDeletedAccountEvent'
  }
}
