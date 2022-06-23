import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UpdatedAdministrativeAreaLevel2Event } from './updated-administrative-area-level-2.event';

@EventsHandler(UpdatedAdministrativeAreaLevel2Event)
export class UpdatedAdministrativeAreaLevel2EventHandler implements IEventHandler<UpdatedAdministrativeAreaLevel2Event>
{
    handle(event: UpdatedAdministrativeAreaLevel2Event): void
    {
        // console.log('UpdatedAdministrativeAreaLevel2Event: ', event);
    }
}