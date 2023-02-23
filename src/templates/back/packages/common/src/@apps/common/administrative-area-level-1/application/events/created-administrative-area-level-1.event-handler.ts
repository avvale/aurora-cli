import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CreatedAdministrativeAreaLevel1Event } from './created-administrative-area-level-1.event';

@EventsHandler(CreatedAdministrativeAreaLevel1Event)
export class CreatedAdministrativeAreaLevel1EventHandler implements IEventHandler<CreatedAdministrativeAreaLevel1Event>
{
    handle(event: CreatedAdministrativeAreaLevel1Event): void
    {
        // console.log('CreatedAdministrativeAreaLevel1Event: ', event);
    }
}