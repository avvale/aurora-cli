import { IamDeletedBoundedContextsEvent } from '@app/iam/bounded-context';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(IamDeletedBoundedContextsEvent)
export class IamDeletedBoundedContextsEventHandler implements IEventHandler<IamDeletedBoundedContextsEvent>
{
    handle(event: IamDeletedBoundedContextsEvent): void
    {
        // console.log('DeletedBoundedContextsEvent: ', event);
    }
}
