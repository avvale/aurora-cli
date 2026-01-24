import { IamCreatedUserEvent } from '@app/iam/user';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(IamCreatedUserEvent)
export class IamCreatedUserEventHandler
  implements IEventHandler<IamCreatedUserEvent>
{
  handle(event: IamCreatedUserEvent): void {
    // console.log('IamCreatedUserEvent: ', event);
  }
}
