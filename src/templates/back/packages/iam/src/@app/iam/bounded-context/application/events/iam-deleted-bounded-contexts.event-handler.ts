import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { IamDeletedBoundedContextsEvent } from './iam-deleted-bounded-contexts.event';

@EventsHandler(IamDeletedBoundedContextsEvent)
export class IamDeletedBoundedContextsEventHandler implements IEventHandler<IamDeletedBoundedContextsEvent>
{
    handle(event: IamDeletedBoundedContextsEvent): void
    {
        // console.log('DeletedBoundedContextsEvent: ', event);
    }
}
