import { CommonCreatedLangEvent } from '@app/common/lang';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(CommonCreatedLangEvent)
export class CommonCreatedLangEventHandler implements IEventHandler<CommonCreatedLangEvent>
{
    handle(event: CommonCreatedLangEvent): void
    {
        // console.log('CommonCreatedLangEvent: ', event);
    }
}
