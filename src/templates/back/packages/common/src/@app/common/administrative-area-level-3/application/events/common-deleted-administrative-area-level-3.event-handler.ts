import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CommonDeletedAdministrativeAreaLevel3Event } from './common-deleted-administrative-area-level-3.event';

@EventsHandler(CommonDeletedAdministrativeAreaLevel3Event)
export class CommonDeletedAdministrativeAreaLevel3EventHandler implements IEventHandler<CommonDeletedAdministrativeAreaLevel3Event>
{
    handle(event: CommonDeletedAdministrativeAreaLevel3Event): void
    {
        // console.log('CommonDeletedAdministrativeAreaLevel3Event: ', event);
    }
}