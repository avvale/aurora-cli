import { CommonDeletedResourcesEvent } from '@app/common/resource';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(CommonDeletedResourcesEvent)
export class CommonDeletedResourcesEventHandler implements IEventHandler<CommonDeletedResourcesEvent>
{
    handle(event: CommonDeletedResourcesEvent): void
    {
        // console.log('DeletedResourcesEvent: ', event);
    }
}
