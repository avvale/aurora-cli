import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CommonCreatedAdministrativeAreaLevel1Event } from './common-created-administrative-area-level-1.event';

@EventsHandler(CommonCreatedAdministrativeAreaLevel1Event)
export class CommonCreatedAdministrativeAreaLevel1EventHandler implements IEventHandler<CommonCreatedAdministrativeAreaLevel1Event>
{
    handle(event: CommonCreatedAdministrativeAreaLevel1Event): void
    {
        // console.log('CommonCreatedAdministrativeAreaLevel1Event: ', event);
    }
}
