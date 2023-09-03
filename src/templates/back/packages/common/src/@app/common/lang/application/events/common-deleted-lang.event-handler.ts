import { CommonDeletedLangEvent } from '@app/common/lang';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(CommonDeletedLangEvent)
export class CommonDeletedLangEventHandler implements IEventHandler<CommonDeletedLangEvent>
{
    handle(event: CommonDeletedLangEvent): void
    {
        // console.log('CommonDeletedLangEvent: ', event);
    }
}
