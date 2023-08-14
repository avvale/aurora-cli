import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CommonCreatedLangsEvent } from './common-created-langs.event';

@EventsHandler(CommonCreatedLangsEvent)
export class CommonCreatedLangsEventHandler implements IEventHandler<CommonCreatedLangsEvent>
{
    handle(event: CommonCreatedLangsEvent): void
    {
        // console.log('CreatedLangsEvent: ', event);
    }
}
