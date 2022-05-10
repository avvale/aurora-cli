import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UpdatedPermissionsEvent } from './updated-permissions.event';

@EventsHandler(UpdatedPermissionsEvent)
export class UpdatedPermissionsEventHandler implements IEventHandler<UpdatedPermissionsEvent>
{
    handle(event: UpdatedPermissionsEvent): void
    {
        // console.log('UpdatedPermissionsEvent: ', event);
    }
}