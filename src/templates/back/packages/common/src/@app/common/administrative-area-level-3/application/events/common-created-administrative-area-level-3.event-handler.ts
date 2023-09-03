import { CommonCreatedAdministrativeAreaLevel3Event } from '@app/common/administrative-area-level-3';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(CommonCreatedAdministrativeAreaLevel3Event)
export class CommonCreatedAdministrativeAreaLevel3EventHandler implements IEventHandler<CommonCreatedAdministrativeAreaLevel3Event>
{
    handle(event: CommonCreatedAdministrativeAreaLevel3Event): void
    {
        // console.log('CommonCreatedAdministrativeAreaLevel3Event: ', event);
    }
}
