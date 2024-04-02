import { IamDeletedTagsEvent } from '@app/iam/tag';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(IamDeletedTagsEvent)
export class IamDeletedTagsEventHandler implements IEventHandler<IamDeletedTagsEvent>
{
    handle(event: IamDeletedTagsEvent): void
    {
        // console.log('DeletedTagsEvent: ', event);
    }
}
