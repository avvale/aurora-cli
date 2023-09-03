import { CommonUpdatedLangsEvent } from '@app/common/lang';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(CommonUpdatedLangsEvent)
export class CommonUpdatedLangsEventHandler implements IEventHandler<CommonUpdatedLangsEvent>
{
    handle(event: CommonUpdatedLangsEvent): void
    {
        // console.log('CommonUpdatedLangsEvent: ', event);
    }
}
