import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CommonDeletedResourcesEvent } from './common-deleted-resources.event';

@EventsHandler(CommonDeletedResourcesEvent)
export class CommonDeletedResourcesEventHandler implements IEventHandler<CommonDeletedResourcesEvent>
{
    handle(event: CommonDeletedResourcesEvent): void
    {
        // console.log('DeletedResourcesEvent: ', event);
    }
}
