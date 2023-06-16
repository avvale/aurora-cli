import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CommonCreatedLangEvent } from './common-created-lang.event';

@EventsHandler(CommonCreatedLangEvent)
export class CommonCreatedLangEventHandler implements IEventHandler<CommonCreatedLangEvent>
{
    handle(event: CommonCreatedLangEvent): void
    {
        // console.log('CommonCreatedLangEvent: ', event);
    }
}