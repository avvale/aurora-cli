import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CommonDeletedLangEvent } from './common-deleted-lang.event';

@EventsHandler(CommonDeletedLangEvent)
export class CommonDeletedLangEventHandler implements IEventHandler<CommonDeletedLangEvent>
{
    handle(event: CommonDeletedLangEvent): void
    {
        // console.log('CommonDeletedLangEvent: ', event);
    }
}
