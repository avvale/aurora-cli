import { CommonDeletedLangsEvent } from '@app/common/lang';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(CommonDeletedLangsEvent)
export class CommonDeletedLangsEventHandler implements IEventHandler<CommonDeletedLangsEvent>
{
    handle(event: CommonDeletedLangsEvent): void
    {
        // console.log('DeletedLangsEvent: ', event);
    }
}
