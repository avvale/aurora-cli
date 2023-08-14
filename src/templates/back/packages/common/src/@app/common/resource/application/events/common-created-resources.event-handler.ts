import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CommonCreatedResourcesEvent } from './common-created-resources.event';

@EventsHandler(CommonCreatedResourcesEvent)
export class CommonCreatedResourcesEventHandler implements IEventHandler<CommonCreatedResourcesEvent>
{
    handle(event: CommonCreatedResourcesEvent): void
    {
        // console.log('CreatedResourcesEvent: ', event);
    }
}
