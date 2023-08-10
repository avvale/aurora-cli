import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { IamCreatedBoundedContextsEvent } from './iam-created-bounded-contexts.event';

@EventsHandler(IamCreatedBoundedContextsEvent)
export class IamCreatedBoundedContextsEventHandler implements IEventHandler<IamCreatedBoundedContextsEvent>
{
    handle(event: IamCreatedBoundedContextsEvent): void
    {
        // console.log('CreatedBoundedContextsEvent: ', event);
    }
}
