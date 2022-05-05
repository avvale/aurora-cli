import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UpdatedPermissionEvent } from './updated-permission.event';

@EventsHandler(UpdatedPermissionEvent)
export class UpdatedPermissionEventHandler implements IEventHandler<UpdatedPermissionEvent>
{
    handle(event: UpdatedPermissionEvent): void
    {
        // console.log('UpdatedPermissionEvent: ', event);
    }
}