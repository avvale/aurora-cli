import { IamUpdatedTagsEvent } from '@app/iam/tag';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(IamUpdatedTagsEvent)
export class IamUpdatedTagsEventHandler implements IEventHandler<IamUpdatedTagsEvent>
{
    handle(event: IamUpdatedTagsEvent): void
    {
        // console.log('IamUpdatedTagsEvent: ', event);
    }
}
