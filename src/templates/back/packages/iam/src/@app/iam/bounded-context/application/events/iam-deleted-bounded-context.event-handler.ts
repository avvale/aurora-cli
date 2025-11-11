import { IamDeletedBoundedContextEvent } from '@app/iam/bounded-context';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(IamDeletedBoundedContextEvent)
export class IamDeletedBoundedContextEventHandler
    implements IEventHandler<IamDeletedBoundedContextEvent>
{
    handle(event: IamDeletedBoundedContextEvent): void {
        // console.log('IamDeletedBoundedContextEvent: ', event);
    }
}
