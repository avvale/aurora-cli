import { CommonCreatedResourcesEvent } from '@app/common/resource';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(CommonCreatedResourcesEvent)
export class CommonCreatedResourcesEventHandler implements IEventHandler<CommonCreatedResourcesEvent>
{
    handle(event: CommonCreatedResourcesEvent): void
    {
        // console.log('CreatedResourcesEvent: ', event);
    }
}
