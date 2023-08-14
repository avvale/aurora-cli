import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CommonUpdatedResourcesEvent } from './common-updated-resources.event';

@EventsHandler(CommonUpdatedResourcesEvent)
export class CommonUpdatedResourcesEventHandler implements IEventHandler<CommonUpdatedResourcesEvent>
{
    handle(event: CommonUpdatedResourcesEvent): void
    {
        // console.log('CommonUpdatedResourcesEvent: ', event);
    }
}
