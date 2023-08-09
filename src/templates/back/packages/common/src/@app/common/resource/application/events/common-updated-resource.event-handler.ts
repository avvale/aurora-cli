import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CommonUpdatedResourceEvent } from './common-updated-resource.event';

@EventsHandler(CommonUpdatedResourceEvent)
export class CommonUpdatedResourceEventHandler implements IEventHandler<CommonUpdatedResourceEvent>
{
    handle(event: CommonUpdatedResourceEvent): void
    {
        // console.log('UpdatedResourceEvent: ', event);
    }
}
