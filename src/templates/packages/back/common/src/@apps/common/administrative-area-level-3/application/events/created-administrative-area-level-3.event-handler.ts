import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CreatedAdministrativeAreaLevel3Event } from './created-administrative-area-level-3.event';

@EventsHandler(CreatedAdministrativeAreaLevel3Event)
export class CreatedAdministrativeAreaLevel3EventHandler implements IEventHandler<CreatedAdministrativeAreaLevel3Event>
{
    handle(event: CreatedAdministrativeAreaLevel3Event): void
    {
        // console.log('CreatedAdministrativeAreaLevel3Event: ', event);
    }
}