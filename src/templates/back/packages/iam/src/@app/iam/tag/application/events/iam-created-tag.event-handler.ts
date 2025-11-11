import { IamCreatedTagEvent } from '@app/iam/tag';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(IamCreatedTagEvent)
export class IamCreatedTagEventHandler
    implements IEventHandler<IamCreatedTagEvent>
{
    handle(event: IamCreatedTagEvent): void {
        // console.log('IamCreatedTagEvent: ', event);
    }
}
