import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CommonUpdatedLangsEvent } from './common-updated-langs.event';

@EventsHandler(CommonUpdatedLangsEvent)
export class CommonUpdatedLangsEventHandler implements IEventHandler<CommonUpdatedLangsEvent>
{
    handle(event: CommonUpdatedLangsEvent): void
    {
        // console.log('CommonUpdatedLangsEvent: ', event);
    }
}
