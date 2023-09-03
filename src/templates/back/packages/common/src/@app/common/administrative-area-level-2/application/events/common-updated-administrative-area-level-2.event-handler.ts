import { CommonUpdatedAdministrativeAreaLevel2Event } from '@app/common/administrative-area-level-2';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(CommonUpdatedAdministrativeAreaLevel2Event)
export class CommonUpdatedAdministrativeAreaLevel2EventHandler implements IEventHandler<CommonUpdatedAdministrativeAreaLevel2Event>
{
    handle(event: CommonUpdatedAdministrativeAreaLevel2Event): void
    {
        // console.log('UpdatedAdministrativeAreaLevel2Event: ', event);
    }
}
