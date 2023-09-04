import { CommonDeletedResourceEvent } from '@app/common/resource';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(CommonDeletedResourceEvent)
export class CommonDeletedResourceEventHandler implements IEventHandler<CommonDeletedResourceEvent>
{
    handle(event: CommonDeletedResourceEvent): void
    {
        // console.log('CommonDeletedResourceEvent: ', event);
    }
}
