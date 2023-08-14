import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CommonUpdatedLangEvent } from './common-updated-lang.event';

@EventsHandler(CommonUpdatedLangEvent)
export class CommonUpdatedLangEventHandler implements IEventHandler<CommonUpdatedLangEvent>
{
    handle(event: CommonUpdatedLangEvent): void
    {
        // console.log('UpdatedLangEvent: ', event);
    }
}
