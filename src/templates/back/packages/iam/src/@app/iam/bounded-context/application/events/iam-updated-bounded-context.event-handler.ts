import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { IamUpdatedBoundedContextEvent } from './iam-updated-bounded-context.event';

@EventsHandler(IamUpdatedBoundedContextEvent)
export class IamUpdatedBoundedContextEventHandler implements IEventHandler<IamUpdatedBoundedContextEvent>
{
    handle(event: IamUpdatedBoundedContextEvent): void
    {
        // console.log('UpdatedBoundedContextEvent: ', event);
    }
}
