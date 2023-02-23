import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UpdatedRolesEvent } from './updated-roles.event';

@EventsHandler(UpdatedRolesEvent)
export class UpdatedRolesEventHandler implements IEventHandler<UpdatedRolesEvent>
{
    handle(event: UpdatedRolesEvent): void
    {
        // console.log('UpdatedRolesEvent: ', event);
    }
}