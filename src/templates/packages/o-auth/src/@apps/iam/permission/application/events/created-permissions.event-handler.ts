import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CreatedPermissionsEvent } from './created-permissions.event';

@EventsHandler(CreatedPermissionsEvent)
export class CreatedPermissionsEventHandler implements IEventHandler<CreatedPermissionsEvent>
{
    handle(event: CreatedPermissionsEvent)
    {
        // console.log('CreatedPermissionsEvent: ', event);
    }
}