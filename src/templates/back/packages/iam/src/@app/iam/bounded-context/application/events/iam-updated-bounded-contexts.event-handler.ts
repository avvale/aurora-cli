import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { IamUpdatedBoundedContextsEvent } from './iam-updated-bounded-contexts.event';

@EventsHandler(IamUpdatedBoundedContextsEvent)
export class IamUpdatedBoundedContextsEventHandler implements IEventHandler<IamUpdatedBoundedContextsEvent>
{
    handle(event: IamUpdatedBoundedContextsEvent): void
    {
        // console.log('IamUpdatedBoundedContextsEvent: ', event);
    }
}
