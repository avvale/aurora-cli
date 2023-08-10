import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { IamCreatedBoundedContextEvent } from './iam-created-bounded-context.event';

@EventsHandler(IamCreatedBoundedContextEvent)
export class IamCreatedBoundedContextEventHandler implements IEventHandler<IamCreatedBoundedContextEvent>
{
    handle(event: IamCreatedBoundedContextEvent): void
    {
        // console.log('IamCreatedBoundedContextEvent: ', event);
    }
}
