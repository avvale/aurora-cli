import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CreatedPermissionEvent } from './created-permission.event';

@EventsHandler(CreatedPermissionEvent)
export class CreatedPermissionEventHandler implements IEventHandler<CreatedPermissionEvent>
{
    handle(event: CreatedPermissionEvent)
    {
        // console.log('CreatedPermissionEvent: ', event);
    }
}