import { CommonCreatedAdministrativeAreaLevel1Event } from '@app/common/administrative-area-level-1';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(CommonCreatedAdministrativeAreaLevel1Event)
export class CommonCreatedAdministrativeAreaLevel1EventHandler implements IEventHandler<CommonCreatedAdministrativeAreaLevel1Event>
{
    handle(event: CommonCreatedAdministrativeAreaLevel1Event): void
    {
        // console.log('CommonCreatedAdministrativeAreaLevel1Event: ', event);
    }
}
