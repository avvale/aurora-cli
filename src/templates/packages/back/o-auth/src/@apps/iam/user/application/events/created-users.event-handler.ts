import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CreatedUsersEvent } from './created-users.event';

@EventsHandler(CreatedUsersEvent)
export class CreatedUsersEventHandler implements IEventHandler<CreatedUsersEvent>
{
    handle(event: CreatedUsersEvent): void
    {
        // console.log('CreatedUsersEvent: ', event);
    }
}