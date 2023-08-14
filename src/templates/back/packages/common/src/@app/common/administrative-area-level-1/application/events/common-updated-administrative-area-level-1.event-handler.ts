import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CommonUpdatedAdministrativeAreaLevel1Event } from './common-updated-administrative-area-level-1.event';

@EventsHandler(CommonUpdatedAdministrativeAreaLevel1Event)
export class CommonUpdatedAdministrativeAreaLevel1EventHandler implements IEventHandler<CommonUpdatedAdministrativeAreaLevel1Event>
{
    handle(event: CommonUpdatedAdministrativeAreaLevel1Event): void
    {
        // console.log('UpdatedAdministrativeAreaLevel1Event: ', event);
    }
}
