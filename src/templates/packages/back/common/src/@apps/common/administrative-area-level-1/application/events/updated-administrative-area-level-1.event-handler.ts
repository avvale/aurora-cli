import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UpdatedAdministrativeAreaLevel1Event } from './updated-administrative-area-level-1.event';

@EventsHandler(UpdatedAdministrativeAreaLevel1Event)
export class UpdatedAdministrativeAreaLevel1EventHandler implements IEventHandler<UpdatedAdministrativeAreaLevel1Event>
{
    handle(event: UpdatedAdministrativeAreaLevel1Event): void
    {
        // console.log('UpdatedAdministrativeAreaLevel1Event: ', event);
    }
}