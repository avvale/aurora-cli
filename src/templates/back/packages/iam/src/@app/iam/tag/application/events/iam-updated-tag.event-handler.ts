import { IamUpdatedTagEvent } from '@app/iam/tag';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(IamUpdatedTagEvent)
export class IamUpdatedTagEventHandler implements IEventHandler<IamUpdatedTagEvent>
{
    handle(event: IamUpdatedTagEvent): void
    {
        // console.log('UpdatedTagEvent: ', event);
    }
}
