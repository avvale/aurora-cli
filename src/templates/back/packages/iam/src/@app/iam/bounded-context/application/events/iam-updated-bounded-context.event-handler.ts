import { IamUpdatedBoundedContextEvent } from '@app/iam/bounded-context';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(IamUpdatedBoundedContextEvent)
export class IamUpdatedBoundedContextEventHandler implements IEventHandler<IamUpdatedBoundedContextEvent>
{
    handle(event: IamUpdatedBoundedContextEvent): void
    {
        // console.log('UpdatedBoundedContextEvent: ', event);
    }
}
