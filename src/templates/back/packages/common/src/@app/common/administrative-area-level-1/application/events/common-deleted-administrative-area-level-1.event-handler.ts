import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CommonDeletedAdministrativeAreaLevel1Event } from './common-deleted-administrative-area-level-1.event';

@EventsHandler(CommonDeletedAdministrativeAreaLevel1Event)
export class CommonDeletedAdministrativeAreaLevel1EventHandler implements IEventHandler<CommonDeletedAdministrativeAreaLevel1Event>
{
    handle(event: CommonDeletedAdministrativeAreaLevel1Event): void
    {
        // console.log('CommonDeletedAdministrativeAreaLevel1Event: ', event);
    }
}