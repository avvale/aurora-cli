import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CommonCreatedResourceEvent } from './common-created-resource.event';

@EventsHandler(CommonCreatedResourceEvent)
export class CommonCreatedResourceEventHandler implements IEventHandler<CommonCreatedResourceEvent>
{
    handle(event: CommonCreatedResourceEvent): void
    {
        // console.log('CommonCreatedResourceEvent: ', event);
    }
}
