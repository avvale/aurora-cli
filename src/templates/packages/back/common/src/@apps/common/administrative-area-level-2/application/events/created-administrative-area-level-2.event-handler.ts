import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CreatedAdministrativeAreaLevel2Event } from './created-administrative-area-level-2.event';

@EventsHandler(CreatedAdministrativeAreaLevel2Event)
export class CreatedAdministrativeAreaLevel2EventHandler implements IEventHandler<CreatedAdministrativeAreaLevel2Event>
{
    handle(event: CreatedAdministrativeAreaLevel2Event): void
    {
        // console.log('CreatedAdministrativeAreaLevel2Event: ', event);
    }
}