import { CommonUpdatedResourcesEvent } from '@app/common/resource';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(CommonUpdatedResourcesEvent)
export class CommonUpdatedResourcesEventHandler implements IEventHandler<CommonUpdatedResourcesEvent>
{
    handle(event: CommonUpdatedResourcesEvent): void
    {
        // console.log('CommonUpdatedResourcesEvent: ', event);
    }
}
