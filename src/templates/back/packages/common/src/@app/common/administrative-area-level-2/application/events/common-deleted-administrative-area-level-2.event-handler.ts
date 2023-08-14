import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CommonDeletedAdministrativeAreaLevel2Event } from './common-deleted-administrative-area-level-2.event';

@EventsHandler(CommonDeletedAdministrativeAreaLevel2Event)
export class CommonDeletedAdministrativeAreaLevel2EventHandler implements IEventHandler<CommonDeletedAdministrativeAreaLevel2Event>
{
    handle(event: CommonDeletedAdministrativeAreaLevel2Event): void
    {
        // console.log('CommonDeletedAdministrativeAreaLevel2Event: ', event);
    }
}
