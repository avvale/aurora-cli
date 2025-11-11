import { IamDeletedTagEvent } from '@app/iam/tag';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(IamDeletedTagEvent)
export class IamDeletedTagEventHandler
    implements IEventHandler<IamDeletedTagEvent>
{
    handle(event: IamDeletedTagEvent): void {
        // console.log('IamDeletedTagEvent: ', event);
    }
}
