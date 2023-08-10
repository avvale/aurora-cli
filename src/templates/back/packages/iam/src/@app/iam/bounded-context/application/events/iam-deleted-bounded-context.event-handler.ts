import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { IamDeletedBoundedContextEvent } from './iam-deleted-bounded-context.event';

@EventsHandler(IamDeletedBoundedContextEvent)
export class IamDeletedBoundedContextEventHandler implements IEventHandler<IamDeletedBoundedContextEvent>
{
    handle(event: IamDeletedBoundedContextEvent): void
    {
        // console.log('IamDeletedBoundedContextEvent: ', event);
    }
}
