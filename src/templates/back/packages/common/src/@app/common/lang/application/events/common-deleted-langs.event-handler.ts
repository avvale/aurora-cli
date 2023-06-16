import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CommonDeletedLangsEvent } from './common-deleted-langs.event';

@EventsHandler(CommonDeletedLangsEvent)
export class CommonDeletedLangsEventHandler implements IEventHandler<CommonDeletedLangsEvent>
{
    handle(event: CommonDeletedLangsEvent): void
    {
        // console.log('DeletedLangsEvent: ', event);
    }
}