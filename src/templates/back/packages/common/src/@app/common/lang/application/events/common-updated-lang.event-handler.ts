import { CommonUpdatedLangEvent } from '@app/common/lang';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(CommonUpdatedLangEvent)
export class CommonUpdatedLangEventHandler implements IEventHandler<CommonUpdatedLangEvent>
{
    handle(event: CommonUpdatedLangEvent): void
    {
        // console.log('UpdatedLangEvent: ', event);
    }
}
