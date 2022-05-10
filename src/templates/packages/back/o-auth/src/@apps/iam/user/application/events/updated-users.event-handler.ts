import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UpdatedUsersEvent } from './updated-users.event';

@EventsHandler(UpdatedUsersEvent)
export class UpdatedUsersEventHandler implements IEventHandler<UpdatedUsersEvent>
{
    handle(event: UpdatedUsersEvent): void
    {
        // console.log('UpdatedUsersEvent: ', event);
    }
}