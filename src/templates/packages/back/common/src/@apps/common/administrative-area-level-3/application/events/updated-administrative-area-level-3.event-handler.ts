import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UpdatedAdministrativeAreaLevel3Event } from './updated-administrative-area-level-3.event';

@EventsHandler(UpdatedAdministrativeAreaLevel3Event)
export class UpdatedAdministrativeAreaLevel3EventHandler implements IEventHandler<UpdatedAdministrativeAreaLevel3Event>
{
    handle(event: UpdatedAdministrativeAreaLevel3Event): void
    {
        // console.log('UpdatedAdministrativeAreaLevel3Event: ', event);
    }
}