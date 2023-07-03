import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CommonCreatedAdministrativeAreaLevel3Event } from './common-created-administrative-area-level-3.event';

@EventsHandler(CommonCreatedAdministrativeAreaLevel3Event)
export class CommonCreatedAdministrativeAreaLevel3EventHandler implements IEventHandler<CommonCreatedAdministrativeAreaLevel3Event>
{
    handle(event: CommonCreatedAdministrativeAreaLevel3Event): void
    {
        // console.log('CommonCreatedAdministrativeAreaLevel3Event: ', event);
    }
}