import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CommonUpdatedAdministrativeAreaLevel2Event } from './common-updated-administrative-area-level-2.event';

@EventsHandler(CommonUpdatedAdministrativeAreaLevel2Event)
export class CommonUpdatedAdministrativeAreaLevel2EventHandler implements IEventHandler<CommonUpdatedAdministrativeAreaLevel2Event>
{
    handle(event: CommonUpdatedAdministrativeAreaLevel2Event): void
    {
        // console.log('UpdatedAdministrativeAreaLevel2Event: ', event);
    }
}