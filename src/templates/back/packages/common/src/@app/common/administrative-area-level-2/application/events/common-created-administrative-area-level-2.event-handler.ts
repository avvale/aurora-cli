import { CommonCreatedAdministrativeAreaLevel2Event } from '@app/common/administrative-area-level-2';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(CommonCreatedAdministrativeAreaLevel2Event)
export class CommonCreatedAdministrativeAreaLevel2EventHandler implements IEventHandler<CommonCreatedAdministrativeAreaLevel2Event>
{
    handle(event: CommonCreatedAdministrativeAreaLevel2Event): void
    {
        // console.log('CommonCreatedAdministrativeAreaLevel2Event: ', event);
    }
}
