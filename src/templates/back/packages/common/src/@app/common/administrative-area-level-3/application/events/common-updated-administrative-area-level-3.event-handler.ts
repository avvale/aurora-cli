import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CommonUpdatedAdministrativeAreaLevel3Event } from './common-updated-administrative-area-level-3.event';

@EventsHandler(CommonUpdatedAdministrativeAreaLevel3Event)
export class CommonUpdatedAdministrativeAreaLevel3EventHandler implements IEventHandler<CommonUpdatedAdministrativeAreaLevel3Event>
{
    handle(event: CommonUpdatedAdministrativeAreaLevel3Event): void
    {
        // console.log('UpdatedAdministrativeAreaLevel3Event: ', event);
    }
}
