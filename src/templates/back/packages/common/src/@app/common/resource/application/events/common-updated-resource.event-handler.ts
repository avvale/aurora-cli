import { CommonUpdatedResourceEvent } from '@app/common/resource';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(CommonUpdatedResourceEvent)
export class CommonUpdatedResourceEventHandler implements IEventHandler<CommonUpdatedResourceEvent>
{
    handle(event: CommonUpdatedResourceEvent): void
    {
        // console.log('UpdatedResourceEvent: ', event);
    }
}
