import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CommonCreatedAdministrativeAreaLevel2Event } from './common-created-administrative-area-level-2.event';

@EventsHandler(CommonCreatedAdministrativeAreaLevel2Event)
export class CommonCreatedAdministrativeAreaLevel2EventHandler implements IEventHandler<CommonCreatedAdministrativeAreaLevel2Event>
{
    handle(event: CommonCreatedAdministrativeAreaLevel2Event): void
    {
        // console.log('CommonCreatedAdministrativeAreaLevel2Event: ', event);
    }
}
