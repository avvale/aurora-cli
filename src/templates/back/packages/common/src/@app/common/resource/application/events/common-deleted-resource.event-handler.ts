import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CommonDeletedResourceEvent } from './common-deleted-resource.event';

@EventsHandler(CommonDeletedResourceEvent)
export class CommonDeletedResourceEventHandler implements IEventHandler<CommonDeletedResourceEvent>
{
    handle(event: CommonDeletedResourceEvent): void
    {
        // console.log('CommonDeletedResourceEvent: ', event);
    }
}
