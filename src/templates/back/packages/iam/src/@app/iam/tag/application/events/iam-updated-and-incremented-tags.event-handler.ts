import { IamUpdatedAndIncrementedTagsEvent } from '@app/iam/tag';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(IamUpdatedAndIncrementedTagsEvent)
export class IamUpdatedAndIncrementedTagsEventHandler implements IEventHandler<IamUpdatedAndIncrementedTagsEvent>
{
    handle(event: IamUpdatedAndIncrementedTagsEvent): void
    {
        // console.log('IamUpdatedAndIncrementedTagsEvent: ', event);
    }
}
