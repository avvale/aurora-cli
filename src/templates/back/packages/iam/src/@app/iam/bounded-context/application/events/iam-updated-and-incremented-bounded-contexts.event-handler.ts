import { IamUpdatedAndIncrementedBoundedContextsEvent } from '@app/iam/bounded-context';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(IamUpdatedAndIncrementedBoundedContextsEvent)
export class IamUpdatedAndIncrementedBoundedContextsEventHandler implements IEventHandler<IamUpdatedAndIncrementedBoundedContextsEvent>
{
    handle(event: IamUpdatedAndIncrementedBoundedContextsEvent): void
    {
        // console.log('IamUpdatedAndIncrementedBoundedContextsEvent: ', event);
    }
}
