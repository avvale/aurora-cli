import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UpdatedRoleEvent } from './updated-role.event';

@EventsHandler(UpdatedRoleEvent)
export class UpdatedRoleEventHandler implements IEventHandler<UpdatedRoleEvent>
{
    handle(event: UpdatedRoleEvent): void
    {
        // console.log('UpdatedRoleEvent: ', event);
    }
}